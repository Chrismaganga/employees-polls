// src/components/NewPoll.js
import  { useState } from 'react';
import { useDispatch } from 'react-redux';
import { handleAddQuestion } from '../../actions/shared';
import './NewPoll.css';


const NewPoll = () => {
  const [optionOneText, setOptionOneText] = useState('');
  const [optionTwoText, setOptionTwoText] = useState('');
  const dispatch = useDispatch();
  // const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(handleAddQuestion(optionOneText, optionTwoText));
    history.push('/');
  };

  return (
    <div className="new-poll">
      <h3>Create a New Poll</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Option One"
          value={optionOneText}
          onChange={(e) => setOptionOneText(e.target.value)}
        />
        <input
          type="text"
          placeholder="Option Two"
          value={optionTwoText}
          onChange={(e) => setOptionTwoText(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
export default NewPoll;
