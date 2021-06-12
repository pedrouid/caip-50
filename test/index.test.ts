import * as caip50 from '../src';

const BIP122_NAMESPACE = 'bip122';
const BIP122_REFERENCE = '000000000019d6689c085ae165831e93';
const BIP122_CHAIN_ID = `${BIP122_NAMESPACE}:${BIP122_REFERENCE}`;
const BIP122_ADDRESS = `128Lkh3S7CkDTBZ8W7BbpsN3YYizJMp8p6`;
const BIP122_CAIP10_ACCOUNT = `${BIP122_ADDRESS}@${BIP122_CHAIN_ID}`;
const BIP122_CAIP50_ACCOUNT =
  'z2gNan4mLV1vvkzpmEi2kzHR8wUyFd5SpsuLcFDGbbyXTxbR8HL5hmqf7DhCEx5Lwt';

const EIP155_NAMESPACE = 'eip155';
const EIP155_REFERENCE = 1;
const EIP155_CHAIN_ID = `${EIP155_NAMESPACE}:${EIP155_REFERENCE}`;
const EIP155_ADDRESS = `0xde30da39c46104798bb5aa3fe8b9e0e1f348163f`;
const EIP155_CAIP10_ACCOUNT = `${EIP155_ADDRESS}@${EIP155_CHAIN_ID}`;
const EIP155_CAIP50_ACCOUNT = 'zUJWDxUnc8pZCfUtVKcAsRgxijaVqHyuMgeKKF';

describe('CAIP-50', () => {
  it('BIP122', () => {
    const result = caip50.encode(BIP122_CAIP10_ACCOUNT);
    expect(result).toEqual(BIP122_CAIP50_ACCOUNT);
  });
  it('EIP155', () => {
    const result = caip50.encode(EIP155_CAIP10_ACCOUNT);
    expect(result).toEqual(EIP155_CAIP50_ACCOUNT);
  });
});
