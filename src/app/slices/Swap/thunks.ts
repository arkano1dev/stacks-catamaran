import { createAsyncThunk } from '@reduxjs/toolkit';
import { SwapAddressDetail, SwapAmountDetail, SwapTransactions } from '.';

export const setSwapAmountDetail = createAsyncThunk(
  'setSwapAmountDetail',
  async (swapAmountInfo: SwapAmountDetail) => swapAmountInfo
);

export const setSwapAddressDetail = createAsyncThunk(
  'setSwapAddressDetail',
  async (swapAddressInfo: SwapAddressDetail) => swapAddressInfo
);

export const setSwapTransactions = createAsyncThunk(
  'setSwapTransactions',
  async (swapTxs: SwapTransactions) => swapTxs
);
