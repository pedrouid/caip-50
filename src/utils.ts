import u8a from 'uint8arrays';

import { CAIP2_NAMESPACE_FORMATS } from './constants';
import {
  CAIP10Account,
  CAIP10AccountParams,
  CAIP2ChainId,
  CAIP2ChainIdParams,
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
