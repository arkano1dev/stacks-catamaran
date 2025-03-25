import React from 'react';

import { request } from '@stacks/connect';
import { CallContractParams } from '@stacks/connect/dist/types/methods';
import { AssetString, bufferCV, ContractIdString, Pc, principalCV, serializeCV, someCV, uintCV } from '@stacks/transactions';
import { address } from "bitcoinjs-lib";
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { setSwapTransactions } from '../../../app/slices/Swap/thunks';
import { SwapProgress } from '../../../lib/swap';
import SwapItem from './SwapItem';

const SwapConfirm = ({
  setSwapProgress,
  sbtcSwapContract,
  sbtcAsset,
  chain,
}: {
  setSwapProgress: React.Dispatch<React.SetStateAction<SwapProgress>>;
  sbtcSwapContract: ContractIdString;
  sbtcAsset: AssetString;
  chain: string;
}) => {

  const dispatch = useAppDispatch();
  const swapInfo = useAppSelector(state => state.swap);
  const user = useAppSelector(state => state.user);

  const stxAddress = user.wallet?.stxAddress;
  const publicKey = user.wallet?.addresses.find((entry) => entry.symbol === "STX")?.publicKey;

  const {
    amountInfo: { sendAmount, receiveAmount },
    addressInfo: { userBTCAddress, receiverSTXAddress },
  } = swapInfo;

  console.log("swapInfo", swapInfo);
  const onGoBackBtnClicked = () => {
    setSwapProgress(SwapProgress.PREVEIW_SWAP);
  };

  const onConfirmBtnClicked = async () => {

    console.log("userbtc outputscript", address.toOutputScript(userBTCAddress));

    const functionArgs = [
      uintCV(Math.floor(sendAmount * 1e8)),
      bufferCV(address.toOutputScript(userBTCAddress)),
      uintCV(Math.floor(receiveAmount * 1.e8)),
      someCV(principalCV(receiverSTXAddress)),
      uintCV(Math.floor(sendAmount * 10 / 100))];

    const [assetContract, assetName] = sbtcAsset.split('::');
    const postConditions = [Pc.origin().willSendEq(
      Math.floor(sendAmount * 1e8),
    ).ft(assetContract as `${string}.${string}`, assetName)];


    const response = await request("stx_callContract",
      {
        contract: sbtcSwapContract,
        functionName: "create-swap",
        functionArgs: functionArgs.map(serializeCV),
        postConditionMode: "deny",
        postConditions,
        network: chain === "testnet" ? "testnet" : "mainnet",
      } as CallContractParams
    )

    if (!response.txid) {
      console.log("signTransaction failed", response);
      return
    }

    if (response.txid) {
      dispatch(setSwapTransactions({ createTx: response.txid }));
      setSwapProgress(SwapProgress.SWAP_COMPLETED);
    }
  };

  return (
    <div className="w-full p-5 flex flex-col gap-3 bg-white dark:bg-[rgba(11,11,15,0.9)] rounded-[18px]">
      <p className="w-full text-center text-[28px] leading-10">Catamaran Swap</p>
      <SwapItem
        mode="confirm"
        stxStatus="preview"
        btcStatus='waiting'
        sendAmount={sendAmount} receiveAmount={receiveAmount} receiverSTXAddress={receiverSTXAddress} userBTCAddress={userBTCAddress} />
      <div className="text-sm leading-[14px] flex flex-col gap-5 p-5 rounded-lg bg-[rgba(7,7,10,0.03)] dark:bg-[#14151A] border-[1px] border-[rgba(7,7,10,0.1)] dark:border-[rgba(255,255,255,0.1)]">
        <div className="w-full flex justify-between items-center">
          <p className="opacity-50">Your network fees (1 STX transactions)</p>
          <p>&lt;${0.01}</p>
        </div>
        <div className="w-full flex justify-between items-center">
          <p className="opacity-50">Receiver's network fees</p>
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
