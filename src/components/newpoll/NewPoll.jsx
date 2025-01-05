import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addQuestion } from '../../slices/questionsSlice'; // This action now uses createAsyncThunk
import { useNavigate } from 'react-router-dom';
import './NewPoll.css';

function NewPoll() {
  const [optionOne, setOptionOne] = useState('');
  const [optionTwo, setOptionTwo] = useState('');
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Access the authenticated user from Redux
  const authedUser = useSelector((state) => state.auth.authedUser);

  // Handle changes for option inputs
  const handleOptionOneChange = (e) => setOptionOne(e.target.value);
  const handleOptionTwoChange = (e) => setOptionTwo(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!optionOne.trim() || !optionTwo.trim()) {
      setError('Both options are required.');
      return;
    }

    if (!authedUser) {
      console.error('User not authenticated');
      setError('You need to be logged in to create a poll.');
      return;
    }

    // Create the new poll object
    const newPoll = {
      id: `poll-${Date.now()}`, // Generate a unique ID for the new poll
      optionOneText: optionOne.trim(),
      optionTwoText: optionTwo.trim(),
      author: authedUser,
      timestamp: new Date().toISOString(),
    };

    // Dispatch the addQuestion action
    dispatch(addQuestion(newPoll))
      .then(() => {
        // On success, navigate to the home page and reset the form
        setOptionOne('');
        setOptionTwo('');
        setError(null);
        navigate('/');
      })
      .catch((err) => {
        console.error('Error creating poll:', err);
        setError('Failed to create poll.');
      });
  };

  return (
    <div className="new-poll-container">
      <h2>Create New Poll</h2>
      <form onSubmit={handleSubmit} className="new-poll-form">
        {error && <p className="error-message">{error}</p>}
        <div className="input-group">
          <label htmlFor="optionOne">
            Option One:
            <input
              id="optionOne"
              type="text"
              value={optionOne}
              onChange={handleOptionOneChange}
              required
              className="input-field"
              placeholder="Enter option one"
            />
          </label>
        </div>

        <div className="input-group">
          <label htmlFor="optionTwo">
            Option Two:
            <input
              id="optionTwo"
              type="text"
              value={optionTwo}
              onChange={handleOptionTwoChange}
              required
              className="input-field"
              placeholder="Enter option two"
            />
          </label>
        </div>

        <button
          type="submit"
          disabled={!optionOne || !optionTwo}
          className="submit-btn"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default NewPoll;
