import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import Home from '../components/Home';
import store from '../store';

test('switches between answered and unanswered polls', () => {
  render(
    <Provider store={store}>
      <Home />
    </Provider>
  );
  
  expect(screen.getByText('Unanswered Polls')).toBeInTheDocument();
  expect(screen.getByText('Answered Polls')).toBeInTheDocument();
  
  const answeredButton = screen.getByText('Answered Polls');
  fireEvent.click(answeredButton);
  expect(screen.getByText('Answered Polls').classList).toContain('active');
  
  const unansweredButton = screen.getByText('Unanswered Polls');
  fireEvent.click(unansweredButton);
  expect(screen.getByText('Unanswered Polls').classList).toContain('active');
});
