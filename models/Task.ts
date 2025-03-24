// This is the model for a task not associated with a project

interface Task {
    createdAt: number;
    createdBy: string;
    description: string;
    title: string;
    userName: string;
    taskId: string;
    status: string;
}

export {
    Task
}