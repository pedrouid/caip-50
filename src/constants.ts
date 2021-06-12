import { Caip2NamespaceFormats } from './types';

export const CAIP50_CODE = 0xca;
export const CAIP50_PREFIX = 'z';
export const CAIP50_ENCODING = 'base58btc';

export const CAIP2_NAMESPACE_FORMATS: Caip2NamespaceFormats = {
  bip122: {
    code: 0x00,
    encoding: { chainId: 'base16', address: 'base58btc' },
  },
  eip155: {
    code: 0x01,
    encoding: { chainId: 'number', address: 'base16' },
  },
  cosmos: {
    code: 0x02,
    encoding: { chainId: 'utf8', address: 'base58btc' },
  },
  polkadot: {
    code: 0x03,
    encoding: { chainId: 'base16', address: 'base58btc' },
  },
  filecoin: {
    code: 0x04,
    encoding: { chainId: 'utf8', address: 'base58btc' },
  },
  lip9: {
    code: 0x05,
    encoding: { chainId: 'base16', address: 'base32' },
  },
  eosio: {
    code: 0x06,
    encoding: { chainId: 'base16', address: 'utf8' },
  },
  tezos: {
    code: 0x07,
    encoding: { chainId: 'base58btc', address: 'base58btc' },
  },
};
