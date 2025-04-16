import { Project } from '@/models/responseModels/Project';
import { ProjectTask } from '@/models/responseModels/ProjectTask';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProjectTasksState {
  projects: Record<string, Project>;
  tasksByProjectId: Record<string, Record<string, ProjectTask>>;
  readyStateByProjectId: Record<string, boolean>;
}

const initialState: ProjectTasksState = {
  projects: {},
  tasksByProjectId: {},
  readyStateByProjectId: {},
};

export const committedProjectTasksSlice = createSlice({
  name: 'committedProjectTasks',
  initialState,
  reducers: {
    setCommittedProjects: (
      state,
      action: PayloadAction<{ projects: Record<string, Project> }>
    ) => {
      const { projects } = action.payload;
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
  },
});

export const { 
  setCommittedProjects,
  setCommittedProjectTasks, 
  setCommittedProjectTasksAndSubTasksReady 
} = committedProjectTasksSlice.actions;

export default committedProjectTasksSlice.reducer;