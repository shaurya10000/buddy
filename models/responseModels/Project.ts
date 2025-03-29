import { ProjectTask } from "@/models/responseModels/ProjectTask";
import { User } from "@/models/responseModels/User";
import { WorkItem } from "@/models/responseModels/WorkItem";

export interface Project extends WorkItem {
    tasks: ProjectTask[]; // This can be just a list of task ids
    sharedWith: User[]; // This can be just a list of user ids
    color: string;
}