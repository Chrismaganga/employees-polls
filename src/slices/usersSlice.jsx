import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { _getUsers } from '../_DATA';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const users = await _getUsers();
  return users;
});

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: {},
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default usersSlice.reducer;
