import { useEffect, useState } from 'react';
import CatamaranSwap from './stx/CatamaranSwap';
import SwapButton from './SwapButton';
import SwapComplete from './stx/SwapComplete';
import SwapConfirm from './stx/SwapConfirm';

import { connectWebSocketClient, createClient, StacksApiWebSocketClient } from '@stacks/blockchain-api-client';
import { SwapItems, SwapProgress } from '../../lib/swap';

import { useParams } from 'react-router-dom';
import ConnectFirst from './ConnectFirst';
import History from './History';
import { useAppSelector } from '../../app/hooks';
import BtcSwapConfirm from './btc/BtcSwapConfirm';
import BtcSwapClaim from './btc/BtcSwapClaim';
import BtcSwapComplete from './btc/BtcSwapComplete';

const Swap = () => {
  const { id } = useParams<{ id: string }>();
  const user = useAppSelector(state => state.user);;

  const swapProgressInitial = id ? SwapProgress.SUBMIT_ON_STX : SwapProgress.PREVEIW_SWAP;
  const [swapProgress, setSwapProgress] = useState<SwapProgress>(swapProgressInitial);
  const [selectedHeaderItem, setSelectedHeaderItem] = useState<SwapItems>(
    id ? SwapItems.HISTORY : SwapItems.CATAMARAN_SWAP
  );
  const params = new URLSearchParams(window.location.search);
  const apiUrl = params.get('api');
  const chain = params.get('chain') || "";
  const isTestnet = chain === 'testnet';

  const baseUrl = apiUrl ? apiUrl : isTestnet ? "https://api.testnet.hiro.so" : 'https://api.hiro.so';
  const wsUrl = isTestnet ? "wss://api.testnet.hiro.so" : 'wss://api.hiro.so';
  const client = createClient({
    baseUrl,
  })
  const [wsClient, setWsClient] = useState<StacksApiWebSocketClient | null>(null);

  useEffect(() => {
    const fn = async () => {
      const wsc = await connectWebSocketClient(wsUrl);
      setWsClient(wsc);
    }
    fn();
  }, [wsUrl]);

  const sbtcAsset = isTestnet ? "SN1Z0WW5SMN4J99A1G1725PAB8H24CWNA7Z8H7214.sbtc-token::sbtc-token" : "SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token::sbtc-token"
  const sbtcSwapContract = isTestnet ? "ST3FFRX7C911PZP5RHE148YDVDD9JWVS6FZRA60VS.btc-sbtc-swap" : "SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9.btc-sbtc-swap-v2";

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-[1440px] flex justify-center px-5 pb-8">
        <div className="max-w-[590px] w-full mg-18 sm:mt-24 flex flex-col gap-5">

          {(() => {
            switch (swapProgress) {
              case SwapProgress.PREVEIW_SWAP:
                return <>
                  <div className="w-full flex rounded-[18px] bg-white dark:bg-[rgba(11,11,15,0.9)] p-2 gap-2.5 text-center">
                    <SwapButton
                      name={SwapItems.CATAMARAN_SWAP}
                      setSelectedHeaderItem={setSelectedHeaderItem}
                      selectedHeaderItem={selectedHeaderItem}
                    />
                    <SwapButton
                      name={SwapItems.HISTORY}
                      setSelectedHeaderItem={setSelectedHeaderItem}
                      selectedHeaderItem={selectedHeaderItem}
                    />
                  </div>
                  {(() => {
                    if (user.isAuthenticated) {
                      switch (selectedHeaderItem) {
                        case SwapItems.CATAMARAN_SWAP:
                          return <CatamaranSwap setSwapProgress={setSwapProgress} sbtcAsset={sbtcAsset} client={client} chain={chain} />;
                        case SwapItems.HISTORY:
                          return <History id={id} />;
                      }
                    } else {
                      return <ConnectFirst chain={chain} />
                    }
                  })()}
                </>
              case SwapProgress.SWAP_CONFIRM:
                return <SwapConfirm setSwapProgress={setSwapProgress} sbtcSwapContract={sbtcSwapContract}
                  sbtcAsset={sbtcAsset} chain={chain} />;
              case SwapProgress.SWAP_COMPLETED:
                return <SwapComplete setSwapProgress={setSwapProgress} wsClient={wsClient} chain={chain} />;
              // btc receiver actions
              case SwapProgress.SUBMIT_BTC_CONFIRM:
                return <BtcSwapConfirm setSwapProgress={setSwapProgress} chain={chain} />
              case SwapProgress.SUBMIT_ON_STX:
                return <BtcSwapClaim setSwapProgress={setSwapProgress}
                  sbtcSwapContract={sbtcSwapContract} chain={chain} client={client} />
              case SwapProgress.SUBMIT_ON_STX_COMPLETED:
                return <BtcSwapComplete setSwapProgress={setSwapProgress} chain={chain} />

            }
          })()}
        </div>
      </div>
    </div >
  );
};

export default Swap;
