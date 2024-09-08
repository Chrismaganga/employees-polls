// src/components/login/Login.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { setAuthedUser } from '../../actions/authedUser';
import './Login.css';

const Login = () => {
  const [selectedUser, setSelectedUser] = useState('');
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedUser !== '') {
      dispatch(setAuthedUser(selectedUser));
      dispatch(logoutUser()); // Dispatch the logout action
      navigate('/');
    }
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <select onChange={(e) => setSelectedUser(e.target.value)}>
          <option value="">Select a User</option>
          {Object.values(users).map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        <button type="submit">Login</button>
      </form>
      <p>Not a user? <Link to="/">Home</Link></p>
    </div>
  );
};

export default Login;
