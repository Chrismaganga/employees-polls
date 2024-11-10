// import '@testing-library/jest-dom';
// import { render, screen, fireEvent } from '@testing-library/react';
// import { Provider } from 'react-redux';
// import { BrowserRouter } from 'react-router-dom';
// import Login from '../components/login/Login';
// import configureStore from 'redux-mock-store';
// import { setAuthedUser } from '../../slices/authSlice';

// // Mock `useNavigate` from 'react-router-dom'
// jest.mock('react-router-dom', () => ({
//   useNavigate: jest.fn(),
// }));

// const mockStore = configureStore([]);

// describe('Login Component', () => {
//   let store;
//   let navigate;

//   beforeEach(() => {
//     navigate = jest.fn();
//     store = mockStore({
//       users: {
//         users: {
//           user1: { id: 'user1', name: 'John Doe', avatarURL: '/path/to/avatar1.jpg' },
//         },
//         status: 'idle',
//       },
//     });

//     // Mock the dispatch behavior
//     jest.spyOn(store, 'dispatch');
//   });

//   it('should login successfully and navigate to home page', () => {
//     render(
//       <Provider store={store}>
//         <BrowserRouter>
//           <Login />
//         </BrowserRouter>
//       </Provider>
//     );

//     // Simulate selecting a user
//     fireEvent.change(screen.getByLabelText('Sign In'), { target: { value: 'user1' } });

//     // Ensure login button is enabled after selection
//     const loginButton = screen.getByText('Login');
//     expect(loginButton).toBeEnabled();

//     // Simulate form submission
//     fireEvent.click(loginButton);

//     // Check if setAuthedUser action was called
//     expect(store.dispatch).toHaveBeenCalledWith(setAuthedUser('user1'));
//     expect(navigate).toHaveBeenCalledWith('/');
//   });
// });
import '@testing-library/jest-dom';

import { fireEvent, render, screen } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';
import Login from '../components/Login';
import { Provider } from 'react-redux';
import React from 'react'; // <-- Add this import
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);

describe('Login Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      users: {
        users: {
          johndoe: {
            id: 'johndoe',
            name: 'John Doe',
            avatarURL: '/path/to/avatar.jpg',
          },
          janedoe: {
            id: 'janedoe',
            name: 'Jane Doe',
            avatarURL: '/path/to/avatar2.jpg',
          },
        },
        status: 'succeeded',
      },
      auth: { authedUser: null },
    });
  });

  it('renders without crashing', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText('Welcome to Employee Polls')).toBeInTheDocument();
    expect(screen.getByLabelText('Sign In')).toBeInTheDocument();
  });

  it('displays user options and allows selection', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );

    // Check if users are listed in the select dropdown
    expect(screen.getByText('Select User')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();

    // Simulate selecting a user
    fireEvent.change(screen.getByLabelText('Sign In'), { target: { value: 'johndoe' } });
    expect(screen.getByRole('button', { name: 'Login' })).not.toBeDisabled();
  });

  it('displays avatar preview when user is selected', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );

    // Simulate selecting a user
    fireEvent.change(screen.getByLabelText('Sign In'), { target: { value: 'johndoe' } });

    // Check if the avatar is displayed
    const avatar = screen.getByAltText("John Doe's avatar");
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('src', '/path/to/avatar.jpg');
  });

  it('disables the login button if no user is selected', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByRole('button', { name: 'Login' })).toBeDisabled();
  });
});