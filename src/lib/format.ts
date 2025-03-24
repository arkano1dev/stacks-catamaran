export const shortTxid = (txid: string) => {
  if (txid.length < 10) {
    return txid;
  }
  return `${txid.slice(0, 6)}...${txid.slice(-4)}`;
};

export const roundedUsdString = (usd: number) => {
  return usd.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};
