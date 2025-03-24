// This is the model for a task in a project

import { ProjectTaskSubtask } from "@/models/ProjectTaskSubtask";
import { WorkItem } from "@/models/WorkItem";
import { User } from "@/models/User";

export interface ProjectTask extends WorkItem {
    assignee: User; // Must be one of the users with who the project is shared
    projectId: string;
    subtasks: ProjectTaskSubtask[];
}