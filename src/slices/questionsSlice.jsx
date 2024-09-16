import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { _getQuestions, _saveQuestion, _saveQuestionAnswer } from '../_DATA';

export const fetchQuestions = createAsyncThunk('questions/fetchQuestions', async () => {
  const questions = await _getQuestions();
  return questions;
});

export const addQuestion = createAsyncThunk('questions/addQuestion', async (question) => {
  const savedQuestion = await _saveQuestion(question);
  return savedQuestion;
});

export const answerQuestion = createAsyncThunk('questions/answerQuestion', async (answer) => {
  await _saveQuestionAnswer(answer);
  return answer;
});

const questionsSlice = createSlice({
  name: 'questions',
  initialState: {
    questions: {},
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchQuestions.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.questions = action.payload;
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addQuestion.fulfilled, (state, action) => {
        state.questions[action.payload.id] = action.payload;
      })
      .addCase(answerQuestion.fulfilled, (state, action) => {
        const { authedUser, qid, answer } = action.payload;
        state.questions[qid][answer].votes.push(authedUser);
      });
  },
});

export default questionsSlice.reducer;
