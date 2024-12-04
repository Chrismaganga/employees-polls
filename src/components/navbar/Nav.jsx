import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../slices/authSlice';
import { resetVotes } from '../../slices/votingSlice';
import './Nav.css';

function Nav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userProfile = useSelector((state) => state.auth.userProfile);
  const users = useSelector((state) => state.users.users);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(resetVotes());
    navigate('/login');
  };

  if (!isAuthenticated) {
    return null;
  }

  const currentUser = users[userProfile?.id];

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/" className="brand-link">
          Employee Polls
        </Link>
      </div>

      <div className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/leaderboard" className="nav-link">Leaderboard</Link>
        <Link to="/add" className="nav-link">New Poll</Link>
      </div>
      
      {currentUser && (
        <div className="user-profile">
          <img
            src={currentUser.avatarURL}
            alt={`Avatar of ${currentUser.name}`}
            className="user-avatar"
          />
          <span className="user-name">{currentUser.name}</span>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}

export default Nav;