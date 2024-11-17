import authReducer from './slices/authSlice';
import { configureStore } from '@reduxjs/toolkit';
import questionsReducer from './slices/questionsSlice';
import usersReducer from './slices/usersSlice';
import votingSlice from './slices/votingSlice';

const store = configureStore({
  reducer: {
    users: usersReducer,
    questions: questionsReducer,
    auth: authReducer,
    votes: votingSlice
  },
});

export default store;
