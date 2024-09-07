// src/components/Login.js
import  { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthedUser } from '../../actions/authedUser';
import './Login.css';


const Login = () => {
  const [selectedUser, setSelectedUser] = useState('');
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedUser !== '') {
      dispatch(setAuthedUser(selectedUser));
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
    </div>
  );
};

export default Login;
