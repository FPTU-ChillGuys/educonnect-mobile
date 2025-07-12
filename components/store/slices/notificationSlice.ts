import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NotificationState {
  title: string | null;
  body: string | null;
}

const initialState: NotificationState = {
  title: null,
  body: null,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (state, action: PayloadAction<{ title: string; body: string }>) => {
      state.title = action.payload.title;
      state.body = action.payload.body;
    },
    clearNotification: (state) => {
      state.title = null;
      state.body = null;
    },
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;
export default notificationSlice.reducer; 