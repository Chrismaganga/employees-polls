import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addQuestion } from '../../slices/questionsSlice';
import { useNavigate } from 'react-router-dom';
import './NewPoll.css';

function NewPoll() {
  const [optionOne, setOptionOne] = useState('');
  const [optionTwo, setOptionTwo] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authedUser = useSelector(state => state.auth.authedUser);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addQuestion({
      optionOneText: optionOne,
      optionTwoText: optionTwo,
      author: authedUser,
    })).then(() => {
      navigate('/');
    });
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
              onChange={(e) => setOptionOne(e.target.value)}
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
              onChange={(e) => setOptionTwo(e.target.value)}
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
