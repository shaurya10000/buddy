import { createProject } from '@/backend/projectService';
import { DraftProject } from '@/models/requestModels/DraftProject';
import { DraftProjectTask } from '@/models/requestModels/DraftProjectTask';
import { Project } from '@/models/responseModels/Project';
import { setCommittedProjects, setCommittedProjectTasks, setCommittedProjectTasksAndSubTasksReady } from '@/redux/slices/committedProjectTasksSlice';
import { setDraftProjectTasks, setDraftProjectTasksAndSubTasksReady } from '@/redux/slices/draftProjectTasksSlice';
import { Dispatch } from 'redux';
import { router } from 'expo-router';
import { ProjectTask } from '@/models/responseModels/ProjectTask';

export const createProjectHandler = async (
    projectId: string,
    name: string,
    description: string,
    dispatch: Dispatch,
    tasks?: DraftProjectTask[]
): Promise<Project> => {
    if (!name || !description) {
        throw new Error('Name and description are required');
    }

    try {
        const createProjectRequest: DraftProject = {
            id: projectId,
            name,
            description,
            tasks: tasks ?? [],
            color: '#FFFFFF', // Default color, can be changed later
        };
        console.log('createProjectRequest', createProjectRequest);

        const project = await createProject(createProjectRequest);

        console.log('project', project);
        console.log('project.tasks', project.tasks);
        console.log('project.tasks.reduce', project.tasks.reduce((acc, task) => {
            acc[task.id] = task;
            return acc;
        }, {} as Record<string, ProjectTask>));

        // Update the project with id projectId in the redux store using passed dispatch
        dispatch(setCommittedProjects({
            [projectId]: project
        }));
        dispatch(setCommittedProjectTasks({
            projectId,
            tasks: project.tasks.reduce((acc, task) => {
                acc[task.id] = task;
                return acc;
            }, {} as Record<string, ProjectTask>)
        }));
        dispatch(setCommittedProjectTasksAndSubTasksReady({
            projectId,
            isReady: true
        }));

        // Reset the draft project tasks and sub tasks ready state
        dispatch(setDraftProjectTasksAndSubTasksReady(false));
        dispatch(setDraftProjectTasks([]));

        // route to the project page and also pass the project id
        router.push({
            pathname: '/pages/ProjectHome',
            params: { projectId }
        });

        return project;
    } catch (error) {
        console.error('Error creating project:', error);
        throw error;
    }
};
