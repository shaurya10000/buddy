// Handler for generating tasks and sub-tasks for a project

import { DraftProjectTask } from "@/models/requestModels/DraftProjectTask";
import { router } from "expo-router";
import { setTasks, setTasksAndSubTasksReady } from "@/redux/slices/tasksSlice";

// https://medium.com/@honorablehilary/redux-toolkits-slice-in-a-react-native-project-2745b1872e9f
// helped configure the redux store and the slices correctly
export const generateTasksAndSubTasksHandler = async (
    projectName: string,
    projectDescription: string,
    dispatch: any  // Add dispatch as a parameter
): Promise<void> => {
    // Use the passed dispatch instead of useDispatch hook
    dispatch(setTasksAndSubTasksReady(false));

    // Use React Router to navigate to the CreateProjectGenerateTasksAndSubTasks page
    router.push('/pages/CreateProjectGenerateTasksAndSubTasks');

    // Generate the tasks and sub-tasks
    const tasks = await generateTasksAndSubTasks(projectName, projectDescription);

    // Use Redux to store the tasks
    dispatch(setTasks(tasks));
    dispatch(setTasksAndSubTasksReady(true));
}

export const generateTasksAndSubTasks = async (projectName: string, projectDescription: string): Promise<DraftProjectTask[]> => {
    // Wait for 1 second to simulate the tasks and sub-tasks being generated
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Dummy tasks and sub-tasks
    const tasks: DraftProjectTask[] = [
        {
            id: '1',
            name: 'Task 1',
            description: 'Description 1',
            projectId: '1',
            assignee: {
                id: '1',
                name: 'John Doe',
                email: 'john.doe@example.com',
                profilePicture: 'https://via.placeholder.com/150',
            },
            subtasks: [
                {
                    id: '11',
                    name: 'SubTask 1',
                    description: 'Description 1',
                    projectTaskId: '1',
                },
                {
                    id: '12',
                    name: 'SubTask 2',
                    description: 'Description 2',
                    projectTaskId: '1',
                },
            ],
        },
        {
            id: '2',
            name: 'Task 2',
            description: 'Description 2',
            projectId: '1',
            assignee: {
                id: '1',
                name: 'John Doe',
                email: 'john.doe@example.com',
                profilePicture: 'https://via.placeholder.com/150',
            },
            subtasks: [
                {
                    id: '21',
                    name: 'SubTask 1',
                    description: 'Description 1',
                    projectTaskId: '2',
                },
                {
                    id: '22',
                    name: 'SubTask 2',
                    description: 'Description 2',
                    projectTaskId: '2',
                },
                {
                    id: '23',
                    name: 'SubTask 3',
                    description: 'Description 3',
                    projectTaskId: '2',
                },
                {
                    id: '24',
                    name: 'SubTask 4',
                    description: 'Description 4',
                    projectTaskId: '2',
                },
            ],
        },
        {
            id: '3',
            name: 'Task 3',
            description: 'Description 3',
            projectId: '1',
            assignee: {
                id: '1',
                name: 'John Doe',
                email: 'john.doe@example.com',
                profilePicture: 'https://via.placeholder.com/150',
            },
            subtasks: [
                {
                    id: '31',
                    name: 'SubTask 1',
                    description: 'Description 1',
                    projectTaskId: '3',
                },
            ],
        },
        {
            id: '4',
            name: 'Task 1 for Task 5 Long Name XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX  XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
            description: 'Description 4',
            projectId: '1',
            assignee: {
                id: '1',
                name: 'John Doe',
                email: 'john.doe@example.com',
                profilePicture: 'https://via.placeholder.com/150',
            },
        },
        {
            id: '5',
            name: 'Task 5',
            description: 'Description 5',
            projectId: '1',
            assignee: {
                id: '1',
                name: 'John Doe',
                email: 'john.doe@example.com',
                profilePicture: 'https://via.placeholder.com/150',
            },
            subtasks: [
                {
                    id: '51',
                    name: 'SubTask 1 for Task 5 Long Name XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
                    description: 'Description 1',
                    projectTaskId: '5',
                },
                {
                    id: '52',
                    name: 'SubTask 2',
                    description: 'Description 2',
                    projectTaskId: '5',
                },
                {
                    id: '53',
                    name: 'SubTask 3',
                    description: 'Description 3',
                    projectTaskId: '5',
                },
            ],
        },
    ];

    return tasks;
};