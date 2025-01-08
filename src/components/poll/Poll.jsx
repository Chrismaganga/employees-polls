import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Poll.css';

function Poll({ poll }) {
  const authedUser = useSelector((state) => state.auth.authedUser);
  const users = useSelector((state) => state.users.users);
  const author = users[poll.author];


  // Calculate if the current user has voted
  const hasVoted = poll.optionOne.votes.includes(authedUser) || 
                  poll.optionTwo.votes.includes(authedUser);

  // Calculate vote percentages
  const totalVotes = poll.optionOne.votes.length + poll.optionTwo.votes.length;
  const optionOnePercent = totalVotes === 0 ? 0 : 
    Math.round((poll.optionOne.votes.length / totalVotes) * 100);
  const optionTwoPercent = totalVotes === 0 ? 0 : 
    Math.round((poll.optionTwo.votes.length / totalVotes) * 100);

  return (
    <div className="poll-container">
      <div className="poll-header">
        <img 
          src={author?.avatarURL} 
          alt={`Avatar of ${author?.name}`} 
          className="author-avatar"
        />
        <div className="author-info">
          <h3>{author?.name}</h3>
          <span className="timestamp">
            {new Date(poll.timestamp).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="poll-content">
        <h4>Would you rather...</h4>
        <div className="options">
          <div className="option">
            <p>{poll.optionOne.text}</p>
            {hasVoted && (
              <div className="vote-stats">
                <div className="vote-bar" style={{ width: `${optionOnePercent}%` }} />
                <span>{poll.optionOne.votes.length} votes ({optionOnePercent}%)</span>
                {poll.optionOne.votes.includes(authedUser) && (
                  <span className="your-vote">Your vote</span>
                )}
              </div>
            )}
          </div>

          <div className="option-divider">OR</div>

          <div className="option">
            <p>{poll.optionTwo.text}</p>
            {hasVoted && (
              <div className="vote-stats">
                <div className="vote-bar" style={{ width: `${optionTwoPercent}%` }} />
                <span>{poll.optionTwo.votes.length} votes ({optionTwoPercent}%)</span>
                {poll.optionTwo.votes.includes(authedUser) && (
                  <span className="your-vote">Your vote</span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <Link 
        to={`/questions/${poll.id}`} 
        className="vote-button"
      >
        {hasVoted ? 'View Details' : 'Vote Now'}
      </Link>
    </div>
  );
}

export default Poll;