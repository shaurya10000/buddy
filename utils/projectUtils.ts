import { v4 as uuidv4 } from 'uuid';
import { Project } from '@/models/responseModels/Project';
import { Status } from '@/constants/Status';

export const generateProjectId = () => {
    return uuidv4();
};

export const generateProjectTaskId = () => {
    return uuidv4();
};

export const generateProjectSubTaskId = () => {
    return uuidv4();
};

export const getCompletedTasksCount = (project: Project) => {
    return project.tasks.filter((task) => task.status === Status.COMPLETED).length;
};

export const getTotalTasksCount = (project: Project) => {
    return project.tasks.length;
};