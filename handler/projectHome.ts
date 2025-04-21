// This file contains the handler for a click on a project tile

import { fetchCompleteProject } from "@/backend/projectService";
import { setCommittedProjectTasks } from "@/redux/slices/committedProjectTasksSlice";
import { router } from "expo-router";
import { Dispatch } from "redux";
import { ProjectTask } from "@/models/responseModels/ProjectTask";

export const projectHomeHandler = async (projectId: string, dispatch: Dispatch) => {
    // Get project and its tasks from backend
    const project = await fetchCompleteProject(projectId);
    dispatch(setCommittedProjectTasks({
        projectId,
        tasks: project.tasks.reduce((acc, task) => {
            acc[task.id] = task;
            return acc;
        }, {} as Record<string, ProjectTask>)
    }));

    router.push({
        pathname: '/pages/ProjectHome',
        params: { projectId }
    });
}