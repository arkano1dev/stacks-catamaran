import React, { useEffect, useState } from 'react';

import { MempoolTransaction, StacksApiWebSocketClient, Transaction } from '@stacks/blockchain-api-client';
import { hexToCV, ResponseOkCV, UIntCV } from '@stacks/transactions';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks';
import { SwapProgress } from '../../../lib/swap';
import SwapItem from './SwapItem';
import { createExplorerLink } from '../../../lib/browser';

const SwapComplete = ({
  setSwapProgress,
  wsClient,
  chain
}: {
  setSwapProgress: React.Dispatch<React.SetStateAction<SwapProgress>>;
  wsClient: StacksApiWebSocketClient | null;
  chain: string;
}) => {
  const swapInfo = useAppSelector(state => state.swap);
  const {
    amountInfo: { sendAmount, receiveAmount },
    addressInfo: { userBTCAddress, receiverSTXAddress },
    swapTxs,
  } = swapInfo;
  const txId = swapTxs?.submitTx;

  const [swapId, setSwapId] = useState<string>();
  const [txError, setTxError] = useState<{ status: (Transaction | MempoolTransaction)["tx_status"] } | undefined>();
  const [txPending, setTxPending] = React.useState(true);
  const [btcTxPending, setBtcTxPending] = React.useState(true);

  const [txSubscription, setTxSubscription] = React.useState<Awaited<ReturnType<StacksApiWebSocketClient["subscribeTxUpdates"]>>>();

  // setTxPending false in 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setTxPending(false);
      setSwapId("2")
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (txId) {
      if (wsClient) {
        wsClient.subscribeTxUpdates(txId, (status) => {
          console.log("status", status);
          switch (status.tx_status) {
            case 'pending':
              break;
            case 'success':
              const result = hexToCV(status.tx_result.hex) as ResponseOkCV<UIntCV>
              setSwapId(result.value.value.toString());
              setTxPending(false);
              break;
            default:
              setTxError({ status: status.tx_status });
              setTxPending(false);
          }
        }).then((subscription) => { setTxSubscription(subscription) });
      }
    }
  }, [wsClient, txId]);

  const copySwapIdToClipboard = (id: string) => {
    navigator.clipboard.writeText(`Use swap ID ${id} to complete the swap: ${window.location.host}/swaps/${id}`)
      .then(() => {
        console.log('Swap ID copied to clipboard');
      })
      .catch((error) => {
        console.log('Error copying to clipboard', error);
      });
  }

  const onSwapIdActionBtnClicked = () => {
    if (!swapId) return;

    const url = `${window.location.host}/swpas/${swapId}`;
    if (navigator.share) {
      navigator.share({
        title: 'Swap ID',
        text: `Use swap ID ${swapId} to complete the swap`,
        url,
      }).then(() => {
        console.log('Successful share');
      }).catch((error) => {
        console.log('Error sharing', error);
      });
    } else {
      copySwapIdToClipboard(swapId);
    }
    setSwapProgress(SwapProgress.PREVEIW_SWAP);
  };

  const title = txPending ? "Stacks Transaction Pending" :
    txError ? "Stacks Transaction failed" : "Stacks Transaction Confirmed";

  // @ts-ignore
  const swapIdActionLabel = navigator.share ? "Share Swap ID" : "Copy Swap ID";

  return (
    <div className="w-full p-5 flex flex-col gap-6 bg-white dark:bg-[rgba(11,11,15,0.9)] rounded-[18px] items-center">


      <p className="w-full text-center text-[28px] leading-10">{title}</p>
      <SwapItem
        mode={txPending || txError ? "confirm" : btcTxPending ? "in-escrow" : "completed"}
        stxStatus={txPending ? "in-escrow-pending" : "confirmed"}
        btcStatus='waiting'
        sendAmount={sendAmount} receiveAmount={receiveAmount} receiverSTXAddress={receiverSTXAddress} userBTCAddress={userBTCAddress} />
      <div className="text-sm w-full leading-[14px] p-5 border-[1px] border-[rgba(7,7,10,0.1)] dark:border-[rgba(255,255,255,0.1)] rounded-lg flex flex-col sm:flex-row justify-between items-center">
        <p className="opacity-50">Transaction ID</p>
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          {txId ?
            <><a href={createExplorerLink(txId, chain)} target="_blank" className="underline pt-2 sm:p-0">
              {txId}
            </a>
              <button className="rounded-full py-2 px-5 dark:bg-white bg-special-black text-base font-medium leading-5 text-white dark:text-special-black">
                Copy
              </button>
            </>
            : <></>}
        </div>
      </div>
      <div className="text-sm w-full leading-[14px] p-5 border-[1px] border-[rgba(7,7,10,0.1)] dark:border-[rgba(255,255,255,0.1)] rounded-lg flex flex-col sm:flex-row justify-between items-center">
        {txError ?
          <p className="text-red-600">Swap Error</p>
          : <p className="opacity-50">Swap ID</p>}
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          {txError ? <p>{txError.status}</p> :
            <>
              <a href={`/swaps/${swapId}`} target="_blank" className="underline pt-2 sm:p-0">
                {swapId}
              </a>
              <button className={`rounded-full py-2 px-5 dark:bg-white bg-special-black text-base font-medium leading-5 ${swapId ? "text-white dark:text-special-black" : "text-slate-500 dark:text-slate-400"}`}
                onClick={() => { if (swapId) { copySwapIdToClipboard(swapId) } }}>
                Copy
              </button>
            </>
          }
        </div>
      </div>
      <div className="flex flex-col gap-3 w-full">
        <button
          className={`text-center w-full rounded-full py-3  text-base font-medium leading-5 ${swapId ? "text-white dark:text-special-black" : "text-slate-500 dark:text-slate-400"}
           ${txPending ? "bg-gradient-to-r from-50% from-black dark:from-white to-50% to-white dark:to-black animate-gradientMove" : "bg-special-black dark:bg-white"}`}
          onClick={onSwapIdActionBtnClicked}
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

export default SwapComplete;
