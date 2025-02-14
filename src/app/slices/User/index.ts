import { createSlice } from '@reduxjs/toolkit';
import { userConnected } from './thunks';
import { GetAddressesResult } from '@stacks/connect/dist/types/methods';

export interface UserState {
  isAuthenticated: boolean;
  wallet?: {
    addresses: GetAddressesResult['addresses'];
    stxAddress?: string;
  };
}

const initialState: UserState = {
  isAuthenticated: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(userConnected.fulfilled, (state, action) => {
      return { ...state, ...action.payload };
    });
  },
});

export default userSlice.reducer;
