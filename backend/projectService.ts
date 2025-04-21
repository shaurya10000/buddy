import { getFromServer, postJsonToServer } from "@/backend/commons";
import { ARCHIVE_PROJECT_ENDPOINT, CREATE_PROJECT_ENDPOINT, GET_PROJECTS_ENDPOINT, GET_COMPLETE_PROJECT_ENDPOINT } from "@/backend/config/constants";
import { DraftProject } from "@/models/requestModels/DraftProject";
import { Project } from "@/models/responseModels/Project";
import { setCommittedProjects, setReadyThumbnailStateByProjectId } from "@/redux/slices/committedProjectTasksSlice";
import { Dispatch } from "redux";

export const fetchProjectsWithoutTasks = async (dispatch: Dispatch): Promise<Project[]> => {
    try {
        const response = await getFromServer(GET_PROJECTS_ENDPOINT);
        const data = await response.json();
        
        // Check if data is valid before dispatching to Redux
        if (Array.isArray(data)) {
            // Convert array to object with project ID as key for better Redux state management
            const projectsById = data.reduce((acc, project) => {
                acc[project.id] = project;
                return acc;
            }, {} as Record<string, Project>);
            
            // Dispatch the properly formatted projects to Redux
            dispatch(setCommittedProjects(projectsById));
            
            // Set ready state for each project
            const readyStateByProjectId = data.reduce((acc, project) => {
                acc[project.id] = true;
                return acc;
            }, {} as Record<string, boolean>);
            
            dispatch(setReadyThumbnailStateByProjectId(readyStateByProjectId));
            
            console.log('Projects loaded into Redux state:', projectsById);
        } else {
            console.error('Invalid project data format received:', data);
        }
        
        return data as Project[];
    } catch (error) {
        console.error('Error fetching projects:', error);
        throw error;
    }
};

export const fetchCompleteProject = async (projectId: string): Promise<Project> => {
    try {
        const response = await getFromServer(GET_COMPLETE_PROJECT_ENDPOINT + "?id=" + projectId);
        const data = await response.json();
        return data as Project;
    } catch (error) {
        console.error('Error fetching project:', error);
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

export const archiveProject = async (projectId: string): Promise<Project> => {
    try {
        const response = await postJsonToServer(ARCHIVE_PROJECT_ENDPOINT, { projects: [projectId] });
        const data = await response.json();
        return data as Project;
    } catch (error) {
        console.error('Error archiving project:', error);
        throw error;
    }
};
