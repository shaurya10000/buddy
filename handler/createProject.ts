import { createProject } from '@/backend/projectService';
import { DraftProject } from '@/models/requestModels/DraftProject';
import { DraftProjectTask } from '@/models/requestModels/DraftProjectTask';
import { Project } from '@/models/responseModels/Project';

export const createProjectHandler = async (projectId: string, name: string, description: string, tasks?: DraftProjectTask[]): Promise<Project> => {
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

        return project;
    } catch (error) {
        console.error('Error creating project:', error);
        throw error;
    }
};
