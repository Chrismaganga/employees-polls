import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  authedUser: null,
  userProfile: null,
  isAuthenticated: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthedUser(state, action) {
      state.authedUser = action.payload;
      state.isAuthenticated = true;
    },
    setUser(state, action) {
      state.userProfile = action.payload;
    },
    logout(state) {
      state.authedUser = null;
      state.userProfile = null;
      state.isAuthenticated = false;
    }
  }
});

export const { setAuthedUser, setUser, logout } = authSlice.actions;
export default authSlice.reducer;
