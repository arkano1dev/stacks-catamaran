import React, { useEffect, useState } from 'react';

import { MempoolTransaction, StacksApiWebSocketClient, Transaction } from '@stacks/blockchain-api-client';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks';
import { SwapProgress } from '../../../lib/swap';

import BtcSwapItem from './BtcSwapItem';

const BtcSwapComplete = ({
  setSwapProgress,
  chain,
}: {
  setSwapProgress: React.Dispatch<React.SetStateAction<SwapProgress>>;
  chain: string;
}) => {
  const swapInfo = useAppSelector(state => state.swap);
  const {
    amountInfo: { sendAmount, receiveAmount },
    addressInfo: { userBTCAddress, receiverSTXAddress },
    swapTxs,
  } = swapInfo;
  const txId = swapTxs?.submitTx;
  console.log("done", swapInfo.swapTxs.done)
  const [swapId, setSwapId] = useState<string | undefined>(swapTxs.swapId);
  const [txError, setTxError] = useState<{ status: (Transaction | MempoolTransaction)["tx_status"] } | undefined>();
  const [txPending, setTxPending] = React.useState(!swapInfo.swapTxs.done);

  const [txSubscription, setTxSubscription] = React.useState<Awaited<ReturnType<StacksApiWebSocketClient["subscribeTxUpdates"]>>>();

  // setTxPending false in 3 seconds
  useEffect(() => {
    if (swapInfo.swapTxs.done) {
      return;
    }
    const timer = setTimeout(() => {
      setTxPending(false);
      setSwapId("2")
    }, 3000);
    return () => clearTimeout(timer);
  }, [swapInfo.swapTxs.done]);

  useEffect(() => {
    if (txId) {
      console.log(txId)
    }
  }, [txId]);

  const copySwapIdToClipboard = (id: string) => {
    console.log("copy", navigator.clipboard)
    navigator.clipboard.writeText(`${window.location.host}/swaps/${id}`)
      .then(() => {
        console.log('Swap url copied to clipboard');
      })
      .catch((error) => {
        console.log('Error copying to clipboard', error);
      });
  }

  const onShareBtnClicked = () => {
    console.log({ swapId })
    if (!swapId) return;

    const url = `${window.location.host}/swpas/${swapId}`;
    if (navigator.share) {
      navigator.share({
        title: 'Catamaran Swap',
        text: `We just swapped ${receiveAmount} BTC for ${sendAmount} sBTC.`,
        url,
      }).then(() => {
        console.log('Successful share');
      }).catch((error) => {
        console.log('Error sharing', error);
      });
    } else {
      copySwapIdToClipboard(swapId);
    }
  };

  const title = txPending ? "Claim Transaction Pending" :
    txError ? "Claim Transaction failed" : `Catamaran Swap #${swapId}`;

  // @ts-ignore
  const swapIdActionLabel = navigator.share ? "Share Swap" : "Copy Swap";

  return (
    <div className="w-full p-5 flex flex-col gap-6 bg-white dark:bg-[rgba(11,11,15,0.9)] rounded-[18px] items-center">
      <p className="w-full text-center text-[28px] leading-10">{title}</p>
      <BtcSwapItem
        mode="completed"
        btcStatus='confirmed'
        stxStatus={txPending ? "stxClaimPending" : "confirmed"}
        sendAmount={sendAmount} receiveAmount={receiveAmount} receiverSTXAddress={receiverSTXAddress} userBTCAddress={userBTCAddress} />
      <div className="flex flex-col gap-3 w-full">
        <button
          className={`text-center w-full rounded-full py-3  text-base font-medium leading-5 ${txPending ? "text-slate-500 dark:text-slate-400" : "text-white dark:text-special-black"}
           ${txPending ? "bg-gradient-to-r from-50% from-black dark:from-white to-50% to-white dark:to-black animate-gradientMove" : "bg-special-black dark:bg-white"}`}
          onClick={onShareBtnClicked}
          disabled={txPending || txError !== undefined}
        >
          {swapIdActionLabel}
        </button>
        <Link
          to="/"
          className="text-center w-full rounded-full py-3 text-base font-medium leading-5"
        >
          Close
        </Link>
      </div>
    </div>
  );
};

export default BtcSwapComplete;
