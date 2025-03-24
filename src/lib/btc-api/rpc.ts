export const fetchBtcTx = async (btcTxId: string) => {
  const tx = await fetch(`https://mempool.space/api/tx/${btcTxId}`).then(res => res.json());
  return tx as {
    status: {
      confirmed: boolean;
      block_height: number;
    };
  };
};
