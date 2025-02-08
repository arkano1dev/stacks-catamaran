import React from 'react';

import sBtcImg from '/src/assets/img/sbtc.png';
import BtcImg from '/src/assets/img/btc.png';
import DownImg from '/src/assets/img/down.svg?react';
import { useAppSelector } from '../../app/hooks';
import { SwapProgress } from '../../lib/swap';
import { openContractCall } from '@stacks/connect';
import SwapItem from './SwapItem';
import { useDispatch } from 'react-redux';
import { setSwapTransactions } from '../../app/slices/Swap/thunks';
import { AppDispatch } from '../../app/store';

const SwapConfirm = ({
  setSwapProgress,
  sbtcSwapContract,
}: {
  setSwapProgress: React.Dispatch<React.SetStateAction<SwapProgress>>;
  sbtcSwapContract: string;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const swapInfo = useAppSelector(state => state.swap);
  const {
    amountInfo: { sendAmount, receiveAmount },
    addressInfo: { userBTCAddress, receiverSTXAddress },
  } = swapInfo;

  const onGoBackBtnClicked = () => {
    setSwapProgress(SwapProgress.PREVEIW_SWAP);
  };

  const onConfirmBtnClicked = async () => {
    setSwapProgress(SwapProgress.SWAP_COMPLETED);
    return;
    const [contractAddress, contractName] = sbtcSwapContract.split('.');
    openContractCall({
      contractAddress,
      contractName,
      functionName: "create-swap",
      functionArgs: [],
      onFinish: data => {
        dispatch(setSwapTransactions({ submitTx: data.txId }));
        setSwapProgress(SwapProgress.SWAP_COMPLETED);
      },
      onCancel: () => {
      }
    })

  };

  return (
    <div className="w-full p-5 flex flex-col gap-3 bg-white dark:bg-[rgba(11,11,15,0.9)] rounded-[18px]">
      <p className="text-base leading-6 font-normal">Catamaran Swap</p>
      <SwapItem
        mode="confirm"
        sendAmount={sendAmount} receiveAmount={receiveAmount} receiverSTXAddress={receiverSTXAddress} userBTCAddress={userBTCAddress} />
      <div className="text-sm leading-[14px] flex flex-col gap-5 p-5 rounded-lg bg-[rgba(7,7,10,0.03)] dark:bg-[#14151A] border-[1px] border-[rgba(7,7,10,0.1)] dark:border-[rgba(255,255,255,0.1)]">
        <div className="w-full flex justify-between items-center">
          <p className="opacity-50">Network Fee Stacks (2 transactions)</p>
          <p>&lt;${0.01}</p>
        </div>
        <div className="w-full flex justify-between items-center">
          <p className="opacity-50">Network Fee Bitcoin</p>
          <p>~${1.00}</p>
        </div>
      </div>

      <div className="w-full flex justify-between gap-3">
        <button
          className="mt-5 flex-1 rounded-full py-3 bg-white dark:bg-special-black text-base font-medium leading-5 dark:text-white text-special-black border-[1px] dark:border-[white] border-special-black"
          onClick={onGoBackBtnClicked}
        >
          Go back
        </button>
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

export default SwapConfirm;
