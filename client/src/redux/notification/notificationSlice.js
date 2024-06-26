import { createSlice } from '@reduxjs/toolkit';

// Same as the states from sign-in page
const initialState = {
  user: '',
  socket: null,
};

// Slice Information
const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.socket = action.payload.socket;
    },
  },
});

export const { setUser } = notificationSlice.actions;

export default notificationSlice.reducer;
