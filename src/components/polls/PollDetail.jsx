import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { startVoting, voteSuccess, voteFailed } from '../../slices/votingSlice';
import './PollDetail.css';

function PollDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState('');
  
  const { isAuthenticated, userProfile } = useSelector((state) => state.auth);
  const { loading, error } = useSelector(selectVoting);
  const question = useSelector((state) => selectQuestions(state)[id]);
  const votes = useSelector((state) => selectVotes(state, id));

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!question) {
    return <div className="poll-detail-error">Poll not found</div>;
  }

  const totalVotes = Object.keys(votes).length;
  const optionOneVotes = Object.values(votes).filter(v => v === 'optionOne').length;
  const optionTwoVotes = Object.values(votes).filter(v => v === 'optionTwo').length;

  const hasVoted = votes[userProfile?.id];

  const calculatePercentage = (optionVotes) => {
    if (totalVotes === 0) return 0;
    return Math.round((optionVotes / totalVotes) * 100);
  };

  const handleVote = async () => {
    if (!selectedOption || !isAuthenticated || hasVoted) return;

    try {
      dispatch(startVoting());
      // Here you would typically make an API call to save the vote
      dispatch(voteSuccess({
        questionId: id,
        option: selectedOption,
        userId: userProfile.id
      }));
    } catch (err) {
      dispatch(voteFailed(err.message));
    }
  };

  return (
    <div className="poll-detail">
      <h2 className="poll-title">Would You Rather...</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="options-container">
        <div className={`option ${hasVoted && votes[userProfile?.id] === 'optionOne' ? 'voted' : ''}`}>
          <h3>{question.optionOne.text}</h3>
          {hasVoted && (
            <div className="vote-stats">
              <div className="vote-bar" style={{ width: `${calculatePercentage(optionOneVotes)}%` }}></div>
              <span>{optionOneVotes} votes ({calculatePercentage(optionOneVotes)}%)</span>
            </div>
          )}
          {!hasVoted && (
            <button
              className={`vote-button ${selectedOption === 'optionOne' ? 'selected' : ''}`}
              onClick={() => setSelectedOption('optionOne')}
              disabled={loading}
            >
              Select
            </button>
          )}
        </div>

        <div className="or-divider">OR</div>

        <div className={`option ${hasVoted && votes[userProfile?.id] === 'optionTwo' ? 'voted' : ''}`}>
          <h3>{question.optionTwo.text}</h3>
          {hasVoted && (
            <div className="vote-stats">
              <div className="vote-bar" style={{ width: `${calculatePercentage(optionTwoVotes)}%` }}></div>
              <span>{optionTwoVotes} votes ({calculatePercentage(optionTwoVotes)}%)</span>
            </div>
          )}
          {!hasVoted && (
            <button
              className={`vote-button ${selectedOption === 'optionTwo' ? 'selected' : ''}`}
              onClick={() => setSelectedOption('optionTwo')}
              disabled={loading}
            >
              Select
            </button>
          )}
        </div>
      </div>

      {!hasVoted && (
        <button
          className="submit-vote"
          onClick={handleVote}
          disabled={!selectedOption || loading}
        >
          {loading ? 'Submitting...' : 'Submit Vote'}
        </button>
      )}

      <div className="total-votes">
        Total votes: {totalVotes}
      </div>
    </div>
  );
}

export default PollDetail;
