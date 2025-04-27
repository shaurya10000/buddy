// This file contains the handler for the project details page
import { router } from 'expo-router';

export const projectDetailsHandler = async (projectId: string) => {
    router.push({
        pathname: '/pages/ProjectDetails',
        params: {
            projectId: projectId
        }
    });
};
