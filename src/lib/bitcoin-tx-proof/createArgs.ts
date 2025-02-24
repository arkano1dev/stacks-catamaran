import { hexToBytes, intToBytes } from '@stacks/common';
import { bufferCV, ClarityValue, listCV, tupleCV, uintCV } from '@stacks/transactions';

export async function createSubmitStxTransactionArgs(
  swapId: number,
  btcTxid: string,
  chain: string
): Promise<{ claimArgs: ClarityValue[]; verifyArgs: ClarityValue[] }> {
  // fetch hex from mempool.space api
  // https://mempool.space/api/tx/c1de234c01ecc47906117d012865ce3dabbbb081dc0309a74dbbae45e427aadc/hex

  const hex = await fetch(`https://mempool.space/api/tx/${btcTxid}/hex`).then(res => res.text());

  const remoteData = true;
  const txObject = remoteData
    ? await fetch(`https://mempool.space/api/tx/${btcTxid}`)
        .then(res => res.json())
        .then(res => {
          console.log(res);
          return res;
        })
    : {
        txid: 'd7a43d8c32ec6571ab2f8b8e8d247d58543dc9d9e53e338a7ea266a4953fb539',
        version: 2,
        locktime: 0,
        vin: [
          {
            txid: '44c0135b76bd29c76202fdb683aab98dc003a9227ee1686df1e87374c1606dd6',
            vout: 1,
            prevout: {
              scriptpubkey: '00149d0c1f55a7de15637259c01a92dca4f8f3951e7a',
              scriptpubkey_asm: 'OP_0 OP_PUSHBYTES_20 9d0c1f55a7de15637259c01a92dca4f8f3951e7a',
              scriptpubkey_type: 'v0_p2wpkh',
              scriptpubkey_address: 'bc1qn5xp74d8mc2kxujecqdf9h9ylree28n6v9wxtp',
              value: 238843,
            },
            scriptsig: '',
            scriptsig_asm: '',
            witness: [
              '304402207d8964a57a40b06f88291d382feeb54eb3016a969b406685432717ce80b555130220354b0067ea7929be8c7d7429ea8d55563b360396f7060c4dd3a76a483e8fb34501',
              '02c3329a0cf9964f89de2342c947b35a4578b3c349b9804495446ed76c00ad3916',
            ],
            is_coinbase: false,
            sequence: 0,
          },
        ],
        vout: [
          {
            scriptpubkey: '00141c7311e70e6634ce0578a6f3e7a20de9fa454807',
            scriptpubkey_asm: 'OP_0 OP_PUSHBYTES_20 1c7311e70e6634ce0578a6f3e7a20de9fa454807',
            scriptpubkey_type: 'v0_p2wpkh',
            scriptpubkey_address: 'bc1qr3e3recwvc6vuptc5me70gsda8ay2jq8vn924j',
            value: 10000,
          },
          {
            scriptpubkey: '00149d0c1f55a7de15637259c01a92dca4f8f3951e7a',
            scriptpubkey_asm: 'OP_0 OP_PUSHBYTES_20 9d0c1f55a7de15637259c01a92dca4f8f3951e7a',
            scriptpubkey_type: 'v0_p2wpkh',
            scriptpubkey_address: 'bc1qn5xp74d8mc2kxujecqdf9h9ylree28n6v9wxtp',
            value: 226876,
          },
        ],
        size: 222,
        weight: 561,
        sigops: 1,
        fee: 1967,
        status: {
          confirmed: true,
          block_height: 885002,
          block_hash: '00000000000000000002373119b4e0ee08029b7c6fdb1f2d50848c29d895d21e',
          block_time: 1740331626,
        },
      };

  // https://mempool.space/api/block/00000000000000000001c55626b85b4b3ecb33f67645356a2b01f4dfba893679/header
  const headerHex = await fetch(
    `https://mempool.space/api/block/${txObject.status.block_hash}/header`
  ).then(res => res.text());

  const txProof = {
    blockHeight: 885002,
    transaction:
      '02000000000101d66d60c17473e8f16d68e17e22a903c08db9aa83b6fd0262c729bd765b13c0440100000000000000000210270000000000001600141c7311e70e6634ce0578a6f3e7a20de9fa4548073c760300000000001600149d0c1f55a7de15637259c01a92dca4f8f3951e7a0247304402207d8964a57a40b06f88291d382feeb54eb3016a969b406685432717ce80b555130220354b0067ea7929be8c7d7429ea8d55563b360396f7060c4dd3a76a483e8fb345012102c3329a0cf9964f89de2342c947b35a4578b3c349b9804495446ed76c00ad391600000000',
    blockHeader:
      '00409b2473af3170c0c03699036f6ad27667ac0a7415dff4b7740200000000000000000026b8fb1c3a2834a5f3faa76af540fd9aa3c40245b036c8b14d2758e58327668b6a5abb67267702173b7cfc65',
    txIndex: 2150,
    merkleProofDepth: 13,
    witnessMerkleRoot: '6134ef5c0ca193f40f51cc753fd792d9e700ac09055d75be3b5d080d1f7d98a3',
    witnessMerkleProof:
      'ac07866dc80ea6691ca97983ab62be93794b0447d5c82ff7f54cc0e17a7e940dc658ebb9a80473f4b8162d78f2bbea07e991d0f19f73b50a8a7f640887da47918b16bc3c30f18359e9960a9b86b1b7946d2d56ce8e8613651fc96bd09a172f73de4757b35906ca859e0213ccd5c6379e55b77208f5e78b7d209cba25af4a1d5af21fcf1f6732d8b8482a7f02d1dfa8615515ceca613c3adae994b84789620fca5e946240afabae297afa60cb70468580ef7a457bb56f0bcc38730c6b068010f1d503bdacc0108dbc034b75a84c0bc777ea2067c4817d54d42722f13b9c55359e99dfb9091fb49ae2803f0fc2ee0275a432c557efd101b64f9ac75f2d6240130669b7c272cb11b9604d8d0ee09a411915c1cf3bfa1365f2eccb73cadc8cea09bc540d2c4dcd664b6f59678694b7e4cb2a1fb96390effdafb597cbea7acc90ea91fc2f6b01944bbd31d70d3ca70628a71669cdf1b64e090ed74278cda3fe82407c8d341658268f6a2ee8c511a80bac3accd80823823d9751927468db295fa2377e3d0614f74acabb82f31a44e18999feb14e026ef29d76f1a7847161060c9b84e0',
    witnessReservedValue: '0000000000000000000000000000000000000000000000000000000000000000',
    coinbaseTransaction:
      '010000000001010000000000000000000000000000000000000000000000000000000000000000ffffffff58030a810d1b4d696e656420627920416e74506f6f6c3936357200050240d74971fabe6d6de3b28874f137f4297b0e7377d6980a47bfbd6899dc0b3e99a433230cea5ea08610000000000000000000bd54bcb8000000000000ffffffff06220200000000000017a91442402a28dd61f2718a4b27ae72a4791d5bbdade78757418c130000000017a9145249bdf2c131d43995cff42e8feee293f79297a8870000000000000000266a24aa21a9ed359478b1be08bc814b02fbb450685c7c56a6b8bc3fd4e6b29a86e5e281ca988000000000000000002f6a2d434f524501a37cf4faa0758b26dca666f3e36d42fa15cc01064e3ecda72cb7961caa4b541b1e322bcfe0b5a0300000000000000000146a12455853415401000d130f0e0e0b041f12001300000000000000002b6a2952534b424c4f434b3a93a0c25776b159117d6251e1f48615396ff2fedc874989bb7e74160a006f033d0120000000000000000000000000000000000000000000000000000000000000000000000000',
    coinbaseMerkleProof:
      '68a2e862dc6f0b24dd873b810542b14a32adf035930396d5c2d4c3fbe27e50d4dc5ee10593c6f332c9e465b23a21a9cca2a7c51baa00dd4eb089f6863773f39ab08f2696d4f935c71fa6257c542a1d941bc31e4ee87fd20aa9e39699e5b2b26d2e79c94d61588232bcd839a0ca399890b540d1598cd4009fb1bc350febf02b97b0d48877931222aee6a51788f75144e3b45d111417420b4184f9c85d888d7e80bba635fc89a93e20afc64280fec6fd72cfa4bd0170daae5cf53654fb622eaecbd9ad860ca3aa3eab71d6cd1e7dc0a9bcd8a2cc60769d9a8fbad91a64b241b9138f46b99c3967013d9e69f0149132052d1c74ccb9c494770b550b19cefabdcf1e06951f31d0aecf053ebbff97295d69b29f36e8413ea36fb96c2a0f17dbb06c26488b816b46ffe4af08ef7abe36e7ee32d6935ce098cfe7fbe752297e6593a72b4bab4af32a20aca52b85ecd1c9e73d584e6abcc38ffde290f66000fd7fd1301ed387ccc685e6f1b1a0d91501733df06a8c0a29a8663bcd6f09b6018739077a8a260a88d64073ee1eb1ac1223862c5f53b5ccadb0ccd920978da76a71a4210920',
  };

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

  // split txProof.witnessMerkleProof in chunks of 64 characters
  const chunks = txProof.witnessMerkleProof.match(/.{1,64}/g);
  const wproofs = chunks?.map(c => hexToBytes(c)) || [];

  // split txProof.coinbaseMerkleProof in chunks of 64 characters
  const cbChunks = txProof.coinbaseMerkleProof.match(/.{1,64}/g);
  const cbProofs = cbChunks?.map(c => hexToBytes(c)) || [];

  // const cbTransaction = Transaction.fromHex(txProof.coinbaseTransaction);
  // cbTransaction.stripWitnesses();
  // const cbHex = cbTransaction.toHex();

  const cbHex =
    '01000000010000000000000000000000000000000000000000000000000000000000000000ffffffff58030a810d1b4d696e656420627920416e74506f6f6c3936357200050240d74971fabe6d6de3b28874f137f4297b0e7377d6980a47bfbd6899dc0b3e99a433230cea5ea08610000000000000000000bd54bcb8000000000000ffffffff06220200000000000017a91442402a28dd61f2718a4b27ae72a4791d5bbdade78757418c130000000017a9145249bdf2c131d43995cff42e8feee293f79297a8870000000000000000266a24aa21a9ed359478b1be08bc814b02fbb450685c7c56a6b8bc3fd4e6b29a86e5e281ca988000000000000000002f6a2d434f524501a37cf4faa0758b26dca666f3e36d42fa15cc01064e3ecda72cb7961caa4b541b1e322bcfe0b5a0300000000000000000146a12455853415401000d130f0e0e0b041f12001300000000000000002b6a2952534b424c4f434b3a93a0c25776b159117d6251e1f48615396ff2fedc874989bb7e74160a006f033d00000000';

  console.log(hex);
  console.log(txObject);
  console.log(headerHex);

  if (!txObject.status.confirmed) {
    throw new Error('Transaction not confirmed');
  }
  const bitcoinHeight = txObject.status.block_height;
  return {
    claimArgs: [
      uintCV(swapId),
      uintCV(bitcoinHeight),
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
      bufferCV(hexToBytes(headerHex)),
      uintCV(txProof.txIndex),
      uintCV(txProof.merkleProofDepth),
      listCV(wproofs.map(w => bufferCV(w))),
      bufferCV(hexToBytes(txProof.witnessMerkleRoot)),
      bufferCV(hexToBytes(txProof.witnessReservedValue)),
      bufferCV(hexToBytes(cbHex)),
      listCV(cbProofs.map(cb => bufferCV(cb))),
    ],
    verifyArgs: [
      uintCV(bitcoinHeight),
      bufferCV(hexToBytes(hex)),
      bufferCV(hexToBytes(headerHex)),
      uintCV(txProof.txIndex),
      uintCV(txProof.merkleProofDepth),
      listCV(wproofs.map(w => bufferCV(w))),
      bufferCV(hexToBytes(txProof.witnessMerkleRoot)),
      bufferCV(hexToBytes(txProof.witnessReservedValue)),
      bufferCV(hexToBytes(cbHex)),
      listCV(cbProofs.map(cb => bufferCV(cb))),
    ],
  };

  //const txProof = await bitcoinTxProof(btcTxid, bitcoinHeight, btcRPCConfig);

  //     bitcoinHeight,
  //     txHex,
  //     headerHex,
  //     txProof.txIndex, // merkleProof.pos,
  //     txProof.merkleProofDepth, // proof.hashes.length,
  //     wproofs,
  //     txProof.witnessMerkleRoot,
  //     txProof.witnessReservedValue, // reservedValue,
  //     cbHex, // legacyCoinbaseTxHex,
  //     cbProofs, //proofCoinbase.hashes,
  /* 
    (id uint)
    (height uint)
    (wtx {version: (buff 4),
      ins: (list 8
        {outpoint: {hash: (buff 32), index: (buff 4)}, scriptSig: (buff 256), sequence: (buff 4)}),
      outs: (list 8
        {value: (buff 8), scriptPubKey: (buff 128)}),
      locktime: (buff 4)})
    (witness-data (buff 1650))
    (header (buff 80))
    (tx-index uint)
    (tree-depth uint)
    (wproof (list 14 (buff 32)))
    (witness-merkle-root (buff 32))
    (witness-reserved-value (buff 32))
    (ctx (buff 1024))
    (cproof (list 14 (buff 32))))
    */
  // return [uintCV(swapId)];
}
