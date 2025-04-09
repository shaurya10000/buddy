import { getFromServer, postJsonToServer } from "@/backend/commons";
import { CREATE_PROJECT_ENDPOINT, GET_PROJECTS_ENDPOINT } from "@/backend/config/constants";
import { DraftProject } from "@/models/requestModels/DraftProject";
import { Project } from "@/models/responseModels/Project";

export const fetchProjects = async (): Promise<Project[]> => {
    try {
        const response = await getFromServer(GET_PROJECTS_ENDPOINT);
        const data = await response.json();
        return data as Project[];
    } catch (error) {
        console.error('Error fetching projects:', error);
        throw error;
    }
};

export const createProject = async (project: DraftProject): Promise<Project> => {
    try {
        const response = await postJsonToServer(CREATE_PROJECT_ENDPOINT, project);
        const data = await response.json();
        return data as Project;
    } catch (error) {
        console.error('Error creating project:', error);
        throw error;
    }
};
