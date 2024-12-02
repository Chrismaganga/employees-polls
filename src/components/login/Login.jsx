import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setAuthedUser } from '../../slices/authSlice';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { enableVotingRights } from '../../slices/votingSlice';
import { FaUsers } from "react-icons/fa";

function Login() {
  const users = useSelector(state => state.users.entities);
  const usersStatus = useSelector(state => state.users.status);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = users && Object.values(users).length > 0 ? Object.values(users).find(user => user.id === username && user.password === password) : null;
    if (user) {
      dispatch(setAuthedUser(user.id));
      dispatch(enableVotingRights(user.id));
      navigate('/');
    } else {
      alert('Invalid username or password');
    }
  };

  if (usersStatus === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div className="login-container">
      <div className="login-header">
        <FaUsers className="icon" />
        <div className='head'>Employee Polls</div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          
          <input
            type="text"
            id="username"
            name='username'
            placeholder='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name='password'
            id="password"
            placeholder='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
