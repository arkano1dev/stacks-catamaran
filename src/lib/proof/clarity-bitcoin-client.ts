import { hexToBytes, intToBytes } from '@stacks/common';
import { bufferCV, ClarityValue, listCV, tupleCV, uintCV } from '@stacks/transactions';
import { getWitnessData } from './witnessdata';

const witnessReservedValue = '0000000000000000000000000000000000000000000000000000000000000000';

export async function createSubmitStxTransactionArgs(
  swapId: number,
  btcTxid: string,
  chain: string
): Promise<{ claimArgs: ClarityValue[]; verifyArgs: ClarityValue[]; segwit: boolean }> {
  if (chain && chain !== 'mainnet') {
    return Promise.reject('Only mainnet supported');
  }

  const response = await fetch(
    `https://api.bigmarket.ai/bigmarket-api/clarity-bitcoin/tx/${btcTxid}/proof`
  );
  if (!response.ok) {
    return Promise.reject('service failed');
  }
  const { proof, data } = await response.json();
  const txObject = await fetch(`https://mempool.space/api/tx/${btcTxid}`).then(res => res.json());
  const { witnessData, hasWitnessData } = getWitnessData(txObject);

  if (proof.segwit && hasWitnessData) {
    return {
      segwit: true,
      claimArgs: [
        uintCV(swapId),
        uintCV(proof.height),
        tupleCV({
          version: bufferCV(intToBytes(txObject.version, 4).reverse()),
          ins: listCV(
            txObject.vin.map((input: any) => {
              console.log('input', input);
              return tupleCV({
                outpoint: tupleCV({
                  hash: bufferCV(hexToBytes(input.txid).reverse()),
                  index: bufferCV(intToBytes(input.vout, 4).reverse()),
                }),
                scriptSig: bufferCV(hexToBytes(input.scriptsig)),
                sequence: bufferCV(intToBytes(input.sequence, 4).reverse()),
              });
            })
          ),
          outs: listCV(
            txObject.vout.map((output: any) => {
              console.log('output', output);
              return tupleCV({
                value: bufferCV(intToBytes(output.value, 8).reverse()),
                scriptPubKey: bufferCV(hexToBytes(output.scriptpubkey)),
              });
            })
          ),
          locktime: bufferCV(intToBytes(txObject.locktime, 4).reverse()),
        }),
        bufferCV(new Uint8Array(witnessData)),
        bufferCV(hexToBytes(proof.header)),
        uintCV(proof.txIndex),
        uintCV(proof.treeDepth),
        listCV(proof.wproof.map((w: string) => bufferCV(hexToBytes(w)))),
        bufferCV(hexToBytes(proof.computedWtxidRoot)),
        bufferCV(hexToBytes(witnessReservedValue)),
        bufferCV(hexToBytes(proof.ctxHex)),
        listCV(proof.cproof.map((cb: string) => bufferCV(hexToBytes(cb)))),
      ],
      verifyArgs: [
        uintCV(proof.height),
        bufferCV(hexToBytes(proof.txHex)),
        bufferCV(hexToBytes(proof.header)),
        uintCV(proof.txIndex),
        uintCV(proof.treeDepth),
        listCV(proof.wproof.map((w: string) => bufferCV(hexToBytes(w)))),
        bufferCV(hexToBytes(proof.computedWtxidRoot)),
        bufferCV(hexToBytes(witnessReservedValue)),
        bufferCV(hexToBytes(proof.ctxHex)),
        listCV(proof.cproof.map((cb: string) => bufferCV(hexToBytes(cb)))),
      ],
    };
  } else {
    return {
      segwit: false,
      claimArgs: [
        uintCV(swapId),
        uintCV(proof.height),
        tupleCV({
          version: bufferCV(intToBytes(txObject.version, 4).reverse()),
          ins: listCV(
            txObject.vin.map((input: any) => {
              console.log('input', input);
              return tupleCV({
                outpoint: tupleCV({
                  hash: bufferCV(hexToBytes(input.txid).reverse()),
                  index: bufferCV(intToBytes(input.vout, 4).reverse()),
                }),
                scriptSig: bufferCV(hexToBytes(input.scriptsig)),
                sequence: bufferCV(intToBytes(input.sequence, 4).reverse()),
              });
            })
          ),
          outs: listCV(
            txObject.vout.map((output: any) => {
              console.log('output', output);
              return tupleCV({
                value: bufferCV(intToBytes(output.value, 8).reverse()),
                scriptPubKey: bufferCV(hexToBytes(output.scriptpubkey)),
              });
            })
          ),
          locktime: bufferCV(intToBytes(txObject.locktime, 4).reverse()),
        }),
        bufferCV(new Uint8Array(witnessData)),
        bufferCV(hexToBytes(proof.header)),
        uintCV(proof.txIndex),
        uintCV(proof.treeDepth),
        listCV(proof.wproof.map((w: string) => bufferCV(hexToBytes(w)))),
        bufferCV(hexToBytes(proof.merkleRoot)),
        bufferCV(hexToBytes(witnessReservedValue)),
        bufferCV(hexToBytes(proof.ctxHex)),
        listCV(proof.cproof.map((cb: string) => bufferCV(hexToBytes(cb)))),
      ],
      verifyArgs: [
        uintCV(proof.height),
        bufferCV(hexToBytes(proof.txHex)),
        bufferCV(hexToBytes(proof.header)),
        uintCV(proof.txIndex),
        uintCV(proof.treeDepth),
        listCV(proof.wproof.map((w: string) => bufferCV(hexToBytes(w)))),
        bufferCV(hexToBytes(proof.merkleRoot)),
        bufferCV(hexToBytes(witnessReservedValue)),
        bufferCV(hexToBytes(proof.ctxHex)),
        listCV(proof.cproof.map((cb: string) => bufferCV(hexToBytes(cb)))),
      ],
    };
  }
}
