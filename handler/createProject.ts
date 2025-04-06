import { createProject } from '@/backend/projectService';
import { CreateProjectRequest } from '@/models/requestModels/DraftProject';
import { Project } from '@/models/responseModels/Project';

export const createProjectHandler = async (name: string, description: string): Promise<Project> => {
    if (!name || !description) {
        throw new Error('Name and description are required');
    }

    try {
        const createProjectRequest: CreateProjectRequest = {
            name,
            description,
            tasks: [],
            color: '#FFFFFF', // Default color, can be changed later
        };

        const project = await createProject(createProjectRequest);

        return project;
    } catch (error) {
        console.error('Error creating project:', error);
        throw error;
    }
};
