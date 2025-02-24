import { DefaultNetworkConfigurations } from '@leather.io/models';
import { getProviderOrThrow, RpcErrorResponse, RpcSuccessResponse } from 'sats-connect';

declare global {
  interface Window {
    LeatherProvider: any;
  }
}

export function getLeatherBTCProviderOrThrow() {
  let provider = window.LeatherProvider;
  if (!provider) {
    throw new Error('BTC provider not found');
  }

  return provider;
}

type Payload = {
  recipient: string;
  amountInSats: number;
  network?: DefaultNetworkConfigurations;
};

export async function sendBTCLeather({
  amountInSats,
  recipient,
  network,
}: Payload): Promise<string> {
  const btc = getLeatherBTCProviderOrThrow();
  console.log({ network });
  const response = await btc.request('sendTransfer', {
    recipients: [
      {
        address: recipient,
        amount: String(amountInSats),
      },
    ],
    network: 'mainnet',
  });

  const result = response.result as { txid: string };
  return result.txid.replace(/"|'/g, '');
}

export async function sendBTCXverse({ amountInSats, recipient }: Payload) {
  const btc = await getProviderOrThrow();
  const response = await btc.request('sendTransfer', {
    recipients: [
      {
        address: recipient,
        amount: amountInSats,
      },
    ],
  });

  const error = (response as RpcErrorResponse).error;
  if (error) {
    throw new Error(error.message);
  }
  const result = (response as RpcSuccessResponse<'sendTransfer'>).result;
  return result.txid;
}
