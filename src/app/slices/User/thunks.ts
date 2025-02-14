import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserState } from '.';

export const userConnected = createAsyncThunk('connect', async (wallet: UserState['wallet']) => {
  return { isAuthenticated: true, wallet };
});

export const userDisconnected = createAsyncThunk('connect', async () => {
  return { isAuthenticated: false };
});
