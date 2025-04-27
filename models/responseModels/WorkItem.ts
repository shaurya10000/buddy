// This is the model for a work item
// A work item is a common project, task, or subtask

import { Status } from "@/constants/Status";
import { Comment } from "@/models/responseModels/Comment";

export interface WorkItem {
    id: string;
    name: string;
    description: string;
    status: Status;
    createdAt: Date;
    createdBy: string;
    updatedAt: Date;
    dueDate: Date;
    comments: Comment[]; // This can be just a list of comment ids
}