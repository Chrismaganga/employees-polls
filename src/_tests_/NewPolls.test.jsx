import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import NewPoll from '../components/newpoll/NewPoll';
import configureStore from 'redux-mock-store';
import { addQuestion } from '../../slices/questionsSlice';
import '@testing-library/jest-dom';

// Create a mock store
const mockStore = configureStore([]);
jest.mock('../../slices/questionsSlice', () => ({
  addQuestion: jest.fn(),
}));

describe('NewPoll Component', () => {
  let store;
  const mockNavigate = jest.fn();

  beforeEach(() => {
    // Create a new store for each test
    store = mockStore({
      auth: { authedUser: 'johndoe' },
    });

    // Mock the useNavigate hook from react-router-dom
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(mockNavigate);
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

  it('disables submit button when input fields are empty', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <NewPoll />
        </BrowserRouter>
      </Provider>
    );

    const submitButton = screen.getByRole('button', { name: /submit/i });

    // Initially, the button should be disabled
    expect(submitButton).toBeDisabled();
  });

  it('enables submit button when both input fields have values', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <NewPoll />
        </BrowserRouter>
      </Provider>
    );

    const optionOneInput = screen.getByPlaceholderText('Enter option one');
    const optionTwoInput = screen.getByPlaceholderText('Enter option two');
    const submitButton = screen.getByRole('button', { name: /submit/i });

    // Simulate typing into the input fields
    fireEvent.change(optionOneInput, { target: { value: 'Option One' } });
    fireEvent.change(optionTwoInput, { target: { value: 'Option Two' } });

    // After entering text, the submit button should be enabled
    expect(submitButton).not.toBeDisabled();
  });

  it('dispatches addQuestion action and navigates on form submission', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <NewPoll />
        </BrowserRouter>
      </Provider>
    );

    const optionOneInput = screen.getByPlaceholderText('Enter option one');
    const optionTwoInput = screen.getByPlaceholderText('Enter option two');
    const submitButton = screen.getByRole('button', { name: /submit/i });

    // Simulate typing into the input fields
    fireEvent.change(optionOneInput, { target: { value: 'Option One' } });
    fireEvent.change(optionTwoInput, { target: { value: 'Option Two' } });

    // Simulate form submission
    fireEvent.click(submitButton);

    // Ensure that the addQuestion action was dispatched with the correct payload
    await waitFor(() => {
      expect(addQuestion).toHaveBeenCalledWith({
        optionOneText: 'Option One',
        optionTwoText: 'Option Two',
        author: 'johndoe',
      });

      // Ensure that navigate is called after dispatching the action
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });
});

