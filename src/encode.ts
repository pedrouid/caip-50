import varint from "varint";
import u8a from "uint8arrays";

import { CAIP50_CODE, CAIP50_ENCODING, CAIP50_PREFIX } from "./constants";
import { CAIP10Account, CAIP50Account } from "./types";
import { checksum, getCaip2NamespaceFormat, parseCaip10, parseCaip2, parseAddress } from "./utils";

export function encode(caip10: CAIP10Account): CAIP50Account {
  const { address, chainId } = parseCaip10(caip10);
  const { namespace, reference } = parseCaip2(chainId);
  const { code: namespaceCode, encoding } = getCaip2NamespaceFormat(namespace);
  const chainIdBytes = u8a.fromString(reference, encoding.chainId);
  const addressBytes = parseAddress(address, encoding.address);
  const bytes = u8a.concat([
    varint.encode(CAIP50_CODE),
    Uint8Array.from([namespaceCode]),
    varint.encode(chainIdBytes.length),
    chainIdBytes,
    varint.encode(addressBytes.length),
    addressBytes,
  ]);
  const parityByte = checksum(bytes);
  const checksummedBytes = u8a.concat([bytes, parityByte]);
  return CAIP50_PREFIX + u8a.toString(checksummedBytes, CAIP50_ENCODING);
}
