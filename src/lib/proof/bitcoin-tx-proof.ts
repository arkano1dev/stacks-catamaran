import { hexToBytes, intToBytes } from '@stacks/common';
import { bufferCV, ClarityValue, listCV, tupleCV, uintCV } from '@stacks/transactions';
import { getWitnessData } from './witnessdata';

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
    blockHeight: 885116,
    transaction:
      '0200000000010139b53f95a466a27e8a333ee5d9c93d54587d248d8e8b2fab7165ec328c3da4d701000000000000000002e8030000000000001600141c7311e70e6634ce0578a6f3e7a20de9fa4548077c6e0300000000001600149d0c1f55a7de15637259c01a92dca4f8f3951e7a02483045022100b8011935732fff26d447069c6db6efd5bda063ce605f410d628fe85c426fb3de0220465041b2afd4d3ad4b9f4f403c1d2f81f0528a6270147804ceebde9cce035d62012102c3329a0cf9964f89de2342c947b35a4578b3c349b9804495446ed76c00ad391600000000',
    blockHeader:
      '0060fa25b58938a5aa2697e2e86d0d3746724129ed015ae86c200200000000000000000085d8b2e81bd722e307c571dc3a6249cf0e0b0e5fc347ea007d720f5ea55aed50546fbc67b18b021767749512',
    txIndex: 3395,
    merkleProofDepth: 13,
    witnessMerkleRoot: '6eedf47cc61db1d57c4aa38cad3d156ba9c5d5a00d47641840a433a52d236e1c',
    witnessMerkleProof:
      'bf09b38bd0be681a8dc9884b864b4a08f6ef2a2ea3479af0c4fce9a3a1a99bee4384ab6ea66aa7813c793bd639f2a673bb653cd5d02c2bcdac89002ea5e7c4401baeb34a9f0ee48f004681ff32814906ed85d77601aaf86a030fbee8588160ef795a1bff2b85e3e77a65c9b69ef86a1c12a54e816847727dda8cd6ca5156cd4b2672584f747746fc47a9940d5d77dbf49226902d1f88ba421f67faa80a6aa86648df4affe1e5f18767ddf77da981b888e70b67758dd9f3a5e11106a68a81bf7d8c49fb980c150623de98a78a813bb482a29bf9360f9b054200621f91115796be51ff4abff9309705a5d9752db1e58416ab2c3aaf7567e74bbd4989458dcbd78e3cb63ab021569c3e295fec0cddb254cadc4a0bcadfa150c1454cd30f2ea30e207b6bcc3ff6a9e779b64486803c2186536c3bf79b2556cf06491f3f30b313d24f86ba18d9e2ddb80b5557511dd027fb2e63ec17812ad488e47d3dc74d703a1a67b0d1f8ca5c4f6d8391192920ad1540ce8546144badcd7e0ea63229847e3064dad2ff999d1a7061a4303fd18c9334ec3a206ea6c73da20e073fdfafb594a8ce2a',
    witnessReservedValue: '0000000000000000000000000000000000000000000000000000000000000000',
    coinbaseTransaction:
      '010000000001010000000000000000000000000000000000000000000000000000000000000000ffffffff57037c810d1a4d696e656420627920416e74506f6f6c20d4000206e760996c01fabe6d6dde411bc34d56177944b2668dd3d779da9235253df140ee07b9d63f1f02bc65ee100000000000000000006d71b003000000000000ffffffff06220200000000000017a91442402a28dd61f2718a4b27ae72a4791d5bbdade787516a0d130000000017a9145249bdf2c131d43995cff42e8feee293f79297a8870000000000000000266a24aa21a9ed7f2da5988b6254178e1887867a877d7516c66870fa94b7f1ddc448a722ede9a100000000000000002f6a2d434f5245012953559db5cc88ab20b1960faa9793803d0703374e3ecda72cb7961caa4b541b1e322bcfe0b5a0300000000000000000146a12455853415401000d130f0e0e0b041f12001300000000000000002b6a2952534b424c4f434b3acc615931564cfdef73f2c52f22f8b3310db37a65a92e665324171f10006f0ec60120000000000000000000000000000000000000000000000000000000000000000000000000',
    coinbaseMerkleProof:
      '16a4b990f0a11c0f457a3c7e9602f12e7d1c01c52bf8054a436d5c59bc52361e70557208a4dbf39a58f934a4281f8f02349b1da0562eb6a2f01ea91a4379b8741f18ead8d915bc629fc42ec82dd2eb7cb5f821a9bd02fbc95b31fc6c61c4c70f672df50e65d055c195431827e6c2d54fe481390b312867af1d5696b355ea2ac3c7a553c8c34e8a381a0ebf46ef29fc2b40771bdbdd4c433b32c291a78a4ab55083efc755b4956d75ede9ad978b58bf59c3bfdbba7db616f55e8e357277fe42c28f4e35963e37c388265a7e86d1f14df844200bbcd9f1e6aaa15e425e89571f57d273736af45bb83fdbd51005db17f271b9cac2e77f109be7beb3b0dbd7399673f258e7b1ad96b9178cd9178908812daddec1a4fc66c8ebc9c803958221c258878f43fd20444530e20bb86c284dd2aa258c49737dffdb8a4732665b4dc5b150411f8c9eeec8ca3b329381ba88bb9ab3bab0becd91a7e03affe4edc8f55c9d068f0b0201b08b99bc059601f2d579b5551c79e77c0c830867d688ba7d1797e4cf447797571548f8b4b7bd6a904bc366c55f0f5fb2f551e94262aa98671bc275b940',
  };

  const { witnessData, hasWitnessData } = getWitnessData(txObject);

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
    '01000000010000000000000000000000000000000000000000000000000000000000000000ffffffff57037c810d1a4d696e656420627920416e74506f6f6c20d4000206e760996c01fabe6d6dde411bc34d56177944b2668dd3d779da9235253df140ee07b9d63f1f02bc65ee100000000000000000006d71b003000000000000ffffffff06220200000000000017a91442402a28dd61f2718a4b27ae72a4791d5bbdade787516a0d130000000017a9145249bdf2c131d43995cff42e8feee293f79297a8870000000000000000266a24aa21a9ed7f2da5988b6254178e1887867a877d7516c66870fa94b7f1ddc448a722ede9a100000000000000002f6a2d434f5245012953559db5cc88ab20b1960faa9793803d0703374e3ecda72cb7961caa4b541b1e322bcfe0b5a0300000000000000000146a12455853415401000d130f0e0e0b041f12001300000000000000002b6a2952534b424c4f434b3acc615931564cfdef73f2c52f22f8b3310db37a65a92e665324171f10006f0ec600000000';

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
      bufferCV(witnessData),
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
