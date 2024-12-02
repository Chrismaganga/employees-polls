import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './Leaderboard.css';

function Leaderboard() {
  const users = useSelector(state => state.users.users);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('score'); 

  const sortedUsers = Object.values(users)
    .filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'score') {
        const scoreA = Object.keys(a.answers).length + a.questions.length;
        const scoreB = Object.keys(b.answers).length + b.questions.length;
        return scoreB - scoreA;
      } else if (sortBy === 'questionsAnswered') {
        return Object.keys(b.answers).length - Object.keys(a.answers).length;
      } else {
        return b.questions.length - a.questions.length;
      }
    });

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  return (
    <div className="leaderboard-container">
      <h2 className="leaderboard-title">Leaderboard</h2>
      
      <div className="leaderboard-search-sort">
        <input
          type="text"
          className="leaderboard-search"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        
        <select
          className="leaderboard-sort"
          value={sortBy}
          onChange={handleSortChange}
        >
          <option value="score" className='score'>Sort by Score</option>
          <option value="questionsAnswered" className='questionsAnswered'>Sort by Questions Answered</option>
          <option value="questionsAsked" className='questionsAsked'>Sort by Questions Asked</option>
        </select>
      </div>

      <ul className="leaderboard-list">
        {sortedUsers.map(user => (
          <li key={user.id} className="leaderboard-user">
            <img
              src={user.avatarURL}
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
