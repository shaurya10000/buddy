import { DraftProjectTask } from '@/models/requestModels/DraftProjectTask';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DraftProjectTasksState {
  tasks: DraftProjectTask[];
  draftTasksAndSubTasksReady: boolean;
}

const initialState: DraftProjectTasksState = {
  tasks: [],
  draftTasksAndSubTasksReady: false,
};

const draftProjectTasksSlice = createSlice({
  name: 'projectTasks',
  initialState,
  reducers: {
    setDraftProjectTasks(state, action: PayloadAction<DraftProjectTask[]>) {
      console.log('setTasks', action.payload);
      state.tasks = action.payload;
    },
    setDraftProjectTasksAndSubTasksReady(state, action: PayloadAction<boolean>) {
      state.draftTasksAndSubTasksReady = action.payload;
    },
    // Add other reducers as needed
  },
});

export const { setDraftProjectTasks, setDraftProjectTasksAndSubTasksReady } = draftProjectTasksSlice.actions;
export default draftProjectTasksSlice.reducer;