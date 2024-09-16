import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addQuestion } from '../slices/questionsSlice';
import { useNavigate } from 'react-router-dom';

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
      <form onSubmit={handleSubmit}>
        <label>
          Option One:
          <input
            type="text"
            value={optionOne}
            onChange={(e) => setOptionOne(e.target.value)}
            required
          />
        </label>
        <label>
          Option Two:
          <input
            type="text"
            value={optionTwo}
            onChange={(e) => setOptionTwo(e.target.value)}
            required
          />
        </label>
        <button type="submit" disabled={!optionOne || !optionTwo}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default NewPoll;
