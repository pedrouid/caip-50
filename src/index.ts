import varint from 'varint';
import u8a from 'uint8arrays';

import { CAIP50_CODE } from './contants';
import { CAIP10Account, CAIP10AccountParams, CAIP50Account } from './types';
import {
  checksum,
  fromString,
  getCaip2NamespaceFormat,
  parseCaip10,
  parseCaip2,
} from './utils';

export function encode(caip10: CAIP10Account): CAIP50Account {
  const { address, chainId } = parseCaip10(caip10);
  const { namespace, reference } = parseCaip2(chainId);
  const { code, encoding } = getCaip2NamespaceFormat(namespace);
  const chainIdBytes = fromString(reference, encoding.chainId);
  const addressBytes = fromString(address, encoding.address);

  const bytes = u8a.concat([
    varint.encode(CAIP50_CODE),
    Uint8Array.from([code]),
    varint.encode(chainIdBytes.length), // chain_id below is just one byte
    chainIdBytes,
    varint.encode(addressBytes.length),
    addressBytes,
  ]);
  const checksummedBytes = u8a.concat([bytes, checksum(bytes)]);
  return 'z' + u8a.toString(checksummedBytes, 'base58btc');
}
export function decode(caip50: CAIP50Account): CAIP10AccountParams {
  // TODO: implement decode
  return { chainId: '', address: '' };
}
