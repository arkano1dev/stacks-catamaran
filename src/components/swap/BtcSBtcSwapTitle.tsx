import InfoImg from '/src/assets/img/info.svg?react';

const BtcSBtcSwapTitle = () => {
    return <div className="w-full flex justify-between items-center">
        <div className="flex gap-2 items-center">

            <p className="text-base leading-6 font-normal">BTC/sBTC Swap</p>
            <div className="group flex justify-center">
                <button data-tooltip-target="tooltip-default">
                    <InfoImg className="dark:stroke-white stroke-special-black" />
                </button>
                <div className="relative">
                    <span className="absolute w-40 -ml-20 transition-all duration-300 bottom-7 left-0 opacity-0 rounded bg-gray-800 p-2 text-xs text-white group-hover:opacity-100">
                        This is a Catamaran Swap. You exchange between BTC and sBTC trustlessly.
                    </span>
                </div>
            </div>
        </div>
    </div>
}

export default BtcSBtcSwapTitle;