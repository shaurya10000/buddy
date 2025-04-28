export const Status = {
    TODO: "TODO",
    IN_PROGRESS: "IN_PROGRESS",
    COMPLETED: "COMPLETED",
    CANCELLED: "CANCELLED",
    DELETED: "DELETED",
} as const;

// This line defines a TypeScript type named 'ProjectStatus' which can be one of the values of the 'ProjectStatus' object.
export type Status = typeof Status[keyof typeof Status];