import { hexToBytes } from '@stacks/common';

export const getWitnessData = (txObject: any) => {
  let hasWitnessData = false;
  const witnessData: number[] = [];
  for (let vin of txObject.vin) {
    if (!vin.witness) {
      continue;
    }
    hasWitnessData = true;
    witnessData.push(vin.witness.length);
    for (let item of vin.witness || []) {
      const b = hexToBytes(item);
      witnessData.push(b.length);
      witnessData.push(...b);
    }
  }
  return { witnessData: new Uint8Array(witnessData), hasWitnessData };
};
