import { configureStore } from '@reduxjs/toolkit';
import formSlice from '../slices/formSlice';

export default configureStore({
  reducer: {
    formSlice,
  },
});
