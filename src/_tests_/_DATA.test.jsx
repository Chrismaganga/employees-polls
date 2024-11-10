import {
  _getUsers,
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer
} from './data';

describe('Data functions tests', () => {
  
  describe('_getUsers', () => {
    it('should return a copy of the users object', async () => {
      const users = await _getUsers();
      expect(users).toHaveProperty('sarahedo');
      expect(users).toHaveProperty('tylermcginnis');
      expect(users).toHaveProperty('mtsamis');
      expect(users).toHaveProperty('zoshikanlu');
    });

    it('should return user objects with the correct structure', async () => {
      const users = await _getUsers();
      const user = users.sarahedo;
      expect(user).toHaveProperty('id', 'sarahedo');
      expect(user).toHaveProperty('name', 'Sarah Edo');
      expect(user).toHaveProperty('answers');
      expect(user.answers).toBeInstanceOf(Object);
    });
  });

  describe('_getQuestions', () => {
    it('should return a copy of the questions object', async () => {
      const questions = await _getQuestions();
      expect(questions).toHaveProperty('8xf0y6ziyjabvozdd253nd');
      expect(questions).toHaveProperty('6ni6ok3ym7mf1p33lnez');
      expect(questions).toHaveProperty('am8ehyc8byjqgar0jgpub9');
    });

    it('should return question objects with the correct structure', async () => {
      const questions = await _getQuestions();
      const question = questions['8xf0y6ziyjabvozdd253nd'];
      expect(question).toHaveProperty('id', '8xf0y6ziyjabvozdd253nd');
      expect(question).toHaveProperty('author', 'sarahedo');
      expect(question).toHaveProperty('optionOne');
      expect(question.optionOne).toHaveProperty('votes');
      expect(question.optionOne.votes).toBeInstanceOf(Array);
    });
  });

  describe('_saveQuestion', () => {
    it('should save a new question and return it', async () => {
      const newQuestion = {
        optionOneText: 'Learn React',
        optionTwoText: 'Learn Angular',
        author: 'sarahedo'
      };

      const savedQuestion = await _saveQuestion(newQuestion);
      expect(savedQuestion).toHaveProperty('id');
      expect(savedQuestion.optionOne.text).toBe('Learn React');
      expect(savedQuestion.optionTwo.text).toBe('Learn Angular');
      expect(savedQuestion.author).toBe('sarahedo');
    });

    it('should reject if any of the required fields are missing', async () => {
      const newQuestion = { optionOneText: 'Learn React' };  // Missing optionTwoText and author
      await expect(_saveQuestion(newQuestion)).rejects.toThrow("Please provide optionOneText, optionTwoText, and author");
    });
  });

  describe('_saveQuestionAnswer', () => {
    it('should save the user\'s answer to the question', async () => {
      const answerData = {
        authedUser: 'sarahedo',
        qid: '8xf0y6ziyjabvozdd253nd',
        answer: 'optionOne'
      };

      const result = await _saveQuestionAnswer(answerData);
      expect(result).toBe(true);
      const user = (await _getUsers())['sarahedo'];
      expect(user.answers['8xf0y6ziyjabvozdd253nd']).toBe('optionOne');
      const question = (await _getQuestions())['8xf0y6ziyjabvozdd253nd'];
      expect(question.optionOne.votes).toContain('sarahedo');
    });

    it('should reject if required fields are missing', async () => {
      const answerData = { authedUser: 'sarahedo', qid: '8xf0y6ziyjabvozdd253nd' };  // Missing answer
      await expect(_saveQuestionAnswer(answerData)).rejects.toThrow("Please provide authedUser, qid, and answer");
    });

    it('should reject if the user does not exist', async () => {
      const answerData = { authedUser: 'nonexistent', qid: '8xf0y6ziyjabvozdd253nd', answer: 'optionOne' };
      await expect(_saveQuestionAnswer(answerData)).rejects.toThrow("User not found");
    });

    it('should reject if the question does not exist', async () => {
      const answerData = { authedUser: 'sarahedo', qid: 'nonexistent', answer: 'optionOne' };
      await expect(_saveQuestionAnswer(answerData)).rejects.toThrow("Question not found");
    });
  });
});
