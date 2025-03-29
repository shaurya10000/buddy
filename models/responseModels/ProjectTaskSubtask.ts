// This is the model for a subtask in a project task

import { User } from "@/models/responseModels/User";
import { WorkItemRequest } from "@/models/responseModels/WorkItem";

export interface ProjectTaskSubtask extends WorkItemRequest {
    assignee: User;
    projectTaskId: string;
}