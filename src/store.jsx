import authReducer from './slices/authSlice';
import { configureStore } from '@reduxjs/toolkit';
import questionsReducer from './slices/questionsSlice';
import usersReducer from './slices/usersSlice';

const store = configureStore({
  reducer: {
    users: usersReducer,
    questions: questionsReducer,
    auth: authReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false
    })
});

export default store;
