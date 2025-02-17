import React from 'react';

import { address } from "bitcoinjs-lib";
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../app/hooks';
import { setSwapTransactions } from '../../../app/slices/Swap/thunks';
import { AppDispatch } from '../../../app/store';
import { SwapProgress } from '../../../lib/swap';
import BtcSBtcSwapTitle from '../BtcSBtcSwapTitle';
import BtcSwapItem from './BtcSwapItem';

const BtcSwapConfirm = ({
  setSwapProgress,
  chain }: {
    setSwapProgress: React.Dispatch<React.SetStateAction<SwapProgress>>;
    chain: string;
  }) => {

  const dispatch = useDispatch<AppDispatch>();
  const swapInfo = useAppSelector(state => state.swap);


  const {
    amountInfo: { sendAmount, receiveAmount },
    addressInfo: { userBTCAddress, receiverSTXAddress },
  } = swapInfo;

  const onConfirmBtnClicked = async () => {
    dispatch(setSwapTransactions({
      ...swapInfo.swapTxs,
      btcTransferTx: "1234"
    }));
    setSwapProgress(SwapProgress.SUBMIT_ON_STX);
    return;

    const btcAddress = address.fromBech32(userBTCAddress);

  };

  return (
    <div className="w-full p-5 flex flex-col gap-3 bg-white dark:bg-[rgba(11,11,15,0.9)] rounded-[18px]">
      <BtcSBtcSwapTitle />
      <BtcSwapItem
        mode="confirm"
        btcStatus="preview"
        stxStatus='preview'
        sendAmount={sendAmount} receiveAmount={receiveAmount} receiverSTXAddress={receiverSTXAddress} userBTCAddress={userBTCAddress} />
      <div className="text-sm leading-[14px] flex flex-col gap-5 p-5 rounded-lg bg-[rgba(7,7,10,0.03)] dark:bg-[#14151A] border-[1px] border-[rgba(7,7,10,0.1)] dark:border-[rgba(255,255,255,0.1)]">
        <div className="w-full flex justify-between items-center">
          <p className="opacity-50">Your network fees</p>
          <p>~${1.00}</p>
        </div>
      </div>

      <div className="w-full flex justify-between gap-3">
        <button
          className="mt-5 flex-1 rounded-full py-3 dark:bg-white bg-special-black text-base font-medium leading-5 text-white dark:text-special-black"
          onClick={onConfirmBtnClicked}
        >
          Confirm
        </button>

      </div>
    </div>
  );
};

export default BtcSwapConfirm;
