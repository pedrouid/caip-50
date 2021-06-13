import u8a from 'uint8arrays';

export interface Caip2NamespaceFormats {
  [namespace: string]: {
    code: number;
    encoding: {
      chainId: u8a.fromString.SupportedEncodings;
      address: u8a.fromString.SupportedEncodings;
    };
  };
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
