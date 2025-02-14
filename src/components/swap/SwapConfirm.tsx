import React from 'react';

import { openContractCall, request, showContractCall } from '@stacks/connect';
import { AssetString, broadcastTransaction, bufferCV, ContractIdString, FungibleConditionCode, FungiblePostCondition, makeContractCall, makeUnsignedContractCall, PostConditionMode, PostConditionType, principalCV, someCV, uintCV, UnsignedContractCallOptions } from '@stacks/transactions';
import { address } from "bitcoinjs-lib";
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { setSwapTransactions } from '../../app/slices/Swap/thunks';
import { AppDispatch } from '../../app/store';
import { SwapProgress } from '../../lib/swap';
import SwapItem from './SwapItem';
import { userSession } from '../../lib/userSession';
import { makeFungiblePostCondition } from '@clarigen/core';

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

  const dispatch = useDispatch<AppDispatch>();
  const swapInfo = useAppSelector(state => state.swap);
  const user = useAppSelector(state => state.user);

  const stxAddress = user.wallet?.stxAddress;
  const publicKey = user.wallet?.addresses.find((entry) => entry.symbol === "STX")?.publicKey;

  const {
    amountInfo: { sendAmount, receiveAmount },
    addressInfo: { userBTCAddress, receiverSTXAddress },
  } = swapInfo;

  const onGoBackBtnClicked = () => {
    setSwapProgress(SwapProgress.PREVEIW_SWAP);
  };

  const onConfirmBtnClicked = async () => {
    const btcAddress = address.fromBech32(userBTCAddress);
    const [contractAddress, contractName] = sbtcSwapContract.split('.');

    const functionArgs = [
      uintCV(Math.floor(sendAmount * 1e8)),
      bufferCV(btcAddress.data),
      uintCV(Math.floor(receiveAmount * 1.e8)),
      someCV(principalCV(receiverSTXAddress)),
      uintCV(Math.floor(sendAmount * 10 / 100))];

    const postConditions = [{
      type: "ft-postcondition",
      condition: "eq",
      address: stxAddress,
      amount: Math.floor(sendAmount * 1e8),
      asset: sbtcAsset
    }
    ];

    // console.log(await request("supportedMethods"));  

    const contractCall = await makeUnsignedContractCall({
      contractAddress,
      contractName,
      functionName: "create-swap",
      functionArgs,
      postConditionMode: PostConditionMode.Deny,
      postConditions,
      network: chain === "testnet" ? "testnet" : "mainnet",
      publicKey: publicKey!
    } as UnsignedContractCallOptions)

    const response = await request("stx_signTransaction", {
      transaction: contractCall.serialize(),
      stxAddress: stxAddress,
    })
    if (!response.txid) {
      console.log("signTransaction failed", response);
    }

    if (response.txid) {
      dispatch(setSwapTransactions({ submitTx: response.txid }));
      setSwapProgress(SwapProgress.SWAP_COMPLETED);
    } else {
      console.log("trying openContractCall");
      showContractCall({
        contractAddress,
        contractName,
        functionName: "create-swap",
        functionArgs,
        postConditionMode: PostConditionMode.Allow,
        postConditions: [],
        onFinish: (data) => {
          dispatch(setSwapTransactions({ submitTx: data.txId }));
          setSwapProgress(SwapProgress.SWAP_COMPLETED);
        },
        network: chain === "testnet" ? "testnet" : "mainnet",
        userSession: userSession,
      });
    }
  };

  return (
    <div className="w-full p-5 flex flex-col gap-3 bg-white dark:bg-[rgba(11,11,15,0.9)] rounded-[18px]">
      <p className="text-base leading-6 font-normal">Catamaran Swap</p>
      <SwapItem
        mode="confirm"
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
