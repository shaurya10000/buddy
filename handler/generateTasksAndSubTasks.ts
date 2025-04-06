// Handler for generating tasks and sub-tasks for a project

import { DraftProjectTask } from "@/models/requestModels/DraftProjectTask";
import { router } from "expo-router";
import { xSetState } from "react-native-redux"


export const generateTasksAndSubTasksHandler = async (projectName: string, projectDescription: string): Promise<void> => {
    // Use Redux to store the tasks
    xSetState({tasksAndSubTasksReady: false});

    // Use React Router to navigate to the CreateProjectGenerateTasksAndSubTasks page
    router.push('/pages/CreateProjectGenerateTasksAndSubTasks');
    
    // Generate the tasks and sub-tasks in the background
    const tasks = await generateTasksAndSubTasks(projectName, projectDescription);
    // Use Redux to store the tasks
    xSetState({
        tasks: tasks,
        tasksAndSubTasksReady: true,
    });
}

export const generateTasksAndSubTasks = async (projectName: string, projectDescription: string): Promise<DraftProjectTask[]> => {
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
            ],
        },
    ];

    return tasks;
};