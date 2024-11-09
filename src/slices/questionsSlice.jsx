import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { _getQuestions, _saveQuestion, _saveQuestionAnswer } from '../_DATA';

// Fetch all questions
export const fetchQuestions = createAsyncThunk('questions/fetchQuestions', async () => {
  const questions = await _getQuestions();
  return questions;
});

// Add a new question
export const addQuestion = createAsyncThunk('questions/addQuestion', async (question) => {
  const savedQuestion = await _saveQuestion(question);
  return savedQuestion;
});

// Answer a question (this was already defined)
export const answerQuestion = createAsyncThunk('questions/answerQuestion', async (answer) => {
  await _saveQuestionAnswer(answer);
  return answer;
});

// Handle voting on a question
export const handleVote = createAsyncThunk('questions/handleVote', async ({ authedUser, qid, answer }) => {
  // Update the backend with the vote
  await _saveQuestionAnswer({ authedUser, qid, answer });
  return { authedUser, qid, answer };
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
      // Handle loading state for fetchQuestions
      .addCase(fetchQuestions.pending, state => {
        state.status = 'loading';
      })
      // When fetchQuestions succeeds, update the state
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.questions = action.payload;
      })
      // If fetchQuestions fails, set the error state
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // When a new question is added, update the state with the new question
      .addCase(addQuestion.fulfilled, (state, action) => {
        state.questions[action.payload.id] = action.payload;
      })
      // When an answer is submitted, update the votes in the state
      .addCase(answerQuestion.fulfilled, (state, action) => {
        const { authedUser, qid, answer } = action.payload;
        state.questions[qid][answer].votes.push(authedUser);
      })
      // Handle the vote action
      .addCase(handleVote.fulfilled, (state, action) => {
        const { authedUser, qid, answer } = action.payload;
        // Add the vote to the correct answer option
        state.questions[qid][answer].votes.push(authedUser);
      });
  },
});

export default questionsSlice.reducer;
