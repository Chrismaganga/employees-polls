import { combineReducers } from 'redux';
import questionsReducer from './questionsSlice';
import usersReducer from './usersSlice';
import authReducer from './authSlice';

const rootReducer = combineReducers({
  questions: questionsReducer,
  users: usersReducer,
  auth: authReducer,
});

export default rootReducer;
