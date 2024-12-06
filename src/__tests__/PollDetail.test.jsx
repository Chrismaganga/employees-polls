import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import PollDetail from '../components/polls/PollDetail';
import authReducer from '../slices/authSlice';
import questionsReducer from '../slices/questionsSlice';
import usersReducer from '../slices/usersSlice';
import votingReducer from '../slices/votingSlice';
import '@testing-library/jest-dom';

const mockStore = configureStore({
  reducer: {
    auth: authReducer,
    questions: questionsReducer,
    users: usersReducer,
    voting: votingReducer
  },
  preloadedState: {
    auth: {
      isAuthenticated: true,
      userProfile: {
        id: 'testuser',
        name: 'Test User',
        avatarURL: '/avatar.jpg'
      },
      loading: false,
      error: null
    },
    questions: {
      questions: {
        'test-poll': {
          id: 'test-poll',
          author: 'testuser',
          timestamp: 1467166872634,
          optionOne: {
            votes: [],
            text: 'Option One'
          },
          optionTwo: {
            votes: [],
            text: 'Option Two'
          }
        }
      },
      loading: false,
      error: null
    },
    users: {
      items: {
        testuser: {
          id: 'testuser',
          name: 'Test User',
          avatarURL: '/avatar.jpg',
          answers: {},
          questions: ['test-poll']
        }
      },
      loading: false,
      error: null
    },
    voting: {
      votes: {},
      loading: false,
      error: null
    }
  }
});

describe('PollDetail', () => {
  const renderPollDetail = () => {
    render(
      <Provider store={mockStore}>
        <MemoryRouter initialEntries={['/questions/test-poll']}>
          <Routes>
            <Route path="/questions/:id" element={<PollDetail />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
  };

  test('renders poll details correctly', () => {
    renderPollDetail();
    expect(screen.getByText('Would You Rather...')).toBeInTheDocument();
    expect(screen.getByText('Option One')).toBeInTheDocument();
    expect(screen.getByText('Option Two')).toBeInTheDocument();
  });

  test('displays voting options', () => {
    renderPollDetail();
    const optionOneButton = screen.getByRole('button', { name: /select/i });
    const optionTwoButton = screen.getByRole('button', { name: /select/i });
    expect(optionOneButton).toBeInTheDocument();
    expect(optionTwoButton).toBeInTheDocument();
  });
});
