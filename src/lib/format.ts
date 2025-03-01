export const shortTxid = (txid: string) => {
  if (txid.length < 10) {
    return txid;
  }
  return `${txid.slice(0, 6)}...${txid.slice(-4)}`;
};
