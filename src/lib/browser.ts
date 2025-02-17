export const createExplorerLink = (txId: string, chain: string) => {
  return `https://explorer.hiro.so/txid/${txId}?chain=${chain}`;
};

export const createBtcExplorerLink = (txId: string, chain: string) => {
  return chain === 'mainnet'
    ? `https://mempool.space/tx/${txId}`
    : `https://mempool.space/testnet4/tx/${txId}`;
};
