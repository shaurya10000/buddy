// This is the model for a subtask in a project task

import { WorkItem } from "@/models/responseModels/WorkItem";

export interface ProjectTaskSubtask extends WorkItem {
    projectTaskId: string;
}