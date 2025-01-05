// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { _getQuestions, _saveQuestion, _saveQuestionAnswer } from '../_DATA';

// // Fetch all questions
// export const fetchQuestions = createAsyncThunk('questions/fetchQuestions', async () => {
//   const questions = await _getQuestions();
//   return questions;
// });

// // Add a new question
// export const addQuestion = createAsyncThunk('questions/addQuestion', async (question) => {
//   const savedQuestion = await _saveQuestion(question);
//   return savedQuestion;
// });

// // Answer a question
// export const answerQuestion = createAsyncThunk('questions/answerQuestion', async (answer) => {
//   await _saveQuestionAnswer(answer);
//   return answer;
// });

// // Handle voting on a question
// export const handleVote = createAsyncThunk('questions/handleVote', async ({ authedUser, qid, answer }) => {
//   await _saveQuestionAnswer({ authedUser, qid, answer });
//   return { authedUser, qid, answer };
// });

// const questionsSlice = createSlice({
//   name: 'questions',
//   initialState: {
//     questions: {},
//     status: 'idle',
//     error: null,
//   },
//   reducers: {},
//   extraReducers: builder => {
//     builder
//       .addCase(fetchQuestions.pending, state => {
//         state.status = 'loading';
//       })
//       .addCase(fetchQuestions.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.questions = action.payload;
//       })
//       .addCase(fetchQuestions.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       })
//       .addCase(addQuestion.fulfilled, (state, action) => {
//         state.questions[action.payload.id] = action.payload; // Add new question to state
//       })
//       .addCase(answerQuestion.fulfilled, (state, action) => {
//         const { authedUser, qid, answer } = action.payload;
//         state.questions[qid][answer].votes.push(authedUser);
//       })
//       .addCase(handleVote.fulfilled, (state, action) => {
//         const { authedUser, qid, answer } = action.payload;
//         state.questions[qid][answer].votes.push(authedUser);
//       });
//   },
// });

// export default questionsSlice.reducer;
// questionsSlice.js
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
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
        // Add the newly created question to the state
        state.questions[action.payload.id] = action.payload;
      });
  },
});

export default questionsSlice.reducer;
