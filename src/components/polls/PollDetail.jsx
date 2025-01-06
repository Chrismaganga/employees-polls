import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { answerQuestion } from '../../slices/questionsSlice';
import './PollDetail.css';

const PollDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState('');
  const [isVoting, setIsVoting] = useState(false);
  const [error, setError] = useState(null);
  
  const authedUser = useSelector((state) => state.auth.authedUser);
  const users = useSelector((state) => state.users.users);
  const question = useSelector((state) => state.questions.questions[id]);

  useEffect(() => {
    if (!authedUser) {
      navigate('/login');
    }
  }, [authedUser, navigate]);

  if (!question) {
    return (
      <div className="poll-detail-container error">
        <h2>Poll Not Found</h2>
        <p>The poll you're looking for doesn't exist.</p>
        <button onClick={() => navigate('/')} className="back-button">
          Back to Polls
        </button>
      </div>
    );
  }

  const author = users[question.author];
  const totalVotes = question.optionOne.votes.length + question.optionTwo.votes.length;
  const hasVoted = question.optionOne.votes.includes(authedUser) || 
                  question.optionTwo.votes.includes(authedUser);

  const calculateStats = (option) => {
    const votes = option.votes.length;
    const percentage = totalVotes === 0 ? 0 : Math.round((votes / totalVotes) * 100);
    return { votes, percentage };
  };

  const optionOneStats = calculateStats(question.optionOne);
  const optionTwoStats = calculateStats(question.optionTwo);

  const handleVote = async () => {
    if (!selectedOption || !authedUser || hasVoted || isVoting) {
      return;
    }

    setIsVoting(true);
    setError(null);

    try {
      await dispatch(answerQuestion({
        authedUser,
        qid: id,
        answer: selectedOption
      })).unwrap();
    } catch (err) {
      setError('Failed to submit vote. Please try again.');
      console.error('Voting error:', err);
    } finally {
      setIsVoting(false);
    }
  };

  const getUserVote = () => {
    if (question.optionOne.votes.includes(authedUser)) return 'optionOne';
    if (question.optionTwo.votes.includes(authedUser)) return 'optionTwo';
    return null;
  };

  return (
    <div className="poll-detail-container">
      <div className="poll-author">
        <img 
          src={author?.avatarURL} 
          alt={`Avatar of ${author?.name}`} 
          className="author-avatar"
        />
        <div className="author-info">
          <h3>{author?.name} asks:</h3>
          <span className="timestamp">
            {new Date(question.timestamp).toLocaleString()}
          </span>
        </div>
      </div>

      <div className="poll-content">
        <h2>Would You Rather...</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <div className="options-container">
          <div className={`option ${getUserVote() === 'optionOne' ? 'voted' : ''}`}>
            <div className="option-content">
              <h3>{question.optionOne.text}</h3>
              {hasVoted && (
                <div className="vote-stats">
                  <div 
                    className="vote-bar" 
                    style={{ width: `${optionOneStats.percentage}%` }} 
                  />
                  <div className="stats-text">
                    <span>{optionOneStats.votes} votes</span>
                    <span>{optionOneStats.percentage}%</span>
                  </div>
                  {getUserVote() === 'optionOne' && (
                    <span className="your-vote-badge">Your vote</span>
                  )}
                </div>
              )}
            </div>
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

          <div className="option-divider">OR</div>

          <div className={`option ${getUserVote() === 'optionTwo' ? 'voted' : ''}`}>
            <div className="option-content">
              <h3>{question.optionTwo.text}</h3>
              {hasVoted && (
                <div className="vote-stats">
                  <div 
                    className="vote-bar" 
                    style={{ width: `${optionTwoStats.percentage}%` }} 
                  />
                  <div className="stats-text">
                    <span>{optionTwoStats.votes} votes</span>
                    <span>{optionTwoStats.percentage}%</span>
                  </div>
                  {getUserVote() === 'optionTwo' && (
                    <span className="your-vote-badge">Your vote</span>
                  )}
                </div>
              )}
            </div>
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
            className="submit-vote-button"
            onClick={handleVote}
            disabled={!selectedOption || isVoting}
          >
            {isVoting ? 'Submitting...' : 'Submit Vote'}
          </button>
        )}

        <button 
          onClick={() => navigate('/')} 
          className="back-button"
        >
          Back to Polls
        </button>
      </div>
    </div>
  );
};

export default PollDetail;