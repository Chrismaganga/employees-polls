// src/actions/polls.js
// import { saveQuestion } from '../reducers_DATA/addPoll'; // Adjust import as needed
import { _getUsers, _getQuestions, _saveQuestion, _saveQuestionAnswer } from '../_DATA';

export const ADD_POLL = 'ADD_POLL';

export function addPoll(question) {
  return {
    type: ADD_POLL,
    question,
  };
}

export function handleAddPoll(optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    const question = {
      optionOneText,
      optionTwoText,
      author: authedUser,
    };

    return saveQuestion(question).then((formattedQuestion) => {
      dispatch(addPoll(formattedQuestion));
    });
  };
}
