// src/actions/users.js
export const RECEIVE_USERS = 'RECEIVE_USERS';
export const ADD_USER_ANSWER = 'ADD_USER_ANSWER';
export const ADD_USER_QUESTION = 'ADD_USER_QUESTION';

export const receiveUsers = (users) => ({
  type: RECEIVE_USERS,
  users,
});

export const addUserAnswer = ({ authedUser, qid, answer }) => ({
  type: ADD_USER_ANSWER,
  authedUser,
  qid,
  answer,
});

export const addUserQuestion = (question) => ({
  type: ADD_USER_QUESTION,
  question,
});
