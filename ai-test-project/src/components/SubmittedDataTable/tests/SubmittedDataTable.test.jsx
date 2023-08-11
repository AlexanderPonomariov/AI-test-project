import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import SubmittedDataTable from '../SubmittedDataTable';

describe('SubmittedDataTable', () => {
  let store;
  const initialState = {
    contact: {
      submittedData: {},
    },
  };

  beforeEach(() => {
    store = configureStore({
      preloadedState: initialState,
      reducer: { contact: (state = initialState.contact) => state }, // Mock reducer
    });
  });

  it('should render without crashing', () => {
    render(
      <Provider store={store}>
        <SubmittedDataTable />
      </Provider>,
    );
  });

  it('should not display the table if submittedData is empty', () => {
    const { queryByRole } = render(
      <Provider store={store}>
        <SubmittedDataTable />
      </Provider>,
    );

    expect(queryByRole('table')).toBeNull();
  });

  it('should display the table if submittedData is not empty', () => {
    store = configureStore({
      preloadedState: {
        contact: {
          submittedData: {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            message: 'Hello there!',
          },
        },
      },
      reducer: { contact: (state = initialState.contact) => state }, // Mock reducer
    });

    const { getByRole, getByText } = render(
      <Provider store={store}>
        <SubmittedDataTable />
      </Provider>,
    );

    expect(getByRole('table')).toBeInTheDocument();
    expect(getByText('John')).toBeInTheDocument();
    expect(getByText('Doe')).toBeInTheDocument();
    expect(getByText('john.doe@example.com')).toBeInTheDocument();
    expect(getByText('Hello there!')).toBeInTheDocument();
  });
});
