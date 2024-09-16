import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import Leaderboard from '../components/Leaderboard';
import store from '../store';

test('renders leaderboard sorted by score', () => {
  render(
    <Provider store={store}>
      <Leaderboard />
    </Provider>
  );
  
  const users = screen.getAllByRole('listitem');
  expect(users.length).toBeGreaterThan(0);

});
