import { DraftProject } from '@/models/requestModels/DraftProject';
import { DraftProjectTask } from '@/models/requestModels/DraftProjectTask';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DraftProjectTasksState {
  project: DraftProject;
  tasks: DraftProjectTask[];
  draftTasksAndSubTasksReady: boolean;
}

const initialState: DraftProjectTasksState = {
  project: {
    id: '',
    name: '',
    description: '',
    tasks: [],
    color: '',
  },
  tasks: [],
  draftTasksAndSubTasksReady: false,
};

const draftProjectTasksSlice = createSlice({
  name: 'projectTasks',
  initialState,
  reducers: {
    setDraftProject(state, action: PayloadAction<DraftProject>) {
      state.project = action.payload;
    },
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

export const { setDraftProject, setDraftProjectTasks, setDraftProjectTasksAndSubTasksReady } = draftProjectTasksSlice.actions;
export default draftProjectTasksSlice.reducer;