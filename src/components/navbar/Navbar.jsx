// src/components/Navbar.jsx
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css'; // Ensure you have the correct path to your CSS file

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="nav">
      <div className="menu-icon" onClick={toggleMenu}>
        ☰
      </div>
      <ul className={`menu ${menuOpen ? 'open' : ''}`}>
        <li>
          <NavLink to="/" exact activeClassName="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/add" activeClassName="active">
            New Poll
          </NavLink>
        </li>
        <li>
          <NavLink to="/leaderboard" activeClassName="active">
            Leaderboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/login" activeClassName="active">
          
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
