import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function Poll({ question }) {
  const { id } = useParams();
  const users = useSelector(state => state.users.users);
  // const author = users[question.author];
  if (!question) {
    return <div>Question not found</div>;
  }
  const { author, optionOne, optionTwo } = question;
  return (
    <div className="poll">
      {/* <img src={author.avatarURL || '/default-avatar.png'} alt={`Avatar of ${author.name}`} />
      <div className="poll-info">
        <h3>Would You Rather</h3>
        <p>...{question.optionOne.text}...</p>
        <p>Asked by {author.name}</p>
      </div> */}
      <h3>Poll by {author}</h3>
      <p>Option One: {optionOne.text}</p>
      <p>Option Two: {optionTwo.text}</p>
    </div>
  );
}

export default Poll;
