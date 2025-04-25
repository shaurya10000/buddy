// This file contains the handler for a click on a project tile

import { setCommittedProjects } from "@/redux/slices/committedProjectTasksSlice";
import { fetchCompleteProject } from "@/backend/projectService";
import { setCommittedProjectTasks, setCommittedProjectTasksAndSubTasksReady } from "@/redux/slices/committedProjectTasksSlice";
import { router } from "expo-router";
import { Dispatch } from "redux";
import { ProjectTask } from "@/models/responseModels/ProjectTask";

export const projectHomeHandler = async (projectId: string, dispatch: Dispatch) => {
    // Get project and its tasks from backend
    const project = await fetchCompleteProject(projectId);

    dispatch(setCommittedProjects({
        [projectId]: project
    }));
    
    dispatch(setCommittedProjectTasks({
        projectId,
        tasks: project.tasks
    }));

    dispatch(setCommittedProjectTasksAndSubTasksReady({
        projectId,
        isReady: true
    }));

    router.push({
        pathname: '/pages/ProjectHome',
        params: { projectId }
    });
}