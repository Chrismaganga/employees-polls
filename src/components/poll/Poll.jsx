import { Link } from 'react-router-dom';
import React from 'react';
import { useSelector } from 'react-redux';
import './Poll.css';

function Poll({ question }) {
  const users = useSelector(state => state.users.users);

  if (!question) {
    return (
      <div className="poll-not-found">
        <p>Question not found</p>
      </div>
    );
  }

  const author = users[question.author];

  if (!author) {
    return (
      <div className="poll-not-found">
        <p>Author not found</p>
      </div>
    );
  }
  const { optionOne, optionTwo } = question;

  return (
    <div className="poll">
      <div className="poll-header">
        <img
          className="poll-avatar"
          src={author.avatarURL}
          alt={`Avatar of ${author.name}`}
          width="50"
          height="50"
        />
        <div className="poll-author-info">
          <p className="poll-author-name">{author.name}</p>
          <p className="poll-author-text">Asked you a question</p>
        </div>
      </div>

    <div className="poll-link" onClick={() => window.location.href = `/questions/${question.id}`}>
      <div className="poll-content">
        <h3 className="poll-title">Would You Rather</h3>
        <p className="poll-option">{`...${optionOne.text}...`}</p>
        <p className="poll-option">{`...${optionTwo.text}...`}</p>
      </div>
      View Poll
    </div>
    </div>
  );
}

export default Poll;
