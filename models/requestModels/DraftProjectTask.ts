// This is the model for a task in a project

import { User } from "@/models/responseModels/User";
import { DraftWorkItem } from "@/models/requestModels/DraftWorkItem";
import { DraftProjectTaskSubtask } from "@/models/requestModels/DraftProjectTaskSubtask";

export interface DraftProjectTask extends DraftWorkItem {
    assignee: User; // Must be one of the users with who the project is shared
    projectId: string;
    subtasks: DraftProjectTaskSubtask[];
}