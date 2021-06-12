import varint from 'varint';
import u8a from 'uint8arrays';

import { CAIP50_CODE, CAIP2_NAMESPACE_FORMATS } from './contants';
import {
  CAIP10Account,
  CAIP10AccountParams,
  CAIP2ChainId,
  CAIP2ChainIdParams,
  CAIP50Account,
} from './types';

export function checksum(bytes: Uint8Array) {
  let result = u8a.xor(
    Uint8Array.from([bytes[0]]),
    Uint8Array.from([bytes[1]])
  );
  for (let i = 2; i < bytes.length; i++) {
    result = u8a.xor(result, Uint8Array.from([bytes[i]]));
  }
  return result;
}

export function getCaip2NamespaceFormat(namespace: string) {
  const format = CAIP2_NAMESPACE_FORMATS[namespace.toLowerCase()];
  if (typeof format === 'undefined') {
    throw new Error(
      `Invalid or missing format for CAIP-2 namespace: ${namespace}`
    );
  }
  return format;
}

export function fromString(value: string, encoding: string): Uint8Array {
  if (encoding === 'number') {
    value = Number(value).toString(16);
    encoding = 'base16';
  }
  return u8a.fromString(value, encoding as any);
}

export function encode(caip10: CAIP50Account) {
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

export function parseCaip10(caip10: CAIP10Account): CAIP10AccountParams {
  if (typeof caip10 !== 'string') return caip10;
  const [address, chainId] = caip10.split('@');
  return { chainId, address };
}

export function parseCaip2(caip2: CAIP2ChainId): CAIP2ChainIdParams {
  if (typeof caip2 !== 'string') return caip2;
  const [namespace, reference] = caip2.split(':');
  return { namespace, reference };
}
