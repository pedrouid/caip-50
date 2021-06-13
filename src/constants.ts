import { Caip2NamespaceFormats } from "./types";

export const CAIP50_CODE = 0xca;
export const CAIP50_PREFIX = "z";
export const CAIP50_ENCODING = "base58btc";

export const CAIP2_NAMESPACE_FORMATS: Caip2NamespaceFormats = {
  bip122: {
    code: 0x00,
    namespace: "bip122",
    encoding: {
      chainId: "base16",
      address: "base58btc",
    },
  },
  eip155: {
    code: 0x01,
    namespace: "eip155",
    encoding: {
      chainId: "base10",
      address: "base16",
    },
  },
  cosmos: {
    code: 0x02,
    namespace: "cosmos",
    encoding: {
      chainId: "utf8",
      address: "bech32",
    },
  },
  polkadot: {
    code: 0x03,
    namespace: "polkadot",
    encoding: {
      chainId: "base16",
      address: "base58btc",
    },
  },
  filecoin: {
    code: 0x04,
    namespace: "filecoin",
    encoding: {
      chainId: "utf8",
      address: "base58btc",
    },
  },
  lip9: {
    code: 0x05,
    namespace: "lip9",
    encoding: {
      chainId: "base16",
      address: "base32",
    },
  },
  eosio: {
    code: 0x06,
    namespace: "eosio",
    encoding: {
      chainId: "base16",
      address: "utf8",
    },
  },
  tezos: {
    code: 0x07,
    namespace: "tezos",
    encoding: {
      chainId: "base58btc",
      address: "base58btc",
    },
  },
};
