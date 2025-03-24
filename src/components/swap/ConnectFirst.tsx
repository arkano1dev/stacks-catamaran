
import ConnectWallet from '../common/ConnectWallet';
import BtcSBtcSwapTitle from './BtcSBtcSwapTitle';
import InfoImg from '/src/assets/img/info.svg?react';


const ConnectFirst = ({ chain }: { chain: string }) => {

  return (
    <div className="w-full p-5 flex flex-col gap-3 bg-white dark:bg-[rgba(11,11,15,0.9)] rounded-[18px]">
      <BtcSBtcSwapTitle />
      <div className="p-5 flex justify-between items-center rounded-lg bg-[rgba(7,7,10,0.03)] dark:bg-[#14151A] border-[1px] border-[rgba(7,7,10,0.1)] dark:border-[rgba(255,255,255,0.1)]">
        <div className="w-full">
          <div className="w-full flex justify-between">
            <p className="text-xs leading-[14px] font-light">Catamaran Swaps are trustless and make it easy to swap assets between the Stacks and Bitcoin.</p>
          </div>
        </div>
      </div>
      <ConnectWallet chain={chain} />
    </div >
  );
};

export default ConnectFirst;
