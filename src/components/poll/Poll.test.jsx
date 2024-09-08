/* eslint-disable no-undef */
// src/components/__tests__/Poll.test.jsx
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
// import { createStore } from 'redux';
import { legacy_createStore as createStore} from 'redux'
import rootReducer from '../../reducers';
import Poll from './Poll';

const store = createStore(rootReducer);

test('renders Poll component and toggles between answered and unanswered polls', () => {
  const { getByText } = render(
    <Provider store={store}>
      <Poll />
    </Provider>
  );

  // Check for buttons
  expect(getByText(/Unanswered Polls/i)).toBeInTheDocument();
  expect(getByText(/Answered Polls/i)).toBeInTheDocument();

  // Simulate button click
  fireEvent.click(getByText(/Answered Polls/i));
});
