import { request } from '@stacks/connect';

export const getAddresses = async (chain: string) => {
  const result = await request('getAddresses', {
    network: chain === 'testnet' ? 'testnet' : 'mainnet',
  });
  return result;

  //   showConnect({
  //     appDetails: {
  //       name: 'Stacks React Starter',
  //       icon: window.location.origin + '/logo512.png',
  //     },
  //     redirectTo: '/',
  //     onFinish: () => {
  //       window.location.reload();
  //     },
  //     userSession: userSession,
  //   });
};
