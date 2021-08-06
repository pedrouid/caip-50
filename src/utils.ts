import u8a from "uint8arrays";
import { bech32 } from "bech32";

import { CAIP2_NAMESPACE_FORMATS } from "./constants";
import {
  AddressEncoding,
  CAIP10Account,
  CAIP10AccountParams,
  CAIP2ChainId,
  CAIP2ChainIdParams,
  Caip2NamespaceFormat,
} from "./types";

export function checksum(bytes: Uint8Array) {
  let result = u8a.xor(Uint8Array.from([bytes[0]]), Uint8Array.from([bytes[1]]));
  for (let i = 2; i < bytes.length; i++) {
    result = u8a.xor(result, Uint8Array.from([bytes[i]]));
  }
  return result;
}

export function getCaip2NamespaceFormat(namespace: string): Caip2NamespaceFormat {
  const format = CAIP2_NAMESPACE_FORMATS[namespace.toLowerCase()];
  if (typeof format === "undefined") {
    throw new Error(`Invalid or missing format for CAIP-2 namespace: ${namespace}`);
  }
  return format;
}

export function getCaip2NamespaceFormatByCode(code: number): Caip2NamespaceFormat {
  const format = Object.values(CAIP2_NAMESPACE_FORMATS).find(value => value.code === code);
  if (typeof format === "undefined") {
    throw new Error(`Invalid or missing format for code: ${code}`);
  }
  return format;
}

export function parseCaip10(caip10: CAIP10Account): CAIP10AccountParams {
  if (typeof caip10 !== "string") return caip10;
  const [namespace, reference, address] = caip10.split(":");
  const chainId = formatCaip2({ namespace, reference });
  return { chainId, address };
}

export function formatCaip10(params: CAIP10AccountParams): string {
  return `${params.chainId}:${params.address}`;
}

export function parseCaip2(caip2: CAIP2ChainId): CAIP2ChainIdParams {
  if (typeof caip2 !== "string") return caip2;
  const [namespace, reference] = caip2.split(":");
  return { namespace, reference };
}

export function formatCaip2(params: CAIP2ChainIdParams): string {
  return `${params.namespace}:${params.reference}`;
}

export function removeHexPrefix(hex: string): string {
  return hex.replace(/^0x/, "");
}

export function addHexPrefix(hex: string): string {
  return hex.startsWith("0x") ? hex : `0x${hex}`;
}

export function parseAddress(address: string, encoding: AddressEncoding): Uint8Array {
  if (encoding === "bech32") {
    const { words } = bech32.decode(address);
    return new Uint8Array(words);
  }
  if (encoding === "base16") {
    address = removeHexPrefix(address);
  }
  return u8a.fromString(address, encoding as u8a.fromString.SupportedEncodings);
}

export function formatAddress(bytes: Uint8Array, encoding: AddressEncoding): string {
  if (encoding === "bech32") {
    // FIXME: currently hardcoded to 'cosmos' prefix
    return bech32.encode("cosmos", bytes);
  }
  let address = u8a.toString(bytes, encoding);
  if (encoding === "base16") {
    address = addHexPrefix(address);
  }
  return address;
}
