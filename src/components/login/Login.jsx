import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import './login.css';
import { login, clearErrors } from '../../slices/authSlice';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [validationError, setValidationError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  const { error, isAuthenticated } = useSelector((state) => state.auth);
  const from = location.state?.from || '/';

  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    if (storedAuth) {
      navigate(from, { replace: true });
    }
  }, [navigate, from]);

  useEffect(() => {
    dispatch(clearErrors());
    setValidationError('');
  }, [username, password, dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem('isAuthenticated', 'true');
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const validateInputs = () => {
    if (!username.trim()) {
      setValidationError('Username is required');
      return false;
    }
    if (!password.trim()) {
      setValidationError('Password is required');
      return false;
    }
    if (username.length < 3) {
      setValidationError('Username must be at least 3 characters long');
      return false;
    }
    if (password.length < 6) {
      setValidationError('Password must be at least 6 characters long');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError('');
    
    if (!validateInputs()) {
      return;
    }

    setIsLoading(true);
    try {
      const result = await dispatch(login({ 
        username: username.trim(), 
        password: password.trim() 
      })).unwrap();
      
      if (!result) {
        throw new Error('Login failed. Please try again.');
      }
    } catch (err) {
      console.error('Login failed:', err);
      // Don't set error here as it's handled by the slice
    } finally {
      setIsLoading(false);
    }
  };

  const getErrorMessage = () => {
    if (validationError) return validationError;
    if (error) return error;
    return '';
  };

  const errorMessage = getErrorMessage();

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Employee Polls</h2>
        <form onSubmit={handleSubmit} noValidate>
          {errorMessage && (
            <div className="error-message" role="alert">
              {errorMessage}
            </div>
          )}
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
              disabled={isLoading}
              className={errorMessage && !password ? 'error' : ''}
              aria-invalid={errorMessage && !password ? 'true' : 'false'}
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              disabled={isLoading}
              className={errorMessage && !password ? 'error' : ''}
              aria-invalid={errorMessage && !password ? 'true' : 'false'}
            />
          </div>
          <button 
            type="submit" 
            className="login-button"
            disabled={isLoading || !username || !password}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div className="login-help">
          <p>Demo accounts:</p>
          <ul>
            <li>Username: sarahedo | Password: password123</li>
            <li>Username: tylermcginnis | Password: abc321</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Login;
