import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Poll from './Poll';
import { Link } from 'react-router-dom';

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

  const displayedQuestions = showAnswered ? answered : unanswered;

  return (
    <div className="home-container">
      <div className="toggle-buttons">
        <button
          className={!showAnswered ? 'active' : ''}
          onClick={() => setShowAnswered(false)}
        >
          Unanswered Polls
        </button>
        <button
          className={showAnswered ? 'active' : ''}
          onClick={() => setShowAnswered(true)}
        >
          Answered Polls
        </button>
      </div>
      <ul className="polls-list">
        {displayedQuestions.map(question => (
          <li key={question.id}>
            <Link to={`/questions/${question.id}`}>
              <Poll question={question} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
