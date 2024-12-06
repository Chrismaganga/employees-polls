import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { answerQuestion } from '../../slices/questionsSlice';
import './PollDetail.css';

function PollDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState('');
  const [isVoting, setIsVoting] = useState(false);
  const [error, setError] = useState(null);
  
  const { isAuthenticated, userProfile } = useSelector((state) => state.auth);
  const question = useSelector((state) => state.questions.questions[id]);
  const votes = {
    optionOne: question?.optionOne.votes || [],
    optionTwo: question?.optionTwo.votes || []
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!question) {
    return <div className="poll-detail-error">Poll not found</div>;
  }

  const totalVotes = votes.optionOne.length + votes.optionTwo.length;
  const hasVoted = userProfile && (
    votes.optionOne.includes(userProfile.id) || 
    votes.optionTwo.includes(userProfile.id)
  );

  const calculatePercentage = (optionVotes) => {
    if (totalVotes === 0) return 0;
    return Math.round((optionVotes.length / totalVotes) * 100);
  };

  const handleVote = async () => {
    if (!selectedOption || !isAuthenticated || hasVoted || isVoting) {
      return;
    }

    setIsVoting(true);
    setError(null);

    try {
      await dispatch(answerQuestion({
        authedUser: userProfile.id,
        qid: id,
        answer: selectedOption
      })).unwrap();
    } catch (err) {
      setError(err.message || 'Failed to submit vote. Please try again.');
      console.error('Voting error:', err);
    } finally {
      setIsVoting(false);
    }
  };

  return (
    <div className="poll-detail">
      <h2 className="poll-title">Would You Rather...</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="options-container">
        <div className={`option ${hasVoted && votes.optionOne.includes(userProfile?.id) ? 'voted' : ''}`}>
          <h3>{question.optionOne.text}</h3>
          {hasVoted && (
            <div className="vote-stats">
              <div className="vote-bar" style={{ width: `${calculatePercentage(votes.optionOne)}%` }}></div>
              <span>{votes.optionOne.length} votes ({calculatePercentage(votes.optionOne)}%)</span>
            </div>
          )}
          {!hasVoted && (
            <button
              className={`vote-button ${selectedOption === 'optionOne' ? 'selected' : ''}`}
              onClick={() => setSelectedOption('optionOne')}
              disabled={isVoting}
            >
              Select
            </button>
          )}
        </div>

        <div className="or-divider">OR</div>

        <div className={`option ${hasVoted && votes.optionTwo.includes(userProfile?.id) ? 'voted' : ''}`}>
          <h3>{question.optionTwo.text}</h3>
          {hasVoted && (
            <div className="vote-stats">
              <div className="vote-bar" style={{ width: `${calculatePercentage(votes.optionTwo)}%` }}></div>
              <span>{votes.optionTwo.length} votes ({calculatePercentage(votes.optionTwo)}%)</span>
            </div>
          )}
          {!hasVoted && (
            <button
              className={`vote-button ${selectedOption === 'optionTwo' ? 'selected' : ''}`}
              onClick={() => setSelectedOption('optionTwo')}
              disabled={isVoting}
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
          disabled={!selectedOption || isVoting}
        >
          {isVoting ? 'Submitting...' : 'Submit Vote'}
        </button>
      )}

      <div className="total-votes">
        Total votes: {totalVotes}
      </div>
    </div>
  );
}

export default PollDetail;
