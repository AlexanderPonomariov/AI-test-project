/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  message: '',
  submittedData: {},
};

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    setField: (state, action) => {
      state[action.payload.name] = action.payload.value;
    },
    submitData: (state) => {
      state.submittedData = {
        firstName: state.firstName,
        lastName: state.lastName,
        email: state.email,
        message: state.message,
      };
    },
    cleanData: (state) => {
      state.submittedData = {};
    },
  },
});

export const { setField, submitData, cleanData } = contactSlice.actions;
export default contactSlice.reducer;
