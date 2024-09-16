import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import NewPoll from '../components/NewPoll';
import store from '../store';

test('allows creating a new poll', () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <NewPoll />
      </MemoryRouter>
    </Provider>
  );
  
  const optionOneInput = screen.getByLabelText('Option One:');
  const optionTwoInput = screen.getByLabelText('Option Two:');
  const submitButton = screen.getByText('Submit');

  fireEvent.change(optionOneInput, { target: { value: 'First option' } });
  fireEvent.change(optionTwoInput, { target: { value: 'Second option' } });

  expect(submitButton).not.toBeDisabled();
  fireEvent.click(submitButton);

  // Check if the poll is submitted, you can also mock the dispatch
});
