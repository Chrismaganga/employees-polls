import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    authedUser: null,
  },
  reducers: {
    setAuthedUser(state, action) {
      state.authedUser = action.payload;
    },
    logout(state) {
      state.authedUser = null;
    },
  },
});

export const { setAuthedUser, logout } = authSlice.actions;
export default authSlice.reducer;
