import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  votes: {},
  error: null,
  loading: false
};

const votingSlice = createSlice({
  name: 'voting',
  initialState,
  reducers: {
    startVoting: (state) => {
      state.loading = true;
      state.error = null;
    },
    voteSuccess: (state, action) => {
      const { questionId, option, userId } = action.payload;
      if (!state.votes[questionId]) {
        state.votes[questionId] = {};
      }
      state.votes[questionId][userId] = option;
      state.loading = false;
      state.error = null;
    },
    voteFailed: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    resetVotes: (state) => {
      state.votes = {};
      state.error = null;
      state.loading = false;
    },
    // Check if user has voted
    hasVoted: (state, action) => {
      const { questionId, userId } = action.payload;
      return state.votes[questionId]?.[userId] !== undefined;
    }
  }
});

export const { startVoting, voteSuccess, voteFailed, resetVotes, hasVoted } = votingSlice.actions;
export default votingSlice.reducer;