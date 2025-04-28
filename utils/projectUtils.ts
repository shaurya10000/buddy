import { v4 as uuidv4 } from 'uuid';
import { Project } from '@/models/responseModels/Project';
import { Status } from '@/constants/Status';
import { ProjectTask } from '@/models/responseModels/ProjectTask';

export const generateProjectId = () => {
    return uuidv4();
};

export const generateProjectTaskId = () => {
    return uuidv4();
};

export const generateProjectSubTaskId = () => {
    return uuidv4();
};

export const getCompletedTasksCount = (tasks: ProjectTask[]) => {
    return tasks?.filter((task) => task.status === Status.COMPLETED).length;
};

export const getTotalTasksCount = (tasks: ProjectTask[]) => {
    return tasks?.length;
};

// Returns the time in the format of 23:59 UTC
export const formatTime = (date: Date) => {
    if (!date) return '';

    if (date instanceof Date) {
        return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
    }

    const dateObj = new Date(date);
    if (!isNaN(dateObj.getTime())) {
        return dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
    }

    return '';
};

export const formatDate = (date: Date) => {
    if (!date) return '';

    try {
        // Check if date is a Date object
        if (date instanceof Date) {
            return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).replace(/,/g, '').replace(/\s/g, '-');
        }

        // If it's a string, try to convert it to a Date
        const dateObj = new Date(date);
        if (!isNaN(dateObj.getTime())) {
            return dateObj.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).replace(/,/g, '').replace(/\s/g, '-');
        }

        // If conversion fails, return empty string
        return '';
    } catch (error) {
        console.error('Error formatting date:', error);
        return '';
    }
};

export const getSharedWith = (project: Project) => {
    return project.sharedWith?.length > 0 ? project.sharedWith.map((user) => user.name).join(', ') : 'None';
};