// src/components/App.js
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components//navbar/Navbar.jsx';
import Login from './components/login/Login.jsx';
import Poll from './components/poll/Poll.jsx';
import PollDetails from './components/polldetail/PollDetails.jsx';
import NewPoll from './components/newpoll/NewPoll.jsx';
import Leaderboard from './components/leaderboard/Leaderboard.jsx';
import NotFound from './components/notfound/NotFound.jsx';
import { handleInitialData } from './actions/shared.jsx';
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
    <Router>
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
    </Router>
  );
};

export default App;
