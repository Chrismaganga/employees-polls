import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Poll({ question }) {
  const users = useSelector(state => state.users.users);

  if (!question) {
    return <div>Question not found</div>;
  }

  const author = users[question.author];
  const { optionOne, optionTwo } = question;

  return (
    <div className="poll">
      <img
        className="poll-avatar"
        src={author.avatarURL || "https://placehold.co/600x400.png"}
        alt={`Avatar of ${author.name}`}
        width="50"
        height="50"
      />
      <div className="poll-content">
        <h3 className="poll-title">Would You Rather</h3>
        <p className="poll-option">...{optionOne.text}...</p>
        <p className="poll-author">Asked by {author.name}</p>
        <Link to={`/questions/${question.id}`} className="poll-link">
          View Poll
        </Link>
      </div>
    </div>
  );
}

export default Poll;
