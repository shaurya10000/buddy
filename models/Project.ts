import { ProjectTask } from "@/models/ProjectTask";
import { User } from "@/models/User";
import { WorkItem } from "@/models/WorkItem";

export interface Project extends WorkItem {
    tasks: ProjectTask[]; // This can be just a list of task ids
    sharedWith: User[]; // This can be just a list of user ids
    color: string;
}