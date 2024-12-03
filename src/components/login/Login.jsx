import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setAuthedUser } from '../../slices/authSlice';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { enableVotingRights } from '../../slices/votingSlice';
import { fetchUsers } from '../../slices/usersSlice'; // Assuming you have a fetchUsers action
import { FaUsers } from "react-icons/fa";

function Login() {
  const usersStatus = useSelector(state => state.users.status);
  const error = useSelector(state => state.users.error);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    if (usersStatus === 'idle') {
      dispatch(fetchUsers());
    }
  }, [usersStatus, dispatch]);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { id: 'someUserId' }; 

    if (user) {
      dispatch(setAuthedUser(user.id));
      dispatch(enableVotingRights(user.id));
      navigate('/');
    } else {
      alert('Invalid username or password');
    }
  };

  const authedUser = useSelector(state => state.auth.authedUser);

  if (usersStatus === 'loading') {
    return <div>Loading...</div>;
  }

  if (authedUser) {
    return <div>Welcome, {authedUser}!</div>;
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
