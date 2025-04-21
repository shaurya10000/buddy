// This file contains the handler for the archive project button

import { archiveProject } from "@/backend/projectService";
import { setCommittedProjects } from "@/redux/slices/committedProjectTasksSlice";
import { Dispatch } from "redux";

export const archiveProjectHandler = async (projectId: string, dispatch: Dispatch) => {
    const archivedProject = await archiveProject(projectId);
    dispatch(setCommittedProjects({
        projects: {
            [projectId]: archivedProject
        }
    }));
};
