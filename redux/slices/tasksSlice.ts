import { DraftProjectTask } from '@/models/requestModels/DraftProjectTask';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TasksState {
  tasks: DraftProjectTask[];
  tasksAndSubTasksReady: boolean;
}

const initialState: TasksState = {
  tasks: [],
  tasksAndSubTasksReady: false,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks(state, action: PayloadAction<DraftProjectTask[]>) {
      console.log('setTasks', action.payload);
      state.tasks = action.payload;
    },
    setTasksAndSubTasksReady(state, action: PayloadAction<boolean>) {
      state.tasksAndSubTasksReady = action.payload;
    },
    // Add other reducers as needed
  },
});

export const { setTasks, setTasksAndSubTasksReady } = tasksSlice.actions;
export default tasksSlice.reducer; 