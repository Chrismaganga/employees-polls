import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Poll from './Poll';

function Home() {
  const [showAnswered, setShowAnswered] = useState(false);
  const authedUser = useSelector(state => state.auth.authedUser);
  const users = useSelector(state => state.users.users);
  const questions = useSelector(state => state.questions.questions);

  const answeredIds = Object.keys(users[authedUser].answers);
  const unanswered = Object.values(questions)
    .filter(q => !answeredIds.includes(q.id))
    .sort((a, b) => b.timestamp - a.timestamp);
  const answered = Object.values(questions)
    .filter(q => answeredIds.includes(q.id))
    .sort((a, b) => b.timestamp - a.timestamp);

  const handleShowUnanswered = () => {
    setShowAnswered(false);
  };

  const handleShowAnswered = () => {
    setShowAnswered(true);
  };

  return (
    <div className="home-container">
      <div className="toggle-buttons">
        <button
          className={!showAnswered ? 'active' : ''}
          onClick={handleShowUnanswered}
        >
          Unanswered Polls
        </button>
        <button
          className={showAnswered ? 'active' : ''}
          onClick={handleShowAnswered}
        >
          Answered Polls
        </button>
      </div>

      <div className="polls-list">
        {showAnswered ? (
          answered.length > 0 ? (
            <ul>
              {answered.map(question => (
                <li key={question.id}>
                  <Link to={`/questions/${question.id}`}>
                    <Poll question={question} />
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>No answered polls available</p>
          )
        ) : (
          unanswered.length > 0 ? (
            <ul>
              {unanswered.map(question => (
                <li key={question.id}>
                  <Link to={`/questions/${question.id}`}>
                    <Poll question={question} />
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>No unanswered polls available</p>
          )
        )}
      </div>
    </div>
  );
}

export default Home;
