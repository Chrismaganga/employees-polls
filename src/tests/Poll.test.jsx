import React from 'react';
import { render, screen } from '@testing-library/react';
import Poll from '../components/Poll';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';

// Create a mock store
const mockStore = configureStore([]);
const store = mockStore({
  users: {
    users: {
      user1: { id: 'user1', name: 'User One', answers: {}, questions: [] },
    },
  },
  questions: {
    questions: {
      question1: {
        id: 'question1',
        author: 'user1',
        optionOne: { text: 'Option One' },
        optionTwo: { text: 'Option Two' },
      },
    },
  },
});

const sampleQuestion = {
  id: 'question1',
  author: 'user1',
  optionOne: { text: 'Option One' },
  optionTwo: { text: 'Option Two' },
};

test('renders poll with options', () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Poll question={sampleQuestion} />
      </MemoryRouter>
    </Provider>
  );

  expect(screen.getByText('Option One')).toBeInTheDocument();
  expect(screen.getByText('Option Two')).toBeInTheDocument();
});
