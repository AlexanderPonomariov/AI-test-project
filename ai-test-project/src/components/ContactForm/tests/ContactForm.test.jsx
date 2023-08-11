import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import contactReducer from '../../../slices/contactSlice';
import ContactForm from '../ContactForm';

const renderWithRedux = (
  component,
  {
    initialState,
    store = configureStore({ reducer: { contact: contactReducer }, preloadedState: initialState }),
  } = {},
) => ({
  ...render(<Provider store={store}>{component}</Provider>),
  store,
});

describe('<ContactForm />', () => {
  it('renders correctly', () => {
    renderWithRedux(<ContactForm />);
    expect(screen.getByLabelText(/First Name:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Message:/i)).toBeInTheDocument();
  });

  it('displays errors for invalid inputs', async () => {
    renderWithRedux(<ContactForm />);
    await userEvent.click(screen.getByText(/Submit/i));

    expect(screen.getByText('First Name is required')).toBeInTheDocument();
    expect(screen.getByText('Last Name is required')).toBeInTheDocument();
    expect(screen.getByText('Enter a valid email')).toBeInTheDocument();
    expect(screen.getByText('Message should be more than 10 characters')).toBeInTheDocument();
  });

  it('handles form submission', async () => {
    renderWithRedux(<ContactForm />);

    await userEvent.type(screen.getByLabelText(/First Name:/i), 'John');
    await userEvent.type(screen.getByLabelText(/Last Name:/i), 'Doe');
    await userEvent.type(screen.getByLabelText(/Email:/i), 'john.doe@example.com');
    await userEvent.type(screen.getByLabelText(/Message:/i), 'Hello, this is a test message.');

    await userEvent.click(screen.getByText(/Submit/i));
  });
});
