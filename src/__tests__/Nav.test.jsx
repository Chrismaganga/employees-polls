import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import Nav from '../components/navbar/Nav';

const mockStore = configureStore([]);

describe('Nav Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      voting: {
        user: {
          id: 'testuser',
          name: 'Test User',
          avatarURL: 'test-avatar.jpg'
        }
      }
    });
    store.dispatch = jest.fn();
  });

  it('renders correctly when user is logged in', () => {
    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Nav />
        </BrowserRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('displays user name and avatar', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Nav />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText('Hello, Test User')).toBeInTheDocument();
    expect(screen.getByAltText('Avatar of Test User')).toBeInTheDocument();
  });

  it('handles logout correctly', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Nav />
        </BrowserRouter>
      </Provider>
    );
    fireEvent.click(screen.getByText('Logout'));
    expect(store.dispatch).toHaveBeenCalledTimes(2);
  });
});
