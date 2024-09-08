// src/components/Logout.js
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setAuthedUser } from '../../actions/authedUser';

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(setAuthedUser(null));  // Clear the authenticated user
    navigate('/login');  // Redirect to login page
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;
