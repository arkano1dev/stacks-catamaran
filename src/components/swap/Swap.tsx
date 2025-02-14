import { useEffect, useState } from 'react';
import CatamaranSwap from './catamaran-swap/CatamaranSwap';
import SwapButton from './SwapButton';
import SwapComplete from './SwapComplete';
import SwapConfirm from './SwapConfirm';

import { connectWebSocketClient, createClient, StacksApiWebSocketClient } from '@stacks/blockchain-api-client';
import { SwapItems, SwapProgress } from '../../lib/swap';

import { useParams } from 'react-router-dom';
import ConnectFirst from './catamaran-swap/ConnectFirst';
import History from './History';
import { useAppSelector } from '../../app/hooks';

const Swap = () => {
  const { id } = useParams<{ id: string }>();
  const user = useAppSelector(state => state.user);;

  const [swapProgress, setSwapProgress] = useState<SwapProgress>(SwapProgress.PREVEIW_SWAP);
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
  const sbtcSwapContract = isTestnet ? "ST3FFRX7C911PZP5RHE148YDVDD9JWVS6FZRA60VS.btc-sbtc-swap" : "SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.undefined";

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-[1440px] flex justify-center px-5 pb-8">
        <div className="max-w-[590px] w-full mg-18 sm:mt-24 flex flex-col gap-5">
          {SwapProgress.PREVEIW_SWAP === swapProgress ? (
            <>
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
                switch (selectedHeaderItem) {
                  case SwapItems.CATAMARAN_SWAP:
                    return user.isAuthenticated ?
                      <CatamaranSwap setSwapProgress={setSwapProgress} sbtcAsset={sbtcAsset} client={client} chain={chain} /> :
                      <ConnectFirst chain={chain} />
                  case SwapItems.HISTORY:
                    return user.isAuthenticated ? <History id={id} /> : <ConnectFirst chain={chain} />;
                }
              })()}
            </>
          ) : (
            <>
              {(() => {
                switch (swapProgress) {
                  case SwapProgress.SWAP_CONFIRM:
                    return <SwapConfirm setSwapProgress={setSwapProgress} sbtcSwapContract={sbtcSwapContract}
                      sbtcAsset={sbtcAsset} chain={chain} />;
                  case SwapProgress.SWAP_COMPLETED:
                    return <SwapComplete setSwapProgress={setSwapProgress} wsClient={wsClient} />;
                }
              })()}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Swap;
