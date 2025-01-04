import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addQuestion } from '../../slices/questionsSlice'; // This should be an action that dispatches to Redux
import { useNavigate } from 'react-router-dom';
import './NewPoll.css';

function NewPoll() {
  const [optionOne, setOptionOne] = useState('');
  const [optionTwo, setOptionTwo] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Access the authenticated user from Redux
  const authedUser = useSelector((state) => state.auth.authedUser);

  // Handle changes for option inputs
  const handleOptionOneChange = (e) => setOptionOne(e.target.value);
  const handleOptionTwoChange = (e) => setOptionTwo(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!authedUser) {
      console.error('User not authenticated');
      return;
    }

    // Create the new poll object
    const newPoll = {
      optionOneText: optionOne,
      optionTwoText: optionTwo,
      author: authedUser,
    };

    // Dispatch the action to add the new question to Redux
    dispatch(addQuestion(newPoll));

    // Navigate to the home page after submitting
    navigate('/');
  };

  return (
    <div className="new-poll-container">
      <h2>Create New Poll</h2>
      <form onSubmit={handleSubmit} className="new-poll-form">
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
