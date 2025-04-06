// This is the model for a work item
// A work item is a common project, task, or subtask

export interface DraftWorkItem {
    id: string;
    name: string;
    description: string;
}