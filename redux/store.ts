// Redux store

import { configureStore } from '@reduxjs/toolkit';
import draftProjectTasksReducer from '@/redux/slices/draftProjectTasksSlice'; // Import the tasksReducer
import committedProjectTasksReducer from '@/redux/slices/committedProjectTasksSlice'; // Import the tasksReducer
const store = configureStore({
  reducer: {
    draftProjectTasks: draftProjectTasksReducer, // Use the imported tasksReducer
    committedProjectTasks: committedProjectTasksReducer, // Use the imported tasksReducer
  },
  devTools: true, //process.env.NODE_ENV !== 'production', // Enable only in development
});

export type RootState = ReturnType<typeof store.getState>;
export default store;