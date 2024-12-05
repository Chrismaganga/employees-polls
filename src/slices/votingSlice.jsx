import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  votes: {},
  canVote: false,
  user: null
};

const votingSlice = createSlice({
  name: 'voting',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.canVote = true;
    },
    vote: (state, action) => {
      if (!state.canVote) return;
      const { pollId, option } = action.payload;
      if (!state.votes[pollId]) {
        state.votes[pollId] = option;
      }
    },
    resetVotes: (state) => {
      state.votes = {};
      state.canVote = false;
      state.user = null;
    },
    enableVotingRights: (state) => {
      state.canVote = true;
    }
  }
});

export const { setUser, vote, resetVotes, enableVotingRights } = votingSlice.actions;
export default votingSlice.reducer;