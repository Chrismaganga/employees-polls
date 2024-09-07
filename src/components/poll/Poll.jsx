// src/components/Poll.js
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// import './Poll.css';
const Poll = () => {
  const [showAnswered, setShowAnswered] = useState(false);
  const authedUser = useSelector((state) => state.authedUser);
  const questions = useSelector((state) => state.questions);
  const users = useSelector((state) => state.users);

  const answeredPolls = Object.keys(users[authedUser].answers);
  const unansweredPolls = Object.keys(questions).filter(
    (qid) => !answeredPolls.includes(qid)
  );

  const pollList = showAnswered ? answeredPolls : unansweredPolls;

  return (
    <div className="polls">
      <button onClick={() => setShowAnswered(false)}>Unanswered Polls</button>
      <button onClick={() => setShowAnswered(true)}>Answered Polls</button>

      <ul>
        {pollList.map((id) => (
          <li key={id}>
            <Link to={`/questions/${id}`}>
              {questions[id].optionOne.text} or {questions[id].optionTwo.text}?
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Poll;
