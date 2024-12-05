import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../slices/authSlice';
import './Nav.css';

const Nav = () => {
  const dispatch = useDispatch();
  const { userProfile, isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated || !userProfile) {
    return null;
  }

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/leaderboard" className="nav-link">Leaderboard</Link>
        <Link to="/add" className="nav-link">New Poll</Link>
      </div>
      <div className="user-info">
        <div className="user-profile">
          <img 
            src={userProfile.avatarURL} 
            alt={`Avatar of ${userProfile.name}`} 
            className="avatar" 
          />
          <span className="username">{userProfile.name}</span>
        </div>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Nav;