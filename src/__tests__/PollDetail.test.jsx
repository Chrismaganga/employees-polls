import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import PollDetail from '../components/pollDetail/PollDetail';

const mockStore = configureStore([]);

// Mock useParams
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    id: 'test-poll-id'
  })
}));

describe('PollDetail Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      questions: {
        questions: {
          'test-poll-id': {
            id: 'test-poll-id',
            author: 'testuser',
            timestamp: 1467166872634,
            optionOne: {
              text: 'Test Option One',
              votes: []
            },
            optionTwo: {
              text: 'Test Option Two',
              votes: []
            }
          }
        }
      },
      users: {
        users: {
          testuser: {
            id: 'testuser',
            name: 'Test User',
            avatarURL: 'test-avatar.jpg'
          }
        },
        authedUser: 'testuser'
      },
      voting: {
        user: {
          id: 'testuser',
          name: 'Test User'
        },
        canVote: true
      }
    });
    store.dispatch = jest.fn();
  });

  it('renders correctly', () => {
    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <PollDetail />
        </BrowserRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('displays poll options', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <PollDetail />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText('Test Option One')).toBeInTheDocument();
    expect(screen.getByText('Test Option Two')).toBeInTheDocument();
  });

  it('handles voting when user has voting rights', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <PollDetail />
        </BrowserRouter>
      </Provider>
    );
    fireEvent.click(screen.getByText('Vote for Option One'));
    expect(store.dispatch).toHaveBeenCalled();
  });

  it('shows error when user has no voting rights', () => {
    store = mockStore({
      ...store.getState(),
      voting: {
        ...store.getState().voting,
        canVote: false
      }
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <PollDetail />
        </BrowserRouter>
      </Provider>
    );
    fireEvent.click(screen.getByText('Vote for Option One'));
    expect(screen.getByText("You don't have voting rights.")).toBeInTheDocument();
  });
});
