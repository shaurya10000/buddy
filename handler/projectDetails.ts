// This file contains the handler for the project details page
import { router } from 'expo-router';
import { fetchProjectWithoutTasks, updateProject } from '@/backend/projectService';
import { Project } from '@/models/responseModels/Project';
import { Dispatch } from 'redux';
import { setCommittedProjects } from '@/redux/slices/committedProjectTasksSlice';

export const projectDetailsHandler = async (projectId: string) => {
    router.push({
        pathname: '/pages/ProjectDetails',
        params: {
            projectId: projectId
        }
    });
};

export const updateProjectDescriptionHandler = async (project: Project, description: string, dispatch: Dispatch) => {
    console.log('updateProjectDescriptionHandler', project, description);
    
    const fetchedProject = await fetchProjectWithoutTasks(project.id);

    if (fetchedProject && fetchedProject.description !== description && description !== '' && fetchedProject.updatedAt === project.updatedAt) {
        fetchedProject.description = description;
        await updateProject(fetchedProject);
        dispatch(setCommittedProjects({ [fetchedProject.id]: fetchedProject }));
    } else if (fetchedProject && fetchedProject.description !== description && description !== '') {
        console.log('Project updated by another user, please refresh the project details');
    }
};