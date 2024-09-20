import '@testing-library/jest-dom'; // Updated import

import { render, screen } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';
import NewPoll from '../components/NewPoll';
import { Provider } from 'react-redux';
import React from 'react';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);

describe('NewPoll Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: { authedUser: 'johndoe' },
      questions: {},
    });
  });

  it('renders without crashing', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <NewPoll />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Create New Poll')).toBeInTheDocument();
  });
});
