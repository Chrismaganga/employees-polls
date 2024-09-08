/* eslint-disable no-undef */
// src/components/__tests__/Login.test.jsx
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
// import { createStore } from 'redux';
import { legacy_createStore as createStore} from 'redux'
import rootReducer from '../../reducers';
import Login from './Login';

const store = createStore(rootReducer);

test('renders Login component and handles form submission', () => {
  const { getByText, getByRole } = render(
    <Provider store={store}>
      <Login />
    </Provider>
  );

  expect(getByText(/Login/i)).toBeInTheDocument();

  // Simulate form submission
  const button = getByRole('button', { name: /Login/i });
  fireEvent.click(button);
});
