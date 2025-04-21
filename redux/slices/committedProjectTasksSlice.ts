import { Project } from '@/models/responseModels/Project';
import { ProjectTask } from '@/models/responseModels/ProjectTask';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProjectTasksState {
  projects: Record<string, Project>;
  readyThumbnailStateByProjectId: Record<string, boolean>;
  tasksByProjectId: Record<string, Record<string, ProjectTask>>;
  readyStateByProjectId: Record<string, boolean>;
}

const initialState: ProjectTasksState = {
  projects: {},
  readyThumbnailStateByProjectId: {},
  tasksByProjectId: {},
  readyStateByProjectId: {},
};

export const committedProjectTasksSlice = createSlice({
  name: 'committedProjectTasks',
  initialState,
  reducers: {
    setCommittedProjects: (
      state,
      action: PayloadAction<Record<string, Project>>
    ) => {
      const projects = action.payload;
      for (const projectId in projects) {
        state.projects[projectId] = projects[projectId];
      }
    },

    setCommittedProjectTasks: (
      state,
      action: PayloadAction<{ projectId: string; tasks: Record<string, ProjectTask> }>
    ) => {
      const { projectId, tasks } = action.payload;
      state.tasksByProjectId[projectId] = tasks;
    },

    updateCommittedProjectTask: (
      state,
      action: PayloadAction<{ projectId: string; taskId: string; task: ProjectTask }>
    ) => {
      const { projectId, taskId, task } = action.payload;
      state.tasksByProjectId[projectId][taskId] = task;
    },

    setCommittedProjectTasksAndSubTasksReady: (
      state,
      action: PayloadAction<{ projectId: string; isReady: boolean }>
    ) => {
      const { projectId, isReady } = action.payload;
      state.readyStateByProjectId[projectId] = isReady;
    },

    setReadyThumbnailStateByProjectId: (
      state,
      action: PayloadAction<Record<string, boolean>>
    ) => {
      const readyStateByProjectId = action.payload;
      for (const projectId in readyStateByProjectId) {
        state.readyThumbnailStateByProjectId[projectId] = readyStateByProjectId[projectId];
      }
    },
  },
});

export const { 
  setCommittedProjects,
  setCommittedProjectTasks, 
  setCommittedProjectTasksAndSubTasksReady,
  setReadyThumbnailStateByProjectId
} = committedProjectTasksSlice.actions;

export default committedProjectTasksSlice.reducer;