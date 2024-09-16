import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import Nav from '../components/Nav';
import store from '../store';

test('renders navigation links', () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Nav />
      </MemoryRouter>
    </Provider>
  );

  const homeLink = screen.getByText('Home');
  const newPollLink = screen.getByText('New Poll');
  const leaderboardLink = screen.getByText('Leaderboard');

  expect(homeLink).toBeInTheDocument();
  expect(newPollLink).toBeInTheDocument();
  expect(leaderboardLink).toBeInTheDocument();
});

test('allows user to logout', () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Nav />
      </MemoryRouter>
    </Provider>
  );
  
  const logoutButton = screen.getByText('Logout');
  fireEvent.click(logoutButton);

  // Check if the logout dispatch was called
});
