import "mocha";
import { expect } from "chai";

import * as caip50 from "../src";

import {
  BIP122_CAIP10_ACCOUNT,
  BIP122_CAIP50_ACCOUNT,
  EIP155_CAIP10_ACCOUNT,
  EIP155_CAIP50_ACCOUNT,
  COSMOS_CAIP10_ACCOUNT,
  COSMOS_CAIP50_ACCOUNT,
  POLKADOT_CAIP10_ACCOUNT,
  POLKADOT_CAIP50_ACCOUNT,
} from "./shared";

describe("ENCODE", () => {
  it("BIP122", () => {
    const result = caip50.encode(BIP122_CAIP10_ACCOUNT);
    expect(result).to.eql(BIP122_CAIP50_ACCOUNT);
  });
  it("EIP155", () => {
    const result = caip50.encode(EIP155_CAIP10_ACCOUNT);
    expect(result).to.eql(EIP155_CAIP50_ACCOUNT);
  });
  it("COSMOS", () => {
    const result = caip50.encode(COSMOS_CAIP10_ACCOUNT);
    expect(result).to.eql(COSMOS_CAIP50_ACCOUNT);
  });
  it("POLKADOT", () => {
    const result = caip50.encode(POLKADOT_CAIP10_ACCOUNT);
    expect(result).to.eql(POLKADOT_CAIP50_ACCOUNT);
  });
});
