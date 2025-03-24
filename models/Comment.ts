// This is the model for a comment in a project / task / subtask

export interface Comment {
    id: string;
    content: string;
    createdAt: Date;
    createdBy: string;
    updatedAt: Date;
    projectId: string;
    taskId: string;
    subtaskId: string;
}