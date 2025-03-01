import React, { useEffect, useState } from 'react';

import { Client, createClient, MempoolTransaction, StacksApiWebSocketClient, Transaction } from '@stacks/blockchain-api-client';
import { cvToString, hexToCV } from '@stacks/transactions';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { SwapProgress } from '../../../lib/swap';

import { paths } from '@stacks/blockchain-api-client/lib/generated/schema';
import { request } from '@stacks/connect';
import { setSwapTransactions } from '../../../app/slices/Swap/thunks';
import { createSubmitStxTransactionArgs } from '../../../lib/bitcoin-tx-proof/createArgs';
import { createBtcExplorerLink } from '../../../lib/browser';
import { concatWtx, wasSegwitTxMinedCompact } from '../../../lib/stacks-api/rpc';
import BtcSwapItem from './BtcSwapItem';
import { shortTxid } from '../../../lib/format';

const BtcSwapClaim = ({
  setSwapProgress,
  sbtcSwapContract,
  chain,
  client
}: {
  setSwapProgress: React.Dispatch<React.SetStateAction<SwapProgress>>;
  sbtcSwapContract: `${string}.${string}`;
  chain: string;
  client: ReturnType<typeof createClient>;
}) => {
  const swapInfo = useAppSelector(state => state.swap);
  const dispatch = useAppDispatch();

  const {
    amountInfo: { sendAmount, receiveAmount },
    addressInfo: { userBTCAddress, receiverSTXAddress },
    swapTxs,
  } = swapInfo;
  const btcTxid = swapTxs?.btcTransferTx || "64ff37f00fa30a1234a89dd88b549c5180029b8e7aa49b703bde2b469f9703fb";

  const swapId = 0 //swapTxs?.swapId;

  const [txError, setTxError] = useState<{ status: (Transaction | MempoolTransaction)["tx_status"] } | undefined>();
  const [txPending, setTxPending] = React.useState(true);

  const [txSubscription, setTxSubscription] = React.useState<Awaited<ReturnType<StacksApiWebSocketClient["subscribeTxUpdates"]>>>();

  // setTxPending false in 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {

      setTxPending(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);


  const onClaimBtnClicked = async () => {

    const { claimArgs, verifyArgs } = await createSubmitStxTransactionArgs(swapId, btcTxid, chain);
    const functionName = "submit-swap-segwit";

    // SimulationBuilder.new()
    //   .withSender(receiverSTXAddress)
    //   .addContractCall({
    //     contract_id: sbtcSwapContract,
    //     function_name: 'set-enabled',
    //     function_args: functionArgs,
    //   })
    //   .run()
    //   .catch(console.error);

    const resultMind = await wasSegwitTxMinedCompact(verifyArgs, receiverSTXAddress);

    console.log(cvToString(hexToCV(resultMind.result)));

    const resultConcat = await concatWtx(claimArgs, receiverSTXAddress);

    console.log(cvToString(hexToCV(resultConcat.result)));

    const response = await request("stx_callContract", {
      contract: sbtcSwapContract,
      functionName,
      functionArgs: claimArgs,
      postConditionMode: "allow",
      network: chain === "testnet" ? "testnet" : "mainnet",

    });
    console.log(response);
    const submitTx = response.txid;
    if (submitTx) {
      dispatch(setSwapTransactions({
        ...swapTxs,
        submitTx
      }
      ));
    }

    // setSwapProgress(SwapProgress.SUBMIT_ON_STX_COMPLETED);
  };

  const title = txPending ? "Bitcoin Transaction Pending" :
    txError ? "Bitcoin Transaction failed" : "Bitcoin Transaction Confirmed";

  return (
    <div className="w-full p-5 flex flex-col gap-6 bg-white dark:bg-[rgba(11,11,15,0.9)] rounded-[18px] items-center">


      <p className="w-full text-center text-[28px] leading-10">{title}</p>
      <BtcSwapItem
        mode="btcReceived"
        btcStatus={txPending ? 'btcReceivePending' : 'confirmed'}
        stxStatus="preview"
        sendAmount={sendAmount} receiveAmount={receiveAmount} receiverSTXAddress={receiverSTXAddress} userBTCAddress={userBTCAddress} />
      <div className="text-sm w-full leading-[14px] p-5 border-[1px] border-[rgba(7,7,10,0.1)] dark:border-[rgba(255,255,255,0.1)] rounded-lg flex flex-col sm:flex-row justify-between items-center">
        <p className="opacity-50">Transaction ID</p>
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          {btcTxid ?
            <><a href={createBtcExplorerLink(btcTxid, chain)} target="_blank" className="underline pt-2 sm:p-0">
              {shortTxid(btcTxid)}
            </a>
              <button className="rounded-full py-2 px-5 dark:bg-white bg-special-black text-base font-medium leading-5 text-white dark:text-special-black">
                Copy
              </button>
            </>
            : <></>}
        </div>
      </div>
      <div className="flex flex-col gap-3 w-full">
        <button
          className={`text-center w-full rounded-full py-3  text-base font-medium leading-5 ${!txPending ? "text-white dark:text-special-black" : "text-slate-500 dark:text-slate-400"}
           ${txPending ? "bg-gradient-to-r from-50% from-black dark:from-white to-50% to-white dark:to-black animate-gradientMove" : "bg-special-black dark:bg-white"}`}
          onClick={onClaimBtnClicked}
          disabled={txPending || txError !== undefined}
        >
          Claim sBTC
        </button>
      </div>
    </div>
  );
};

export default BtcSwapClaim;

