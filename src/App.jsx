// src/App.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom'; // Removed duplicate BrowserRouter import
import Navbar from './components/navbar/Navbar';
import Login from './components/login/Login';
import Poll from './components/poll/Poll';
import PollDetails from './components/polldetail/PollDetails';
import NewPoll from './components/newpoll/NewPoll';
import Leaderboard from './components/leaderboard/Leaderboard';
import NotFound from './components/notfound/NotFound';
import { handleInitialData } from './actions/shared'; // Adjusted the path to match JavaScript
import './App.css';

const App = () => {
  const dispatch = useDispatch();
  const authedUser = useSelector((state) => state.authedUser);

  useEffect(() => {
    dispatch(handleInitialData());
  }, [dispatch]);

  if (!authedUser) {
    return <Login />;
  }

  return (
    <div className="container">
      <Navbar />
      <Routes>
        <Route path="/" element={<Poll />} />
        <Route path="/questions/:id" element={<PollDetails />} />
        <Route path="/add" element={<NewPoll />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
