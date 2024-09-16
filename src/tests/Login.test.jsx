import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import Login from '../components/Login';
import store from '../store'; 

test('renders the Login component', () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    </Provider>
  );
  expect(screen.getByText('Welcome to Employee Polls')).toBeInTheDocument();
  expect(screen.getByLabelText('Sign In')).toBeInTheDocument();
});

test('allows user to login by selecting a user and clicking login', () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    </Provider>
  );
  
  const selectUser = screen.getByLabelText('Sign In');
  fireEvent.change(selectUser, { target: { value: 'userId1' } }); // Change to a valid user id
  const loginButton = screen.getByText('Login');
  expect(loginButton).not.toBeDisabled();
  fireEvent.click(loginButton);
  
  // Assert redirection or user authentication happens
});
