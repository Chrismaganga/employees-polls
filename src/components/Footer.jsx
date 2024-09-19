import React from 'react';
import { NavLink } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <nav className="footer-nav">
          <NavLink to="/" className="footer-link">Home</NavLink>
          <NavLink to="/add" className="footer-link">New Poll</NavLink>
          <NavLink to="/leaderboard" className="footer-link">Leaderboard</NavLink>
        </nav>
        <p className="footer-text">
          © 2024 Employees-polls. All rights reserved.
          codelovers.com
          </p>
      </div>
    </footer>
  );
}

export default Footer;
