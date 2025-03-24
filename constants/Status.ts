export const Status = {
    TODO: "todo",
    IN_PROGRESS: "inprogress",
    COMPLETED: "completed",
    CANCELLED: "cancelled",
    DELETED: "deleted",
} as const;

// This line defines a TypeScript type named 'ProjectStatus' which can be one of the values of the 'ProjectStatus' object.
export type Status = typeof Status[keyof typeof Status];