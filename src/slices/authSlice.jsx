import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { _getUsers } from '../_DATA';

const initialState = {
  authedUser: null,
  userProfile: null,
  isAuthenticated: false,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null
};

export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const users = await _getUsers();
      const user = users[username];
      
      if (!user) {
        return rejectWithValue('User not found');
      }
      
      if (user.password !== password) {
        return rejectWithValue('Incorrect password');
      }
      
      return {
        id: username,
        ...user
      };
    } catch (error) {
      return rejectWithValue(error.message || 'Login failed. Please try again.');
    }
  }
);

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
      state.error = null;
      state.status = 'idle';
    },
    clearError(state) {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.authedUser = action.payload.id;
        state.userProfile = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Login failed';
        state.isAuthenticated = false;
        state.authedUser = null;
        state.userProfile = null;
      });
  }
});

export const { setAuthedUser, setUser, logout, clearError } = authSlice.actions;
export default authSlice.reducer;
