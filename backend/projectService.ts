import { getFromServer, postJsonToServer } from "@/backend/commons";
import { PROJECTS_ENDPOINT } from "@/backend/config/constants";
import { CreateProjectRequest } from "@/models/requestModels/Project";
import { Project } from "@/models/responseModels/Project";

export const fetchProjects = async (): Promise<Project[]> => {
    try {
        const response = await getFromServer(PROJECTS_ENDPOINT);
        const data = await response.json();
        return data as Project[];
    } catch (error) {
        console.error('Error fetching projects:', error);
        throw error;
    }
};

export const createProject = async (project: CreateProjectRequest): Promise<Project> => {
    try {
        const response = await postJsonToServer(PROJECTS_ENDPOINT, project);
        const data = await response.json();
        return data as Project;
    } catch (error) {
        console.error('Error creating project:', error);
        throw error;
    }
};
