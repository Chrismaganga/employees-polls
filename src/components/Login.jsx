// import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { setAuthedUser } from '../slices/authSlice';
// import { useNavigate } from 'react-router-dom';

// function Login() {
//   const users = useSelector(state => state.users.users);
//   const usersStatus = useSelector(state => state.users.status);
//   const [selectedUser, setSelectedUser] = useState('');
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (selectedUser) {
//       dispatch(setAuthedUser(selectedUser));
//       navigate('/');
//     }
//   };

//   if (usersStatus === 'loading') {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="login-container">
//       <h2>Welcome to Employee Polls</h2>
//       <form onSubmit={handleSubmit}>
//         <label htmlFor="user">Sign In</label>
//         <select
//           id="user"
//           value={selectedUser}
//           onChange={(e) => setSelectedUser(e.target.value)}
//         >
//           <option value="" disabled>
//             Select User
//           </option>
//           {Object.values(users).map(user => (
//             <option key={user.id} value={user.id}>
//               {user.name}
//             </option>
//           ))}
//         </select>
//         <button type="submit" disabled={!selectedUser}>
//           Login
//         </button>
//       </form>
//     </div>
//   );
// }

// export default Login;
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setAuthedUser } from '../slices/authSlice';
import { useNavigate } from 'react-router-dom';

function Login() {
  const users = useSelector(state => state.users.users);
  const usersStatus = useSelector(state => state.users.status);
  const [selectedUser, setSelectedUser] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedUser) {
      dispatch(setAuthedUser(selectedUser));
      navigate('/');
    }
  };

  if (usersStatus === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div className="login-container">
      <h2>Welcome to Employee Polls</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="user">Sign In</label>
        <select
          id="user"
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
        >
          <option value="" disabled>
            Select User
          </option>
          {Object.values(users).map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        {selectedUser && (
          <div className="avatar-preview">
            <img
              src={users[selectedUser].avatarURL || "/home/chris/voting/src/images/placeholder.png"}
              alt={`${users[selectedUser].name}'s avatar`}
              style={{ width: '100px', height: '100px' }}
            />
          </div>
        )}
        
        <button type="submit" disabled={!selectedUser}>
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
