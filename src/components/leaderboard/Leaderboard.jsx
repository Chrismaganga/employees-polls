import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Leaderboard.css';

function Leaderboard() {
  const users = useSelector(state => state.users.users);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('score');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const calculateScore = (user) => {
    const answeredCount = Object.keys(user.answers).length;
    const createdCount = user.questions.length;
    return {
      total: answeredCount + createdCount,
      answered: answeredCount,
      created: createdCount
    };
  };

  const sortedUsers = Object.values(users)
    .filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .map(user => ({
      ...user,
      score: calculateScore(user)
    }))
    .sort((a, b) => {
      if (sortBy === 'score') {
        return b.score.total - a.score.total;
      } else if (sortBy === 'answered') {
        return b.score.answered - a.score.answered;
      } else {
        return b.score.created - a.score.created;
      }
    });

  return (
    <div className="leaderboard-container">
      <h2 className="leaderboard-title">Leaderboard</h2>
      
      <div className="leaderboard-controls">
        <input
          type="text"
          className="leaderboard-search"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <select
          className="leaderboard-sort"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="score">Total Score</option>
          <option value="answered">Questions Answered</option>
          <option value="created">Questions Created</option>
        </select>
      </div>

      <div className="leaderboard-list">
        {sortedUsers.map((user, index) => (
          <div key={user.id} className="leaderboard-item">
            <div className="rank">{index + 1}</div>
            <div className="user-profile">
              <img
                src={user.avatarURL}
                alt={`Avatar of ${user.name}`}
                className="user-avatar"
              />
              <div className="user-info">
                <h3>{user.name}</h3>
                <p>Questions Created: {user.score.created}</p>
                <p>Questions Answered: {user.score.answered}</p>
              </div>
            </div>
            <div className="score-info">
              <div className="total-score">{user.score.total}</div>
              <div className="score-label">Total Score</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Leaderboard;
