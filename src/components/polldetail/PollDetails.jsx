import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { handleSaveQuestionAnswer } from '../../actions/shared';
import './PollDetails.css';
const PollDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const question = useSelector((state) => state.questions[id]);
  const authedUser = useSelector((state) => state.authedUser);
  const user = useSelector((state) => state.users[question.author]);

  const handleVote = (answer) => {
    dispatch(handleSaveQuestionAnswer(authedUser, id, answer));
  };

  if (!question) {
    return <p>This poll does not exist.</p>;
  }

  const totalVotes =
    question.optionOne.votes.length + question.optionTwo.votes.length;
  const optionOnePercentage = (
    (question.optionOne.votes.length / totalVotes) *
    100
  ).toFixed(2);
  const optionTwoPercentage = (
    (question.optionTwo.votes.length / totalVotes) *
    100
  ).toFixed(2);

  return (
    <div className="poll-details">
      <h3>Would You Rather</h3>
      <div>
        <img src={user.avatarURL} alt={`Avatar of ${user.name}`} />
        <h4>{user.name}</h4>
        <button onClick={() => handleVote('optionOne')}>
          {question.optionOne.text} - {optionOnePercentage}% votes
        </button>
        <button onClick={() => handleVote('optionTwo')}>
          {question.optionTwo.text} - {optionTwoPercentage}% votes
        </button>
      </div>
    </div>
  );
};

export default PollDetails;
