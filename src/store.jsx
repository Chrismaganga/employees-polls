import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './slices/usersSlice';
import questionsReducer from './slices/questionsSlice';
import authReducer from './slices/authSlice';

const store = configureStore({
  reducer: {
    users: usersReducer,
    questions: questionsReducer,
    auth: authReducer,
  },
});

export default store;
