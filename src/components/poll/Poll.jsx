// import { useState } from 'react';
// import { useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
// // import "./Poll.css"; // Ensure this path is correct

// const Poll = () => {
//   const [showAnswered, setShowAnswered] = useState(false);
//   const authedUser = useSelector((state) => state.authedUser);
//   const questions = useSelector((state) => state.questions);
//   const users = useSelector((state) => state.users);

//   const answeredPolls = Object.keys(users[authedUser].answers);
//   const unansweredPolls = Object.keys(questions).filter(
//     (qid) => !answeredPolls.includes(qid)
//   );

//   const pollList = showAnswered ? answeredPolls : unansweredPolls;

//   return (
//     <div className="polls">
//       <button onClick={() => setShowAnswered(false)} className='unanswered'>Unanswered Polls</button>
//       <br />
//       <button onClick={() => setShowAnswered(true)} className='answered'>Answered Polls</button>

//       <ul className='poll-list'>
//         {pollList.map((id) => (
//           <li key={id}>
//             <Link to={`/questions/${id}`} className='question'>
//               {questions[id].optionOne.text} or {questions[id].optionTwo.text}?
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Poll;
// src/components/poll/Poll.jsx
import React from 'react';
import { useSelector } from 'react-redux';

const Poll = () => {
  const questions = useSelector((state) => state.questions);
  const users = useSelector((state) => state.users);

  // If questions or users are undefined, display a loading or error message
  if (!questions || !users) {
    return <p>Loading...</p>;
  }

  // Convert questions object to an array for rendering
  const questionList = Object.values(questions);

  return (
    <div className="poll-list">
      <h2>Polls</h2>
      {questionList.map((question) => {
        // Ensure question data is defined
        if (!question || !question.optionOne || !question.optionTwo) {
          return <p key={question?.id || 'unknown'}>Invalid question data.</p>;
        }

        const author = users[question.author];

        return (
          <div key={question.id} className="poll-item">
            <h3>{author ? `${author.name}'s Poll` : 'Unknown Author'}</h3>
            <p>Option One: {question.optionOne.text}</p>
            <p>Option Two: {question.optionTwo.text}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Poll;
