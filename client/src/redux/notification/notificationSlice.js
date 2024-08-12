import { createSlice } from '@reduxjs/toolkit';
import io from 'socket.io-client';

const initialState = {
  user: '',
  socket: io('https://mern-with-auth-rba5.onrender.com/'),
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
    },
  },
});

export const { setUser } = notificationSlice.actions;

export default notificationSlice.reducer;
