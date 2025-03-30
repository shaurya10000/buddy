import { ProjectTask } from "@/models/responseModels/ProjectTask";
import { CreateWorkItemRequest } from "@/models/requestModels/CreateWorkItemRequest";

export interface CreateProjectRequest extends CreateWorkItemRequest {
    tasks: ProjectTask[]; // This can be just a list of task ids
    color: string;
}