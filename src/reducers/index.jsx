// src/reducers/index.js
import { combineReducers } from 'redux';
import users from './users';
import questions from './questions';
import authedUser from './authedUser';

// eslint-disable-next-line react-refresh/only-export-components
export default combineReducers({
  users,
  questions,
  authedUser,
});
