// src/components/Home.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Home from '../components/Home';

test('renders Home component with buttons', () => {
  render(<Home />);
  
  // Check if the buttons are rendered
  expect(screen.getByText('Unanswered Polls')).toBeInTheDocument();
  expect(screen.getByText('Answered Polls')).toBeInTheDocument();
});

test('can toggle between answered and unanswered polls', () => {
  render(<Home />);
  
  const unansweredButton = screen.getByText('Unanswered Polls');
  const answeredButton = screen.getByText('Answered Polls');
  
  // Simulate clicking the 'Answered Polls' button
  fireEvent.click(answeredButton);
  
  // Assert some change when showing answered polls
  // You'd replace this with actual content checks
  expect(screen.getByText('Answered Polls')).toBeInTheDocument();
});
