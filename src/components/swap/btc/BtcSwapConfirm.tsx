import React, { useState } from 'react';

import validate, { getAddressInfo, Network } from 'bitcoin-address-validation';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { setSwapTransactions } from '../../../app/slices/Swap/thunks';
import { SwapProgress } from '../../../lib/swap';
import { sendBTCLeather } from '../../../lib/wallet-requests/sendBtc';
import BtcSBtcSwapTitle from '../BtcSBtcSwapTitle';
import BtcSwapItem from './BtcSwapItem';

const BtcSwapConfirm = ({ setSwapProgress, chain }: {
  setSwapProgress: React.Dispatch<React.SetStateAction<SwapProgress>>;
  chain: string;
}) => {

  const dispatch = useAppDispatch();
  const swapInfo = useAppSelector(state => state.swap);
  const user = useAppSelector(state => state.user);
  const [userBtcTxId, setUserBtcTxId] = useState<string | undefined>();

  const {
    amountInfo: { sendAmount, receiveAmount },
    addressInfo: { userBTCAddress, receiverSTXAddress },
  } = swapInfo;

  console.log(swapInfo.addressInfo)
  const userIsSBtcReceiver = user.wallet?.stxAddress === receiverSTXAddress;

  const onConfirmBtnClicked = async () => {
    console.log("onConfirmBtnClicked", userBTCAddress, receiveAmount, chain);
    const addressInfo = getAddressInfo(userBTCAddress);
    console.log(addressInfo);
    const valid = validate(userBTCAddress, chain as Network);
    if (valid) {

      const result = await sendBTCLeather({
        amountInSats: Math.floor(receiveAmount * 1e8),
        recipient: userBTCAddress,
        network: chain as Network
      })
      console.log(result)
      dispatch(setSwapTransactions({
        ...swapInfo.swapTxs,
        btcTransferTx: result
      }));
      setSwapProgress(SwapProgress.SUBMIT_ON_STX);
    }
    return;

  };

  return (
    <div className="w-full p-5 flex flex-col gap-3 bg-white dark:bg-[rgba(11,11,15,0.9)] rounded-[18px]">
      <BtcSBtcSwapTitle />
      <BtcSwapItem
        mode="confirm"
        btcStatus="preview"
        stxStatus='preview'
        sendAmount={sendAmount} receiveAmount={receiveAmount} receiverSTXAddress={receiverSTXAddress} userBTCAddress={userBTCAddress} />

      {userIsSBtcReceiver ? <>
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
            disabled={!userIsSBtcReceiver}
          >
            Confirm
          </button>
        </div>

        <div className="text-sm leading-[14px] flex flex-col gap-5 p-5 rounded-lg bg-[rgba(7,7,10,0.03)] dark:bg-[#14151A] border-[1px] border-[rgba(7,7,10,0.1)] dark:border-[rgba(255,255,255,0.1)]">
          <p>Your BTC transaction ID</p>
          <div className="mt-2.5 mb-1 rounded-lg w-full flex flex-col sm:flex-row sm:gap-2 p-4 pl-3 border-[1px] border-[rgba(7,7,10,0.1)] dark:border-[rgba(255,255,255,0.1)] bg-[rgba(7,7,10,0.04)] text-sm leading-[17px] font-normal">
            <input
              className="w-full outline-none bg-transparent grow"
              name="btcAddress"
              placeholder="Enter the transaction ID for the swap"
              value={userBtcTxId}
              onChange={(ev: React.ChangeEvent<HTMLInputElement>) => setUserBtcTxId(ev.target.value)}
            />
          </div>
        </div>

        <div className="w-full flex justify-between gap-3">
          <button
            className="mt-5 flex-1 rounded-full py-3 dark:bg-white bg-special-black text-base font-medium leading-5 text-white dark:text-special-black"
            onClick={() => {
              dispatch(setSwapTransactions({
                ...swapInfo.swapTxs,
                btcTransferTx: userBtcTxId
              }));
              setSwapProgress(SwapProgress.SUBMIT_ON_STX);
            }}
            disabled={!userIsSBtcReceiver || !userBtcTxId}
          >
            Submit Btc transaction
          </button>
        </div>
      </> :
        <>
          <div className="text-sm leading-[14px] flex flex-col gap-5 p-5 rounded-lg bg-[rgba(7,7,10,0.03)] dark:bg-[#14151A] border-[1px] border-[rgba(7,7,10,0.1)] dark:border-[rgba(255,255,255,0.1)]">
            This swap is for user {receiverSTXAddress}
          </div>
        </>}
    </div>
  );
};

export default BtcSwapConfirm;
