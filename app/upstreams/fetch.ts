import AsyncStorage from '@react-native-async-storage/async-storage';
import { TASKS_ENDPOINT } from '@/constants/Backend';
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

const populateLocalStorageFromServer = async () => {
    console.log('Try to fetch tasks from server');
    const access_token = await AsyncStorage.getItem("access_token");

    const response = await fetch(TASKS_ENDPOINT,
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

export {
    populateLocalStorageFromServer,
}