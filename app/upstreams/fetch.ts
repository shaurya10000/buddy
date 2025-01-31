import AsyncStorage from '@react-native-async-storage/async-storage';
import { SERVER_ENDPOINT } from '@/constants/Backend';
import { storeTuples } from '@/components/UserInput';

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
    const titles = array.map(item => { return JSON.stringify({ "title": item.title, "remindAtTime": item.remindAtTime }) });

    await storeTuples(titles, 'reminder');
};

export {
    populateTasksInLocalStorageFromServer,
    populateRemindersInLocalStorageFromServer,
}