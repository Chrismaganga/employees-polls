import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../slices/authSlice';
import './Nav.css';

function Nav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authedUser = useSelector(state => state.auth.authedUser);
  const user = useSelector(state => state.users.users[authedUser]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  return (
    <nav className="nav">
      <div className="logo">
        <h2>Employee Polls</h2>
      </div>
      <button className="hamburger" onClick={toggleMobileMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>
      <ul className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
        <li>
          <NavLink to="/" end>Home</NavLink>
        </li>
        <li>
          <NavLink to="/add">NewPoll</NavLink>
        </li>
        <li>
          <NavLink to="/leaderboard">Leaderboard</NavLink>
        </li>
      </ul>
      <div className="user-info">
        <span>Hello, {user.name}</span>
        <img 
          src={user.avatarURL}
          alt={`Avatar of ${user.name}`} 
          className="user-avatar"
          width="50"
          height="50"
        />
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}
export default Nav;