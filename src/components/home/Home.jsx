// Home.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuestions } from "../../slices/questionsSlice"; // Assuming fetchQuestions is implemented
import Poll from "../poll/Poll"; // Import Poll component
import "./Home.css"; // Import the CSS


function Home() {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.questions.questions); // Get questions from Redux state

  useEffect(() => {
    // Fetch all questions (polls) on component mount
    dispatch(fetchQuestions());
  }, [dispatch]);

  return (
    <div className="home-container">
      <h2>All Polls</h2>
    
      <div className="polls-list-container">
        <div className="polls-list">
        {Object.values(questions)
          .sort((a, b) => a.timestamp - b.timestamp) 
          .map((poll) => (
            <Poll key={poll.id} poll={poll} 
             author={poll.author}
             timestamp={poll.timestamp}
             optionOneText={poll.optionOne.text}
             optionTwoText={poll.optionTwo.text}
             votes={poll.optionOne.votes.length + poll.optionTwo.votes.length}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
