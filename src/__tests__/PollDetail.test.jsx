import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import '@testing-library/jest-dom';
import PollDetail from '../components/pollDetail/PollDetail';
import { BrowserRouter } from 'react-router-dom';
import votingReducer from '../slices/votingSlice';

const mockPoll = {
  id: 'test123',
  optionOne: { text: 'Test Option One', votes: [] },
  optionTwo: { text: 'Test Option Two', votes: [] },
  author: 'testUser'
};

const mockStore = configureStore({
  reducer: {
    voting: votingReducer
  },
  preloadedState: {
    voting: {
      polls: {
        'test123': mockPoll
      },
      authedUser: 'testUser'
    }
  }
});

// Mock the useParams hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ id: 'test123' })
}));

describe('PollDetail Component', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <PollDetail />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText('Test Option One')).toBeInTheDocument();
    expect(screen.getByText('Test Option Two')).toBeInTheDocument();
  });

  it('handles voting when user has voting rights', async () => {
    // Mock the dispatch function
    const mockDispatch = jest.fn(() => Promise.resolve());
    mockStore.dispatch = mockDispatch;

    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <PollDetail />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.click(screen.getByText('Vote for Option One'));
    expect(mockDispatch).toHaveBeenCalled();
  });

  it('shows error when user has no voting rights', () => {
    const noRightsStore = configureStore({
      reducer: {
        voting: votingReducer
      },
      preloadedState: {
        voting: {
          polls: {
            'test123': {
              ...mockPoll,
              optionOne: { ...mockPoll.optionOne, votes: ['testUser'] }
            }
          },
          authedUser: 'testUser'
        }
      }
    });

    render(
      <Provider store={noRightsStore}>
        <BrowserRouter>
          <PollDetail />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.click(screen.getByText('Vote for Option One'));
    expect(screen.getByText("You don't have voting rights.")).toBeInTheDocument();
  });
});
