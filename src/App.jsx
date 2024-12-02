import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from './slices/usersSlice';
import { fetchQuestions } from './slices/questionsSlice';
import { Home, Nav, Leaderboard, Login, NewPoll, NotFound, Poll, PollDetail, Footer } from './components';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth.authedUser);
  const usersStatus = useSelector(state => state.users.status);
  const questionsStatus = useSelector(state => state.questions.status);

  useEffect(() => {
    if (usersStatus === 'idle') {
      dispatch(fetchUsers());
    }
    if (questionsStatus === 'idle') {
      dispatch(fetchQuestions());
    }
  }, [usersStatus, questionsStatus, dispatch]);

  return (
    <Router>
      <div>
        {auth && <Nav />}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={auth ? <Home /> : <Login />} />
          <Route path="/questions/:id" element={<PollDetail />} />
          <Route path="/questions/:id" element={auth ? <Poll /> : <Login />} />
          <Route path="/add" element={auth ? <NewPoll /> : <Login />} />
          <Route path="/leaderboard" element={auth ? <Leaderboard /> : <Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        {auth && <Footer />}
      </div>
    </Router>
  );
}

export default App;
