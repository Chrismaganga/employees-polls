import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import Login from '../components/login/Login';

const mockStore = configureStore([]);

describe('Login Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      users: {
        users: {
          testuser: {
            id: 'testuser',
            password: 'testpass',
            name: 'Test User',
            avatarURL: 'test-avatar.jpg'
          }
        },
        status: 'succeeded'
      }
    });
    store.dispatch = jest.fn();
  });

  it('renders correctly', () => {
    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('handles form submission correctly', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText('Username'), {
      target: { value: 'testuser' }
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'testpass' }
    });
    fireEvent.click(screen.getByText('Login'));

    expect(store.dispatch).toHaveBeenCalled();
  });

  it('shows error for invalid credentials', () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
    
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText('Username'), {
      target: { value: 'wronguser' }
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'wrongpass' }
    });
    fireEvent.click(screen.getByText('Login'));

    expect(alertMock).toHaveBeenCalledWith('Invalid username or password');
    alertMock.mockRestore();
  });
});
