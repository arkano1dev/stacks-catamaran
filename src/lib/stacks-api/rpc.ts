import {
  BooleanCV,
  BufferCV,
  ClarityValue,
  hexToCV,
  OptionalCV,
  PrincipalCV,
  serializeCV,
  TupleCV,
  UIntCV,
  uintCV,
} from '@stacks/transactions';

export const wasSegwitTxMinedCompact = async (verifyArgs: ClarityValue[], stxAddress: string) => {
  return fetch(
    'https://api.hiro.so/v2/contracts/call-read/SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9/clarity-bitcoin-lib-v5/was-segwit-tx-mined-compact',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sender: stxAddress,
        arguments: verifyArgs.map(cv => serializeCV(cv)),
      }),
    }
  ).then(res => res.json());
};

export const concatWtx = async (claimArgs: ClarityValue[], stxAddress: string) => {
  return fetch(
    'https://api.hiro.so/v2/contracts/call-read/SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9/bitcoin-helper-wtx-v1/concat-wtx',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sender: stxAddress,
        arguments: [serializeCV(claimArgs[2]), serializeCV(claimArgs[3])],
      }),
    }
  ).then(res => res.json());
};

export const getSwapInfo = async (swapId: string, sbtcSwapContract: `${string}.${string}`) => {
  const [contractAddress, contractName] = sbtcSwapContract.split('.');
  return fetch(`https://api.hiro.so/v2/map_entry/${contractAddress}/${contractName}/swaps`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(serializeCV(uintCV(swapId))),
  })
    .then(res => res.json())
    .then(res => {
      const optionalEntryCV = hexToCV(res.data) as OptionalCV<
        TupleCV<{
          amount: UIntCV;
          'btc-receiver': BufferCV;
          done: BooleanCV;
          premium: UIntCV;
          sats: UIntCV;
          'stx-receiver': OptionalCV<PrincipalCV>;
          when: UIntCV;
        }>
      >;
      return optionalEntryCV;
    });
};
