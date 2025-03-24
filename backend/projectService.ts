import { PROJECTS_ENDPOINT } from "@/backend/config/constants";

export const fetchProjects = async () => {
    try {
        const response = await fetch(`${PROJECTS_ENDPOINT}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching projects:', error);
        throw error;
    }
}; 