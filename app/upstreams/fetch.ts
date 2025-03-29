import AsyncStorage from '@react-native-async-storage/async-storage';
import { SERVER_ENDPOINT } from '@/backend/config/constants';
import { storeTuples } from '@/components/UserInput';
import { scheduleNotification } from '@/app/notifications/localNotifications';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { storageKeys } from '@/config/storageKeys';
import { Task } from '@/models/responseModels/Task';

// Function to fetch tasks from the server and save them locally
async function populateTasksInLocalStorageFromServer() {
  try {
    console.log('Try to fetch tasks from server');
    const tokenData = await AsyncStorage.getItem(storageKeys.token);
    const accessToken = JSON.parse(tokenData || '{}').token;
    const response = await fetch(`${SERVER_ENDPOINT}tasks`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    if (response.status === 401) {
        throw new Error('Unauthorized');
    }
    if (!response.ok) {
      throw new Error('Failed to fetch tasks');
    }

    if (response.status != 200) {
        throw new Error('Unknown exception');
    }

    const jsonResponse = await response.json();
    console.log('Retrieved following from server -', jsonResponse);

    const tasksArray: Task[] = jsonResponse.tasks;
    const tasks = tasksArray.filter(task => task.createdBy === task.userName).map(task => JSON.stringify(task));
    await storeTuples(tasks, 'task');

    const pendingTasks = tasksArray.filter(task => task.createdBy !== task.userName).map(task => JSON.stringify(task));
    await storeTuples(pendingTasks, 'pendingAcceptanceTask');
  } catch (error) {
    console.error('Error populating tasks:', error);
  }
}

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
    const tokenData = await AsyncStorage.getItem(storageKeys.token);
    const accessToken = JSON.parse(tokenData || '{}').token;

    const response = await fetch(`${SERVER_ENDPOINT}reminders`,
        {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
    if (response.status != 200) {
        throw new Error('Unknown exception');
    }

    const jsonResponse = await response.json();
    console.log('Retrieved following from server -', jsonResponse);
    const array: Reminder[] = jsonResponse.reminders;

    // https://github.com/expo/expo/issues/18822
    let titles;
    if (Platform.OS === "web") {
        console.log("Support for notifications in web is not available in Expo");
        titles = array.map(item => {
            return JSON.stringify({ "title": item.title, "remindAtTime": item.remindAtTime })
        });
    } else {
        await Notifications.cancelAllScheduledNotificationsAsync();
        titles = array.map(item => {
            scheduleNotificationForReminders(item.taskId, item.title, item.description);
            return JSON.stringify({ "title": item.title, "remindAtTime": item.remindAtTime })
        });
    }

    await storeTuples(titles, 'reminder');
};

export {
    populateTasksInLocalStorageFromServer,
    populateRemindersInLocalStorageFromServer,
    scheduleNotificationForReminders,
}