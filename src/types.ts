import u8a from "uint8arrays";

export type Encoding = u8a.fromString.SupportedEncodings;
export type AddressEncoding = Encoding | "bech32";

export interface Caip2NamespaceEncoding {
  chainId: Encoding;
  address: AddressEncoding;
}

export interface Caip2NamespaceFormat {
  code: number;
  namespace: string;
  encoding: Caip2NamespaceEncoding;
}
export interface Caip2NamespaceFormats {
  [namespace: string]: Caip2NamespaceFormat;
}

export interface CAIP2ChainIdParams {
  namespace: string;
  reference: string;
}

export type CAIP2ChainId = string | CAIP2ChainIdParams;

export interface CAIP10AccountParams {
  chainId: string;
  address: string;
}

export type CAIP10Account = string | CAIP10AccountParams;

export type CAIP50Account = string;

export type CAIP50AccountParams = {
  code: number;
  namespaceCode: number;
  chainIdBytes: Uint8Array;
  addressBytes: Uint8Array;
};
