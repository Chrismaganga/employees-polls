import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    votes: {},
    user: null,
};

const votingSlice = createSlice({
    name: 'voting',
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
        },
        vote(state, action) {
            const { userId, vote } = action.payload;
            if (state.user && state.user.id === userId) {
                state.votes[userId] = vote;
            }
        },
        resetVotes(state) {
            state.votes = {};
        },
        enableVotingRights(state, action) {
            const { userId } = action.payload;
            if (state.user && state.user.id === userId) {
            }
        },
    },
});

export const { setUser, vote, resetVotes, enableVotingRights } = votingSlice.actions;

export default votingSlice.reducer;