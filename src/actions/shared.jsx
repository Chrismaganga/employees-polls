// src/actions/shared.jsx

import { _getUsers, _getQuestions, _saveQuestion, _saveQuestionAnswer } from '../_DATA';

// Action Types
const RECEIVE_USERS = 'RECEIVE_USERS';
const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
const ADD_QUESTION = 'ADD_QUESTION';
const SAVE_QUESTION_ANSWER = 'SAVE_QUESTION_ANSWER';

// Action Creators
export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  };
}

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}

export function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  };
}

export function saveQuestionAnswer(authedUser, qid, answer) {
  return {
    type: SAVE_QUESTION_ANSWER,
    authedUser,
    qid,
    answer,
  };
}

// Thunk Actions
export function handleInitialData() {
  return async (dispatch) => {
    try {
      const [users, questions] = await Promise.all([_getUsers(), _getQuestions()]);
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));
    } catch (error) {
      console.error('Error fetching initial data:', error);
    }
  };
}

export function handleAddQuestion(optionOneText, optionTwoText) {
  return async (dispatch, getState) => {
    try {
      const { authedUser } = getState();
      const question = {
        optionOneText,
        optionTwoText,
        author: authedUser,
      };
      const newQuestion = await _saveQuestion(question);
      dispatch(addQuestion(newQuestion));
    } catch (error) {
      console.error('Error saving question:', error);
    }
  };
}

export function handleSaveQuestionAnswer(qid, answer) {
  return async (dispatch, getState) => {
    try {
      const { authedUser } = getState();
      await _saveQuestionAnswer({ authedUser, qid, answer });
      dispatch(saveQuestionAnswer(authedUser, qid, answer));
    } catch (error) {
      console.error('Error saving question answer:', error);
    }
  };
}
