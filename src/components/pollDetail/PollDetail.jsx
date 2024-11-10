// import { useParams, useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { answerQuestion } from '../../slices/questionsSlice'; // Adjust the path as needed
// import { useState } from 'react';
// import './PollDetail.css';

// function PollDetail() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const questions = useSelector(state => state.questions.questions);
//   const users = useSelector(state => state.users.users);

//   const poll = questions[id];
//   const [voteStatus, setVoteStatus] = useState(null);

//   if (!poll) {
//     return <p>Poll not found</p>;
//   }

//   const author = users[poll.author];

//   const handleVote = () => {
//     dispatch(answerQuestion({ authedUser: 'currentUserId', qid: id, answer: 'optionOne' }))
//       .then(() => {
//         setVoteStatus('Thank you for voting!');
//         setTimeout(() => {
//           navigate('/');
//         }, 2000); 
//       });
//   };

//   return (
//     <div className="poll-detail">
//       <h2>{author.name} asks:</h2>
//       <div className="poll-content">
//         <p className="author">{poll.optionOne.text}</p>
//         <p className="author">{poll.optionTwo.text}</p>
//         <p className="timestamp">Created at: {new Date(poll.timestamp).toLocaleString()}</p>
//       </div>
//       <button className="vote-button" onClick={handleVote}>Vote</button>
//       {voteStatus && <p className="vote-status">{voteStatus}</p>}
//     </div>
//   );
// }

// export default PollDetail;

import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { answerQuestion } from '../../slices/questionsSlice'; // Adjust the path as needed
import { useState, useEffect } from 'react';
import './PollDetail.css';

function PollDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Fetching questions and users from Redux store
  const questions = useSelector(state => state.questions.questions);
  const users = useSelector(state => state.users.users);
  const authedUser = useSelector(state => state.users.authedUser); 

  const poll = questions[id];

  const [voteStatus, setVoteStatus] = useState(null);
  const [userVote, setUserVote] = useState(null);

  useEffect(() => {
    if (authedUser && poll) {
      // Check if the current user has already voted
      if (poll.optionOne.votes.includes(authedUser)) {
        setUserVote('optionOne');
      } else if (poll.optionTwo.votes.includes(authedUser)) {
        setUserVote('optionTwo');
      }
    }
  }, [authedUser, poll]);

  if (!poll) {
    return <p>Poll not found</p>;
  }

  const author = users[poll.author];

  const handleVote = (option) => {
    if (!authedUser) {
      setVoteStatus("You need to log in to vote.");
      return;
    }

    dispatch(answerQuestion({ authedUser, qid: id, answer: option }))
      .then(() => {
        setVoteStatus('Thank you for voting!');
        setTimeout(() => {
          navigate('/');
        }, 2000); // Redirect after 2 seconds
      })
      .catch(() => {
        setVoteStatus('Error voting. Please try again.');
      });
  };

  const totalVotes = poll.optionOne.votes.length + poll.optionTwo.votes.length;
  const optionOnePercent = totalVotes > 0 ? (poll.optionOne.votes.length / totalVotes) * 100 : 0;
  const optionTwoPercent = totalVotes > 0 ? (poll.optionTwo.votes.length / totalVotes) * 100 : 0;

  return (
    <div className="poll-detail">
      <h2>{author.name} asks:</h2>
      <div className="poll-content">
        <p className="author">{poll.optionOne.text}</p>
        <p>{poll.optionOne.votes.length} vote(s) ({optionOnePercent.toFixed(1)}%)</p>
        <button
          className={`vote-button ${userVote === 'optionOne' ? 'voted' : ''}`}
          onClick={() => handleVote('optionOne')}
          disabled={userVote !== null}
        >
          Vote for Option One
        </button>

        <p className="author">{poll.optionTwo.text}</p>
        <p>{poll.optionTwo.votes.length} vote(s) ({optionTwoPercent.toFixed(1)}%)</p>
        <button
          className={`vote-button ${userVote === 'optionTwo' ? 'voted' : ''}`}
          onClick={() => handleVote('optionTwo')}
          disabled={userVote !== null}
        >
          Vote for Option Two
        </button>

        <p className="timestamp">Created at: {new Date(poll.timestamp).toLocaleString()}</p>
      </div>

      {voteStatus && <p className="vote-status">{voteStatus}</p>}
    </div>
  );
}

export default PollDetail;
