import React, { useEffect, useState } from 'react';

import { createClient } from '@stacks/blockchain-api-client';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useAppSelector } from '../../../app/hooks';
import { setSwapAddressDetail, setSwapAmountDetail } from '../../../app/slices/Swap/thunks';
import { AppDispatch } from '../../../app/store';
import { SwapProgress } from '../../../lib/swap';
import BtcImg from '/src/assets/img/btc.png';
import ChevronDownImg from '/src/assets/img/chevron-down.svg?react';
import InfoImg from '/src/assets/img/info.svg?react';
import SBtcImg from '/src/assets/img/sbtc.png';

interface AccountBalance {
  balanceSTX: number;
  balanceSBTC: number;
}

const isInvalidNuber = (number: number) => {
  const regex = /^(?:[1-9]\d*|0)?(?:\.\d+)?$/;
  return (
    !regex.test(number.toString()) ||
    (number.toString().charAt(0) === '0' &&
      number.toString().charAt(1) !== '.' &&
      number.toString().length >= 2) ||
    number.toString().charAt(0) === '.'
  );
};


const CatamaranSwap = ({
  client,
  sbtcAsset,
  setSwapProgress,
  chain
}: {
  client: ReturnType<typeof createClient>;
  sbtcAsset: string;
  setSwapProgress: React.Dispatch<React.SetStateAction<SwapProgress>>;
  chain: string;
}) => {

  const [amounts, setAmounts] = useState({
    sendAmount: 1,
    receiveAmount: 1,
  });
  const [error, setError] = useState({
    sendAmount: '',
    receiveAmount: '',
  });
  const [accountBalance, setAccountBalance] = useState<AccountBalance>();

  const [btcAddress, setBtcAddress] = useState<string>('');
  const [stxAddress, setStxAddress] = useState<string>('');
  const [usdCurrencies, setUSDCurrencies] = useState({
    stx: 0,
    btc: 97755.23, // TODO fetch price
  });
  const { sendAmount, receiveAmount } = amounts;
  const dispatch = useDispatch<AppDispatch>();
  const swapInfo = useAppSelector(state => state.swap);
  const user = useAppSelector(state => state.user);;

  const userBTCAddress = user.isAuthenticated ? user.wallet?.addresses.find((entry) =>
    entry.symbol === "BTC" && (entry as any).type === "p2wpkh")?.address || '' : '';

  console.log(userBTCAddress)
  useEffect(() => {
    if (userBTCAddress) {
      setBtcAddress(userBTCAddress);
    }
  }, [userBTCAddress]);

  useEffect(() => {
    console.log(user.isAuthenticated, user.wallet?.stxAddress)
    if (user.isAuthenticated && user.wallet?.stxAddress) {
      const userSTXAddress = user.wallet.stxAddress;
      void (async () => {
        const { data: balanceInfo } = await client.GET("/extended/v1/address/{principal}/balances", {
          params: {
            path: {
              principal: userSTXAddress,
            }
          }
        });
        if (balanceInfo) {
          setAccountBalance({
            balanceSBTC: Number(balanceInfo.fungible_tokens[sbtcAsset]?.balance ?? "0"),
            balanceSTX: Number(balanceInfo.stx.balance ?? "0")
          } as AccountBalance);
        }
      })();
    }
  }, [user.isAuthenticated, user.wallet?.stxAddress]);

  const { balanceSBTC } = accountBalance ?? {};

  useEffect(() => {
    if (isInvalidNuber(sendAmount)) {
      setError({
        ...error,
        sendAmount: 'Invalid number',
      });
    } else if (balanceSBTC && BigInt(sendAmount * 1.e8) > balanceSBTC) {
      setError({
        ...error,
        sendAmount: 'You cannot send more than your balance.',
      });
    } else if (error.sendAmount) {
      setError({
        ...error,
        sendAmount: '',
      });
    }
  }, [sendAmount, balanceSBTC, error]);

  useEffect(() => {
    if (isInvalidNuber(receiveAmount)) {
      setError(error => {
        return {
          ...error,
          receiveAmount: 'Invalid number',
        };
      });
    }
  }, [receiveAmount]);

  useEffect(() => {
    console.log({ swapInfo }, userBTCAddress)
    if (swapInfo && user.isAuthenticated) {
      setAmounts(swapInfo.amountInfo);
      setBtcAddress(swapInfo.addressInfo.userBTCAddress || userBTCAddress);
      setStxAddress(swapInfo.addressInfo.receiverSTXAddress);
    }
  }, [swapInfo, user.isAuthenticated, userBTCAddress]);

  if (!user.isAuthenticated) {
    return null;
  }

  const onChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = ev;
    const amount = Number(value);
    setAmounts({ receiveAmount: amount, sendAmount: amount });
  };
  const onPreviewSwap = () => {
    if (Object.values(error).some(msg => !!msg)) {
      toast('Please fix the errors.', {
        type: 'error',
      });
      return;
    }
    dispatch(setSwapAmountDetail(amounts));
    dispatch(
      setSwapAddressDetail({
        userBTCAddress: btcAddress,
        receiverSTXAddress: stxAddress,
      })
    );
    setSwapProgress(SwapProgress.SWAP_CONFIRM);
  };
  return (
    <div className="w-full p-5 flex flex-col gap-3 bg-white dark:bg-[rgba(11,11,15,0.9)] rounded-[18px]">
      <div className="w-full flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <p className="text-base leading-6 font-normal">BTC/sBTC Swap</p>
          <div className="group flex justify-center">
            <button data-tooltip-target="tooltip-default">
              <InfoImg className="dark:stroke-white stroke-special-black" />
            </button>
            <div className="relative">
              <span className="absolute w-40 -ml-20 transition-all duration-300 bottom-7 left-0 opacity-0 rounded bg-gray-800 p-2 text-xs text-white group-hover:opacity-100">
                This is a Catamaran Swap. You can exchange between BTC and sBTC.
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="p-5 flex justify-between items-center rounded-lg bg-[rgba(7,7,10,0.03)] dark:bg-[#14151A] border-[1px] border-[rgba(7,7,10,0.1)] dark:border-[rgba(255,255,255,0.1)]">
        <div className="w-full">
          <div className="w-full flex justify-between">
            <p className="text-xs leading-[14px] font-light opacity-50">You send</p>
            <p className="text-xs leading-[14px] font-light opacity-50">
              {`Balance: ${(balanceSBTC ? (balanceSBTC / 1e8) : Number(0)).toFixed(8)} sBTC`}
            </p>
          </div>
          <div className="mt-2 w-full flex justify-between items-center">
            <div className="flex flex-col">
              <input
                className={"mt-2 text-[28px] bg-transparent outline-none leading-6 font-light text-right"}
                type="number"
                name="sendAmount"
                value={sendAmount}
                onChange={onChange}
              />
              <p className="text-xs mt-1 text-red-500">{error.sendAmount}</p>
            </div>
            <div className="flex gap-2 items-center">
              <img className="h-7 w-7" src={SBtcImg} alt="" />
              <p className="text-xl font-medium leading-6">sBTC</p>
            </div>
          </div>
          <p className="mt-4 text-xs leading-[14px] font-light opacity-50 text-right">
            ≈${sendAmount * usdCurrencies.btc}
          </p>

          <p className="pt-5 text-xs font-light leading-[14px] opacity-50">To</p>
          <div className="mt-2.5 mb-1 rounded-lg w-full flex flex-col sm:flex-row sm:gap-2 p-4 pl-3 border-[1px] border-[rgba(7,7,10,0.1)] dark:border-[rgba(255,255,255,0.1)] bg-[rgba(7,7,10,0.04)] text-sm leading-[17px] font-normal">
            <div className="flex gap-1.5 items-center opacity-50">
              <p>Receiver STX address or name</p>
              <InfoImg className="w-3 h-3 dark:stroke-white stroke-special-black" />
            </div>
            <input
              className="w-full outline-none bg-transparent grow"
              name="stxAddress"
              value={stxAddress}
              onChange={(ev: React.ChangeEvent<HTMLInputElement>) => setStxAddress(ev.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="p-5 flex justify-between items-center rounded-lg bg-[rgba(7,7,10,0.03)] dark:bg-[#14151A] border-[1px] border-[rgba(7,7,10,0.1)] dark:border-[rgba(255,255,255,0.1)]">
        <div className="w-full">
          <p className="text-xs font-light leading-[14px] opacity-50">You will receive</p>
          <p className="text-xs leading-[14px] font-light opacity-50"></p>
          <div className="mt-2 w-full flex justify-between items-center">
            <div className="flex flex-col">
              <input
                type="number"
                name="receiveAmount"
                value={receiveAmount}
                onChange={onChange}
                className="mt-2 text-[28px] bg-transparent outline-none leading-6 font-light text-right"
              />
            </div>
            <div className="flex gap-2 items-center">
              <img className="h-7 w-7" src={BtcImg} alt="" />
              <p className="text-xl font-medium leading-6">BTC</p>
            </div>
          </div>
          <p className="mt-4 text-xs leading-[14px] font-light opacity-50 text-right">
            ≈${receiveAmount * usdCurrencies.btc}
          </p>
          <p className="pt-5 text-xs font-light leading-[14px] opacity-50">At</p>
          <div className="mt-2.5 mb-1 rounded-lg w-full flex flex-col sm:flex-row sm:gap-2 p-4 pl-3 border-[1px] border-[rgba(7,7,10,0.1)] dark:border-[rgba(255,255,255,0.1)] bg-[rgba(7,7,10,0.04)] text-sm leading-[17px] font-normal">
            <div className="flex gap-1.5 items-center opacity-50">
              <p>Your BTC address</p>
              <InfoImg className="w-3 h-3 dark:stroke-white stroke-special-black" />
            </div>
            <input
              className="w-full outline-none bg-transparent grow"
              name="btcAddress"
              value={btcAddress}
              onChange={(ev: React.ChangeEvent<HTMLInputElement>) => setBtcAddress(ev.target.value)}
            />
            <p className="text-xs mt-1 text-red-500">{error.sendAmount}</p>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-between items-center px-10">
        <p className="py-2 text-sm leading-5 font-light">
          1 BTC = 1 sBTC
          <span className="opacity-50"> (${usdCurrencies.btc.toLocaleString()}) </span>
        </p>
        <ChevronDownImg className="dark:fill-white fill-special-black flex-none" />
      </div>
      <button
        className="mt-5 rounded-full w-full py-3 dark:bg-white bg-special-black text-base font-medium leading-5 text-white dark:text-special-black"
        onClick={onPreviewSwap}
      >
        Preview Swap
      </button>
    </div>
  );
};

export default CatamaranSwap;
