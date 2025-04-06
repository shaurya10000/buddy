import { DraftProjectTask } from "@/models/requestModels/DraftProjectTask";
import { DraftWorkItem } from "@/models/requestModels/DraftWorkItem";

export interface DraftProject extends DraftWorkItem {
    tasks: DraftProjectTask[]; // This can be just a list of task ids
    color: string;
}