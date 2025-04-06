// This is the model for a subtask in a project task

import { User } from "@/models/responseModels/User";
import { DraftWorkItem } from "@/models/requestModels/DraftWorkItem";

export interface DraftProjectTaskSubtask extends DraftWorkItem {
    projectTaskId: string;
}