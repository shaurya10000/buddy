import { v4 as uuidv4 } from 'uuid';

export const generateProjectId = () => {
    return uuidv4();
};

export const generateProjectTaskId = () => {
    return uuidv4();
};

export const generateProjectSubTaskId = () => {
    return uuidv4();
};