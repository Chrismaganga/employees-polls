import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function PollDetail() {
  const { id } = useParams();
  const questions = useSelector(state => state.questions.questions);
  const users = useSelector(state => state.users.users);

  const poll = questions[id];

  if (!poll) {
    return <p>Poll not found</p>;
  }

  const author = users[poll.author];

  return (
    <div className="poll-detail">
      <h2>{author.name} asks:</h2>
      <div className="poll-content">
        <p className="author">{poll.optionOne.text}</p>
        <p className="author">{poll.optionTwo.text}</p>
        <p className="timestamp">Created at: {new Date(poll.timestamp).toLocaleString()}</p>
      </div>
      <button className="vote-button">Vote</button>
    </div>
  );
}

export default PollDetail;
