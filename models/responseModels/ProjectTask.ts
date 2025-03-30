// This is the model for a task in a project

import { ProjectTaskSubtask } from "@/models/responseModels/ProjectTaskSubtask";
import { WorkItem } from "@/models/responseModels/WorkItem";
import { User } from "@/models/responseModels/User";

export interface ProjectTask extends WorkItem {
    assignee: User; // Must be one of the users with who the project is shared
    projectId: string;
    subtasks: ProjectTaskSubtask[];
}