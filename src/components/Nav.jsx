// import React from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { logout } from '../slices/authSlice';


// function Nav() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const authedUser = useSelector(state => state.auth.authedUser);
//   const user = useSelector(state => state.users.users[authedUser]);

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate('/login');
//   };

//   return (
//     <nav className="nav">
//       <ul>
//         <li>
//           <NavLink to="/" end>Home</NavLink>
//         </li>
//         <li>
//           <NavLink to="/add">New Poll</NavLink>
//         </li>
//         <li>
//           <NavLink to="/leaderboard">Leaderboard</NavLink>
//         </li>
//       </ul>
//       <div className="user-info">
//         <span>Hello, {user.name}</span>
//         <img src={user.avatarURL || "src/images/placeholder.png alt='logo' width='50px' height='50px'" } />
    
//         {/* <button onClick={() => navigate(`/user/${authedUser}`)}>Profile</button> */}
//         <button onClick={handleLogout}>Logout</button>
//       </div>
//     </nav>
//   );
// }

// export default Nav;
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../slices/authSlice';

function Nav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authedUser = useSelector(state => state.auth.authedUser);
  const user = useSelector(state => state.users.users[authedUser]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="nav">
      <ul className="nav-links">
        <li>
          <NavLink to="/" end>Home</NavLink>
        </li>
        <li>
          <NavLink to="/add">New Poll</NavLink>
        </li>
        <li>
          <NavLink to="/leaderboard">Leaderboard</NavLink>
        </li>
      </ul>
      <div className="user-info">
        <span>Hello, {user.name}</span>
        <img 
          src={user.avatarURL || "src/images/placeholder.png"} 
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
