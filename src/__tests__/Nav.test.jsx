import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import Nav from '../components/navbar/Nav';
import authReducer from '../slices/authSlice';
import '@testing-library/jest-dom';

const mockStore = configureStore({
  reducer: {
    auth: authReducer,
  },
  preloadedState: {
    auth: {
      user: {
        id: 'testuser',
        name: 'Test User',
        avatarURL: 'test-avatar.jpg',
      },
      isAuthenticated: true,
    },
  },
});

describe('Nav Component', () => {
  it('renders correctly when user is logged in', () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <Nav />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText('Test User')).toBeInTheDocument();
  });

  it('displays user name and avatar', () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <Nav />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.getByAltText('Avatar of Test User')).toBeInTheDocument();
  });

  it('displays navigation links', () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <Nav />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Leaderboard')).toBeInTheDocument();
    expect(screen.getByText('New Poll')).toBeInTheDocument();
  });

  it('shows logout button', () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <Nav />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  it('renders nothing when user is not authenticated', () => {
    const unauthenticatedStore = configureStore({
      reducer: {
        auth: authReducer,
      },
      preloadedState: {
        auth: {
          user: null,
          isAuthenticated: false,
        },
      },
    });

    const { container } = render(
      <Provider store={unauthenticatedStore}>
        <BrowserRouter>
          <Nav />
        </BrowserRouter>
      </Provider>
    );
    expect(container.firstChild).toBeNull();
  });
});
