import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleVote } from '../../slices/questionsSlice'; 
import { useNavigate } from 'react-router-dom'; 

const PollDetail = ({ match }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = match.params; 
  const question = useSelector((state) => state.questions.questions[id]); 
  const authedUser = useSelector((state) => state.auth.authedUser); 

  if (!question) {
    return <div>Poll not found</div>;
  }

  const { optionOne, optionTwo } = question;
  const userVote = optionOne.votes.includes(authedUser)
    ? 'optionOne'
    : optionTwo.votes.includes(authedUser)
    ? 'optionTwo'
    : null; // Check if the user has voted

  // Handle voting
  const handleVoteSubmit = (answer) => {
    if (!authedUser) {
      // Optionally, navigate to login if the user is not authenticated
      navigate('/login');
      return;
    }
    // Dispatch the vote action with the user's choice
    dispatch(handleVote({ authedUser, qid: id, answer }));
  };

  return (
    <div className="poll-detail">
      <h2>{question.author} asks:</h2>
      <h3>Would you rather...</h3>
      <div className="poll-options">
        <button
          onClick={() => handleVoteSubmit('optionOne')}
          disabled={userVote !== null} // Disable the button if the user already voted
          className={`option-button ${userVote === 'optionOne' ? 'voted' : ''}`}
        >
          {optionOne.text}
        </button>
        <button
          onClick={() => handleVoteSubmit('optionTwo')}
          disabled={userVote !== null} 
          className={`option-button ${userVote === 'optionTwo' ? 'voted' : ''}`}
        >
          {optionTwo.text}
        </button>
      </div>

      {userVote && (
        <div className="poll-result">
          <h3>Your Vote: {userVote === 'optionOne' ? optionOne.text : optionTwo.text}</h3>
          {/* Optionally display poll results here */}
          <div>
            <p>{optionOne.text}: {optionOne.votes.length} votes</p>
            <p>{optionTwo.text}: {optionTwo.votes.length} votes</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PollDetail;
