import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route, Navigate, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from './slices/usersSlice';
import { fetchQuestions } from './slices/questionsSlice';
import { Home, Nav, Leaderboard, Login, NewPoll, NotFound, PollDetail, Footer } from './components';
import './App.css';

const ProtectedLayout = ({ auth }) => {
  if (!auth) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Nav />
      <Outlet />
      <Footer />
    </>
  );
};

const router = (auth) => createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/login" element={auth ? <Navigate to="/" replace /> : <Login />} />
      <Route element={<ProtectedLayout auth={auth} />}>
        <Route path="/" element={<Home />} />
        <Route path="leaderboard" element={<Leaderboard />} />
        <Route path="add" element={<NewPoll />} />
        <Route path="questions/:id" element={<PollDetail />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  ),
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true
    }
  }
);

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
  }, [dispatch, usersStatus, questionsStatus]);

  return (
    <div className="app">
      <RouterProvider router={router(auth)} />
    </div>
  );
}

export default App;