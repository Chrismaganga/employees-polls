import '@testing-library/jest-dom'; // Ensure jest-dom matchers are available

import {
  _getQuestions,
  _getUsers,
  _saveQuestion,
  _saveQuestionAnswer
} from '../_DATA';

// Adjust the import path as needed

describe('API Functions', () => {
  test('should fetch users', async () => {
    const users = await _getUsers();
    expect(users).toHaveProperty('sarahedo');
    expect(users).toHaveProperty('tylermcginnis');
  });

  test('should fetch questions', async () => {
    const questions = await _getQuestions();
    expect(questions).toHaveProperty('8xf0y6ziyjabvozdd253nd');
    expect(questions).toHaveProperty('vthrdm985a262al8qx3do');
  });

  test('should save a question', async () => {
    const questionData = {
      optionOneText: 'Option One',
      optionTwoText: 'Option Two',
      author: 'sarahedo',
    };

    const savedQuestion = await _saveQuestion(questionData);
    expect(savedQuestion).toHaveProperty('id');
    expect(savedQuestion).toHaveProperty('author', 'sarahedo');
    expect(savedQuestion).toHaveProperty('optionOne.text', 'Option One');
    expect(savedQuestion).toHaveProperty('optionTwo.text', 'Option Two');
  });

  test('should reject saving a question with missing data', async () => {
    await expect(_saveQuestion({})).rejects.toEqual(
      "Please provide optionOneText, optionTwoText, and author"
    );
  });

  test('should save a question answer', async () => {
    const result = await _saveQuestionAnswer({
      authedUser: 'sarahedo',
      qid: '8xf0y6ziyjabvozdd253nd',
      answer: 'optionOne',
    });
    expect(result).toBe(true);
  });

  test('should reject saving a question answer with missing data', async () => {
    await expect(_saveQuestionAnswer({})).rejects.toEqual(
      "Please provide authedUser, qid, and answer"
    );
  });
});
