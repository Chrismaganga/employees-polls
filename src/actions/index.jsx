import {
    RECEIVE_USERS,
    RECEIVE_QUESTIONS,
    ADD_QUESTION,
    ADD_ANSWER,
    SET_AUTHED_USER,
    LOGOUT_USER
  } from './types';
  import { _getUsers, _getQuestions, _saveQuestion, _saveQuestionAnswer } from '../_DATA';
  
  // Action Creators
  
  export function receiveUsers(users) {
    return {
      type: RECEIVE_USERS,
      users
    };
  }
  
  export function receiveQuestions(questions) {
    return {
      type: RECEIVE_QUESTIONS,
      questions
    };
  }
  
  export function addQuestion(question) {
    return {
      type: ADD_QUESTION,
      question
    };
  }
  
  export function addAnswer({ authedUser, qid, answer }) {
    return {
      type: ADD_ANSWER,
      authedUser,
      qid,
      answer
    };
  }
  
  export function setAuthedUser(id) {
    return {
      type: SET_AUTHED_USER,
      id
    };
  }
  
  export function logoutUser() {
    return {
      type: LOGOUT_USER
    };
  }
  
  // Async Actions
  
  export function handleInitialData() {
    return (dispatch) => {
      return Promise.all([
        _getUsers(),
        _getQuestions()
      ]).then(([users, questions]) => {
        dispatch(receiveUsers(users));
        dispatch(receiveQuestions(questions));
      });
    };
  }
  
  export function handleAddQuestion(optionOneText, optionTwoText) {
    return (dispatch, getState) => {
      const { authedUser } = getState();
      return _saveQuestion({
        optionOneText,
        optionTwoText,
        author: authedUser
      }).then((question) => {
        dispatch(addQuestion(question));
      });
    };
  }
  
  export function handleAddAnswer(qid, answer) {
    return (dispatch, getState) => {
      const { authedUser } = getState();
      return _saveQuestionAnswer({
        authedUser,
        qid,
        answer
      }).then(() => {
        dispatch(addAnswer({ authedUser, qid, answer }));
      });
    };
  }
  