
import ConnectWallet from '../../common/ConnectWallet';
import InfoImg from '/src/assets/img/info.svg?react';


const ConnectFirst = () => {

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
            <p className="text-xs leading-[14px] font-light">Catamaran Swaps are trustless and make it easy to swap assets between the Stacks and Bitcoin.</p>
          </div>
        </div>
      </div>
      <ConnectWallet />
    </div>
  );
};

export default ConnectFirst;
