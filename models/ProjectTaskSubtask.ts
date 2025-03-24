// This is the model for a subtask in a project task

import { User } from "@/models/User";
import { WorkItem } from "@/models/WorkItem";

export interface ProjectTaskSubtask extends WorkItem {
    assignee: User;
    projectTaskId: string;
}