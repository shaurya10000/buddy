import { ProjectTask } from "@/models/responseModels/ProjectTask";
import { WorkItemRequest } from "@/models/requestModels/WorkItem";

export interface CreateProjectRequest extends WorkItemRequest {
    tasks: ProjectTask[]; // This can be just a list of task ids
    color: string;
}