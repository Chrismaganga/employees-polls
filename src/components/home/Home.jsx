import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Poll from '../poll/Poll';
import './Home.css';


function Home() {
  const [showAnswered, setShowAnswered] = useState(false);
  const authedUser = useSelector(state => state.auth.authedUser);
  const users = useSelector(state => state.users.users);
  const questions = useSelector(state => state.questions.questions);

  const answeredIds = users[authedUser] ? Object.keys(users[authedUser].answers) : [];
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
            <ul className='question'>
              {answered.map(question => (
                <li key={question.id}>
                  <Link to={`/questions/${question.id}`}>
                    <Poll question={question} />
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className='para'>No answered polls available</p>
          )
        ) : (
          unanswered.length > 0 ? (
            <ul className='answers'>
              {unanswered.map(question => (
                <li key={question.id} className='list'>
                  <Link to={`/questions/${question.id}`}>
                    <Poll question={question} />
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className='para'>No unanswered polls available</p>
          )
        )}
      </div>
    </div>
  );
}

export default Home;