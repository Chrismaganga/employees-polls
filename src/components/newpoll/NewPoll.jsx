import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addQuestion } from "../../slices/questionsSlice";
import { useNavigate } from "react-router-dom";
import "./NewPoll.css";

function NewPoll() {
  const [optionOne, setOptionOne] = useState("");
  const [optionTwo, setOptionTwo] = useState("");
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authedUser = useSelector((state) => state.auth.authedUser);

  useEffect(() => {
    if (!authedUser) {
      navigate("/login");
    }
  }, [authedUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!optionOne.trim() || !optionTwo.trim()) {
      setError("Both options are required.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const newPoll = {
        optionOneText: optionOne.trim(),
        optionTwoText: optionTwo.trim(),
        author: authedUser,
      };

      const result = await dispatch(addQuestion(newPoll)).unwrap();

      if (result && result.id) {
        setOptionOne("");
        setOptionTwo("");
        navigate("/");
      } else {
        throw new Error("Failed to create poll");
      }
    } catch (err) {
      console.error("Error creating poll:", err);
      setError(err.message || "Failed to create poll. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!authedUser) {
    return null;
  }

  const newPoll = {
    optionOneText: optionOne.trim(),
    optionTwoText: optionTwo.trim(),
    author: authedUser,
    timestamp: Date.now(),
    optionOne: {
      votes: [],
      text: optionOne.trim()
    },
    optionTwo: {
      votes: [],
      text: optionTwo.trim()
    }
  };

  return (
    <>
      <div className="new-poll-container">
        <h2>Would You Rather</h2>
        <p className="subtitle">Create Your New Poll</p>
        <form onSubmit={handleSubmit} className="new-poll-form">
          {error && <div className="error-message">{error}</div>}

          <div className="input-group">
            <label htmlFor="optionOne">Option One</label>
            <input
              id="optionOne"
              type="text"
              value={optionOne}
              onChange={(e) => setOptionOne(e.target.value)}
              placeholder="Enter first option"
              disabled={isSubmitting}
              required />
          </div>

          <div className="divider">OR</div>

          <div className="input-group">
            <label htmlFor="optionTwo">Option Two</label>
            <input
              id="optionTwo"
              type="text"
              value={optionTwo}
              onChange={(e) => setOptionTwo(e.target.value)}
              placeholder="Enter second option"
              disabled={isSubmitting}
              required />
          </div>

          <div className="divider">
            <input type="author"
             value={authedUser}
             placeholder="Author"
             onChange={(e) => {
               e.target.value = authedUser;
               e.target.readOnly = true;
             }}
             readOnly disabled={isSubmitting} 
             className="author-input" 
             />
          </div>

          <button
            type="submit"
            disabled={!optionOne.trim() || !optionTwo.trim() || isSubmitting}
            className="submit-button"
          >
            {isSubmitting ? "Creating..." : "Create Poll"}
          </button>
        </form>
      </div>
    </>
  );
}

export default NewPoll;
