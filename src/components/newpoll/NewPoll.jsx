// src/components/newpoll/NewPoll.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { _saveQuestion } from '../../_DATA'; 
import { addQuestion } from '../../actions/questions'; 
const NewPoll = () => {
  const [optionOneText, setOptionOneText] = useState('');
  const [optionTwoText, setOptionTwoText] = useState('');
  const authedUser = useSelector((state) => state.authedUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the form from refreshing the page

    if (optionOneText === '' || optionTwoText === '') {
      alert('Both options are required.');
      return;
    }

    const question = {
      optionOneText,
      optionTwoText,
      author: authedUser,
    };

    _saveQuestion(question).then((formattedQuestion) => {
      dispatch(addQuestion(formattedQuestion)); // Dispatch action to add question to the store
      navigate('/'); // Redirect to the homepage or polls list after submission
    });

    // Reset form fields
    setOptionOneText('');
    setOptionTwoText('');
  };

  return (
    <div className="new-poll">
      <h2>Create a New Poll</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Option One</label>
          <input
            type="text"
            value={optionOneText}
            onChange={(e) => setOptionOneText(e.target.value)}
            placeholder="Enter Option One Text"
          />
        </div>
        <div>
          <label>Option Two</label>
          <input
            type="text"
            value={optionTwoText}
            onChange={(e) => setOptionTwoText(e.target.value)}
            placeholder="Enter Option Two Text"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default NewPoll;
