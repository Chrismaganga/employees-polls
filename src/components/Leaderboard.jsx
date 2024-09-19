import React from 'react';
import { useSelector } from 'react-redux';

function Leaderboard() {
  const users = useSelector(state => state.users.users);
  const sortedUsers = Object.values(users).sort((a, b) => {
    const scoreA = Object.keys(a.answers).length + a.questions.length;
    const scoreB = Object.keys(b.answers).length + b.questions.length;
    return scoreB - scoreA;
  });

  return (
    <div className="leaderboard-container">
      <h2 className="leaderboard-title">Leaderboard</h2>
      <ul className="leaderboard-list">
        {sortedUsers.map(user => (
          <li key={user.id} className="leaderboard-user">
            <img
              src={user.avatarURL || 'https://www.pngkey.com/png/full/73-730477_first-name-profile-image-placeholder-png.png'}
              alt={`Avatar of ${user.name}`}
              className="user-avatar"
              width="50"
              height="50"
            />
            <div className="user-info">
              <h3 className="user-name">{user.name}</h3>
              <p className="questions-asked">Questions Asked: {user.questions.length}</p>
              <p className="questions-answered">Questions Answered: {Object.keys(user.answers).length}</p>
            </div>
            <div className="user-score">
              <h4>Score</h4>
              <span className="score-value">{user.questions.length + Object.keys(user.answers).length}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Leaderboard;


