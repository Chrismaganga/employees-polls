import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { answerQuestion } from '../../slices/questionsSlice';
import './PollDetail.css';

function PollDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Fetching data from Redux store
  const { questions, status: questionsStatus } = useSelector(state => state.questions);
  const { users } = useSelector(state => state.users);
  const { authedUser, isAuthenticated } = useSelector(state => state.auth);

  const [voteStatus, setVoteStatus] = useState(null);
  const [userVote, setUserVote] = useState(null);
  const [isVoting, setIsVoting] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/questions/${id}` } });
    }
  }, [isAuthenticated, navigate, id]);

  // Set user's vote if they've already voted
  useEffect(() => {
    if (authedUser && questions?.[id]) {
      const poll = questions[id];
      if (poll.optionOne.votes.includes(authedUser)) {
        setUserVote('optionOne');
      } else if (poll.optionTwo.votes.includes(authedUser)) {
        setUserVote('optionTwo');
      }
    }
  }, [authedUser, questions, id]);

  // Handle loading and error states
  if (questionsStatus === 'loading') {
    return <div className="loading">Loading poll...</div>;
  }

  if (questionsStatus === 'failed') {
    return (
      <div className="error">
        <h2>Error Loading Poll</h2>
        <p>There was a problem loading the poll. Please try again later.</p>
        <button onClick={() => navigate('/')}>Return to Home</button>
      </div>
    );
  }

  const poll = questions?.[id];
  
  // Handle invalid poll ID
  if (!poll && questionsStatus === 'succeeded') {
    return (
      <div className="not-found">
        <h2>404 - Poll Not Found</h2>
        <p>The poll you're looking for doesn't exist.</p>
        <button onClick={() => navigate('/')}>Return to Home</button>
      </div>
    );
  }

  const author = poll ? users?.[poll.author] : null;

  if (!author) {
    return (
      <div className="error">
        <h2>Error Loading Author</h2>
        <p>There was a problem loading the poll author. Please try again later.</p>
        <button onClick={() => navigate('/')}>Return to Home</button>
      </div>
    );
  }

  const handleVote = async (option) => {
    if (!authedUser) {
      navigate('/login', { state: { from: `/questions/${id}` } });
      return;
    }

    if (userVote) {
      setVoteStatus("You've already voted on this poll!");
      return;
    }

    setIsVoting(true);
    setVoteStatus(null);

    try {
      await dispatch(answerQuestion({ authedUser, qid: id, answer: option })).unwrap();
      setUserVote(option);
      setVoteStatus('Your vote has been recorded!');
    } catch (error) {
      setVoteStatus('Error recording your vote. Please try again.');
      console.error('Voting error:', error);
    } finally {
      setIsVoting(false);
    }
  };

  const totalVotes = poll.optionOne.votes.length + poll.optionTwo.votes.length;
  const optionOnePercent = totalVotes > 0 ? (poll.optionOne.votes.length / totalVotes) * 100 : 0;
  const optionTwoPercent = totalVotes > 0 ? (poll.optionTwo.votes.length / totalVotes) * 100 : 0;

  return (
    <div className="poll-detail">
      <h2>{author.name} asks:</h2>
      <div className="poll-content">
        {voteStatus && <p className="vote-status">{voteStatus}</p>}
        
        <div className="poll-option">
          <p className="option-text">{poll.optionOne.text}</p>
          <p className="vote-count">
            {poll.optionOne.votes.length} vote(s) ({optionOnePercent.toFixed(1)}%)
            {userVote === 'optionOne' && <span className="your-vote"> - Your Vote</span>}
          </p>
          {!userVote && (
            <button
              className="vote-button"
              onClick={() => handleVote('optionOne')}
              disabled={isVoting}
            >
              {isVoting ? 'Voting...' : 'Vote for Option One'}
            </button>
          )}
        </div>

        <div className="poll-option">
          <p className="option-text">{poll.optionTwo.text}</p>
          <p className="vote-count">
            {poll.optionTwo.votes.length} vote(s) ({optionTwoPercent.toFixed(1)}%)
            {userVote === 'optionTwo' && <span className="your-vote"> - Your Vote</span>}
          </p>
          {!userVote && (
            <button
              className="vote-button"
              onClick={() => handleVote('optionTwo')}
              disabled={isVoting}
            >
              {isVoting ? 'Voting...' : 'Vote for Option Two'}
            </button>
          )}
        </div>

        <p className="timestamp">Created at: {new Date(poll.timestamp).toLocaleString()}</p>
      </div>
    </div>
  );
}

export default PollDetail;
