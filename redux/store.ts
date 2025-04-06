// Redux store

import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './slices/tasksSlice'; // Import the tasksReducer

const store = configureStore({
  reducer: {
    tasks: tasksReducer, // Use the imported tasksReducer
  },
  devTools: true, //process.env.NODE_ENV !== 'production', // Enable only in development
});

export type RootState = ReturnType<typeof store.getState>;
export default store;