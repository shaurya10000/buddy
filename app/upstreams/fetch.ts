import AsyncStorage from '@react-native-async-storage/async-storage';
import { SERVER_ENDPOINT } from '@/constants/Backend';
import { storeTuples } from '@/components/UserInput';
import { scheduleNotification } from '@/app/notifications/localNotifications';
import * as Notifications from 'expo-notifications';

interface Task {
    createdAt: number;
    createdBy: string;
    description: string;
    title: string;
    userId: string;
    taskId: string;
    status: string;
};

const populateTasksInLocalStorageFromServer = async () => {
    console.log('Try to fetch tasks from server');
    const access_token = await AsyncStorage.getItem("access_token");

    const response = await fetch(`${SERVER_ENDPOINT}tasks`,
        {
            headers: { Authorization: `Bearer ${access_token}` },
        });
    if (response.status != 200) {
        throw new Error('Unknown exception');
    }

    const jsonResponse = await response.json();
    console.log('Retrieved following from server -', jsonResponse);
    const tasksArray: Task[] = jsonResponse.tasks;
    const titles = tasksArray.map(task => task.title);

    await storeTuples(titles, 'task');
};

interface Reminder {
    createdAt: number;
    createdBy: string;
    description: string;
    title: string;
    userId: string;
    taskId: string;
    status: string;
    remindAtTime: string;
};

// reuse taskId as triggerId
const scheduleNotificationForReminders = async (taskId: string, title: string, description: string) => {
    console.log("Schedule notification");
    scheduleNotification(taskId, title, description);
};

const populateRemindersInLocalStorageFromServer = async () => {
    console.log('Try to fetch reminders from server');
    const access_token = await AsyncStorage.getItem("access_token");

    const response = await fetch(`${SERVER_ENDPOINT}reminders`,
        {
            headers: { Authorization: `Bearer ${access_token}` },
        });
    if (response.status != 200) {
        throw new Error('Unknown exception');
    }

    const jsonResponse = await response.json();
    console.log('Retrieved following from server -', jsonResponse);
    const array: Reminder[] = jsonResponse.reminders;

    await Notifications.cancelAllScheduledNotificationsAsync();
    
    const titles = array.map(item => {
        scheduleNotificationForReminders(item.taskId, item.title, item.description);
        return JSON.stringify({ "title": item.title, "remindAtTime": item.remindAtTime }) });

    await storeTuples(titles, 'reminder');
};

export {
    populateTasksInLocalStorageFromServer,
    populateRemindersInLocalStorageFromServer,
    scheduleNotificationForReminders,
}