import votingReducer, {
  setUser,
  vote,
  resetVotes,
  enableVotingRights
} from '../slices/votingSlice';

describe('votingSlice', () => {
  const initialState = {
    votes: {},
    user: null,
    canVote: false
  };

  it('should handle initial state', () => {
    expect(votingReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle setUser', () => {
    const user = { id: 'testuser', name: 'Test User' };
    const actual = votingReducer(initialState, setUser(user));
    expect(actual.user).toEqual(user);
  });

  it('should handle vote when user has voting rights', () => {
    const stateWithUser = {
      ...initialState,
      user: { id: 'testuser' },
      canVote: true
    };
    const votePayload = {
      userId: 'testuser',
      questionId: 'question1',
      option: 'optionOne'
    };
    const actual = votingReducer(stateWithUser, vote(votePayload));
    expect(actual.votes).toEqual({
      'question1': 'optionOne'
    });
  });

  it('should not handle vote when user has no voting rights', () => {
    const stateWithUser = {
      ...initialState,
      user: { id: 'testuser' },
      canVote: false
    };
    const votePayload = {
      userId: 'testuser',
      questionId: 'question1',
      option: 'optionOne'
    };
    const actual = votingReducer(stateWithUser, vote(votePayload));
    expect(actual.votes).toEqual({});
  });

  it('should handle resetVotes', () => {
    const stateWithVotes = {
      ...initialState,
      votes: { 'question1': 'optionOne' },
      canVote: true
    };
    const actual = votingReducer(stateWithVotes, resetVotes());
    expect(actual).toEqual(initialState);
  });

  it('should handle enableVotingRights', () => {
    const stateWithUser = {
      ...initialState,
      user: { id: 'testuser' }
    };
    const actual = votingReducer(
      stateWithUser,
      enableVotingRights({ userId: 'testuser' })
    );
    expect(actual.canVote).toBe(true);
  });
});
