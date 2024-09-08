/* eslint-disable no-undef */
// src/components/__tests__/Navbar.test.jsx
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './Navbar';

test('renders Navbar component', () => {
  const { getByText } = render(
    <Router>
      <Navbar />
    </Router>
  );

  expect(getByText(/Home/i)).toBeInTheDocument();
  expect(getByText(/New Poll/i)).toBeInTheDocument();
  expect(getByText(/Leaderboard/i)).toBeInTheDocument();
  expect(getByText(/Logout/i)).toBeInTheDocument();
});
