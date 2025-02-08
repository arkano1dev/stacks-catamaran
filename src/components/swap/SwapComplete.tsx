import React, { useEffect } from 'react';

import UpImg from '/src/assets/img/up.svg?react';
import { Link } from 'react-router-dom';
import { SwapProgress } from '../../lib/swap';
import { useAppSelector } from '../../app/hooks';
import { connectWebSocketClient, StacksApiWebSocketClient } from '@stacks/blockchain-api-client';

const SwapComplete = ({
  setSwapProgress,
  wsClient
}: {
  setSwapProgress: React.Dispatch<React.SetStateAction<SwapProgress>>;
  wsClient: StacksApiWebSocketClient | null;
}) => {
  const swapInfo = useAppSelector(state => state.swap);
  const {
    amountInfo: { sendAmount, receiveAmount },
    addressInfo: { userBTCAddress, receiverSTXAddress },
    swapTxs,
  } = swapInfo;
  const txId = swapTxs?.submitTx || '';

  const [txPending, setTxPending] = React.useState(true);
  const [txSubscription, setTxSubscription] = React.useState<Awaited<ReturnType<StacksApiWebSocketClient["subscribeTxUpdates"]>>>();
  useEffect(() => {
    if (wsClient) {
      wsClient.subscribeTxUpdates(txId, (status) => {
        switch (status.tx_status) {
          case 'pending':
            break;
          default:
            setTxPending(false);
        }
      }).then((subscription) => { setTxSubscription(subscription) });
    }
  }, [wsClient, txId]);

  const onGoSwapsBtnClicked = () => {
    setSwapProgress(SwapProgress.PREVEIW_SWAP);
  };

  return (
    <div className="w-full p-5 flex flex-col gap-6 bg-white dark:bg-[rgba(11,11,15,0.9)] rounded-[18px] items-center">
      <div className="w-[240px] h-[240px] flex items-center justify-center">
        <UpImg className="dark:stroke-white stroke-special-black w-20 h-20" />
      </div>

      <p className="w-full text-center text-[28px] leading-10">{txPending ? "Transation Submitted" : "Transaction Confirmed"}</p>
      <div className="text-sm w-full leading-[14px] p-5 border-[1px] border-[rgba(7,7,10,0.1)] dark:border-[rgba(255,255,255,0.1)] rounded-lg flex flex-col sm:flex-row justify-between items-center">
        <p className="opacity-50">Transaction ID</p>
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a href="/" target="_blank" className="underline pt-2 sm:p-0">
            {txId}
          </a>
          <button className="rounded-full py-2 px-5 dark:bg-white bg-special-black text-base font-medium leading-5 text-white dark:text-special-black">
            Copy
          </button>
        </div>
      </div>
      <div className="text-sm w-full leading-[14px] p-5 border-[1px] border-[rgba(7,7,10,0.1)] dark:border-[rgba(255,255,255,0.1)] rounded-lg flex flex-col sm:flex-row justify-between items-center">
        <p className="opacity-50">Swap ID</p>
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a href="/" target="_blank" className="underline pt-2 sm:p-0">
            {txId}
          </a>
          <button className="rounded-full py-2 px-5 dark:bg-white bg-special-black text-base font-medium leading-5 text-white dark:text-special-black">
            Copy
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-3 w-full">
        <button
          className="text-center w-full rounded-full py-3 dark:bg-white bg-special-black text-base font-medium leading-5 text-white dark:text-special-black"
          onClick={onGoSwapsBtnClicked}
        >
          Share Swap ID
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
