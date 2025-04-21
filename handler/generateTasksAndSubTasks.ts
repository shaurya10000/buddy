// Handler for generating tasks and sub-tasks for a project

import { DraftProjectTask } from "@/models/requestModels/DraftProjectTask";
import { router } from "expo-router";
import { setDraftProjectTasks, setDraftProjectTasksAndSubTasksReady, setDraftProject } from "@/redux/slices/draftProjectTasksSlice";
import { DraftProject } from "@/models/requestModels/DraftProject";
import { generateProjectId, generateProjectTaskId, generateProjectSubTaskId } from "@/utils/projectUtils";

// https://medium.com/@honorablehilary/redux-toolkits-slice-in-a-react-native-project-2745b1872e9f
// helped configure the redux store and the slices correctly
export const generateTasksAndSubTasksHandler = async (
    projectName: string,
    projectDescription: string,
    dispatch: any  // Add dispatch as a parameter
): Promise<void> => {
    // Use the passed dispatch instead of useDispatch hook
    dispatch(setDraftProjectTasksAndSubTasksReady(false));

    // Use React Router to navigate to the CreateProjectGenerateTasksAndSubTasks page
    router.push('/pages/CreateProjectGenerateTasksAndSubTasks');

    // Generate the tasks and sub-tasks
    const project: DraftProject = localCreateDraftProject(projectName, projectDescription);
    const tasks = await generateTasksAndSubTasks(project);

    // Use Redux to store the project and tasks
    dispatch(setDraftProject(project));
    dispatch(setDraftProjectTasks(tasks));
    dispatch(setDraftProjectTasksAndSubTasksReady(true));
}

const localCreateDraftProject = (projectName: string, projectDescription: string): DraftProject => {
    return {
        id: generateProjectId(),
        name: projectName,
        description: projectDescription,
        tasks: [],
        color: '#000000',
    };
}

export const generateTasksAndSubTasks = async (project: DraftProject): Promise<DraftProjectTask[]> => {
    // Wait for 1 second to simulate the tasks and sub-tasks being generated
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Dummy tasks and sub-tasks
    const tasks: DraftProjectTask[] = [
        {
            id: generateProjectTaskId(),
            name: 'Task 1',
            description: 'Description 1',
            projectId: project.id,
            assignee: {
                id: '1',
                name: 'John Doe',
                email: 'john.doe@example.com',
                profilePicture: 'https://via.placeholder.com/150',
            },
            subtasks: [
                {
                    id: generateProjectSubTaskId(),
                    name: 'SubTask 1',
                    description: 'Description 1',
                    projectTaskId: '1',
                },
                {
                    id: generateProjectSubTaskId(),
                    name: 'SubTask 2',
                    description: 'Description 2',
                    projectTaskId: '1',
                },
            ],
        },
        {
            id: generateProjectTaskId(),
            name: 'Task 2',
            description: 'Description 2',
            projectId: project.id,
            assignee: {
                id: '1',
                name: 'John Doe',
                email: 'john.doe@example.com',
                profilePicture: 'https://via.placeholder.com/150',
            },
            subtasks: [
                {
                    id: generateProjectSubTaskId(),
                    name: 'SubTask 1',
                    description: 'Description 1',
                    projectTaskId: '2',
                },
                {
                    id: generateProjectSubTaskId(),
                    name: 'SubTask 2',
                    description: 'Description 2',
                    projectTaskId: '2',
                },
                {
                    id: generateProjectSubTaskId(),
                    name: 'SubTask 3',
                    description: 'Description 3',
                    projectTaskId: '2',
                },
                {
                    id: generateProjectSubTaskId(),
                    name: 'SubTask 4',
                    description: 'Description 4',
                    projectTaskId: '2',
                },
            ],
        },
        {
            id: generateProjectTaskId(),
            name: 'Task 3',
            description: 'Description 3',
            projectId: project.id,
            assignee: {
                id: '1',
                name: 'John Doe',
                email: 'john.doe@example.com',
                profilePicture: 'https://via.placeholder.com/150',
            },
            subtasks: [
                {
                    id: generateProjectSubTaskId(),
                    name: 'SubTask 1',
                    description: 'Description 1',
                    projectTaskId: '3',
                },
            ],
        },
        {
            id: generateProjectTaskId(),
            name: 'Task 1 for Task 5 Long Name XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX  XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
            description: 'Description 4',
            projectId: project.id,
            assignee: {
                id: '1',
                name: 'John Doe',
                email: 'john.doe@example.com',
                profilePicture: 'https://via.placeholder.com/150',
            },
        },
        {
            id: generateProjectTaskId(),
            name: 'Task 5',
            description: 'Description 5',
            projectId: project.id,
            assignee: {
                id: '1',
                name: 'John Doe',
                email: 'john.doe@example.com',
                profilePicture: 'https://via.placeholder.com/150',
            },
            subtasks: [
                {
                    id: generateProjectSubTaskId(),
                    name: 'SubTask 1 for Task 5 Long Name XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
                    description: 'Description 1',
                    projectTaskId: '5',
                },
                {
                    id: generateProjectSubTaskId(),
                    name: 'SubTask 2',
                    description: 'Description 2',
                    projectTaskId: '5',
                },
                {
                    id: generateProjectSubTaskId(),
                    name: 'SubTask 3',
                    description: 'Description 3',
                    projectTaskId: '5',
                },
            ],
        },
    ];

    return tasks;
};