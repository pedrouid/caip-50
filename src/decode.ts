import varint from "varint";
import u8a from "uint8arrays";

import { CAIP10AccountParams, CAIP50Account, CAIP50AccountParams } from "./types";
import { CAIP50_CODE, CAIP50_ENCODING, CAIP50_PREFIX } from "./constants";
import { checksum, formatCaip2, getCaip2NamespaceFormatByCode, formatAddress } from "./utils";

export function fromCaip50String(caip50: CAIP50Account): Uint8Array {
  return u8a.fromString(caip50.replace(CAIP50_PREFIX, ""), CAIP50_ENCODING);
}

export function sliceCaip50Bytes(bytes: Uint8Array): CAIP50AccountParams {
  const code = varint.decode(bytes.slice(0, 2));
  const namespaceCode = bytes.slice(2, 3)[0];
  const chainIdIndexStart = 4;
  const chainIdLength = varint.decode(bytes.slice(3, chainIdIndexStart));
  const chainIdIndexEnd = chainIdIndexStart + chainIdLength;
  const chainIdBytes = bytes.slice(chainIdIndexStart, chainIdIndexEnd);
  const addressIndexStart = chainIdIndexEnd + 1;
  const addressLength = varint.decode(bytes.slice(chainIdIndexEnd, addressIndexStart));
  const addressIndexEnd = addressIndexStart + addressLength;
  const addressBytes = bytes.slice(addressIndexStart, addressIndexEnd);
  return { code, namespaceCode, chainIdBytes, addressBytes };
}

export function decode(caip50: CAIP50Account): CAIP10AccountParams {
  const bytes = fromCaip50String(caip50);
  const { code, namespaceCode, chainIdBytes, addressBytes } = sliceCaip50Bytes(bytes);
  if (code !== CAIP50_CODE) {
    throw new Error("Invalid CAIP-50 code");
  }
  const lastByte = bytes.slice(-1);
  const parityByte = checksum(bytes);
  if (!u8a.compare(parityByte, lastByte)) {
    throw new Error("Invalid CAIP-50 checksum");
  }
  const { namespace, encoding } = getCaip2NamespaceFormatByCode(namespaceCode);
  const reference = u8a.toString(chainIdBytes, encoding.chainId);
  const chainId = formatCaip2({ namespace, reference });
  const address = formatAddress(addressBytes, encoding.address);
  return { chainId, address };
}
