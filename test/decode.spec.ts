import "mocha";
import { expect } from "chai";

import * as caip50 from "../src";

import {
  BIP122_CAIP10_PARAMS,
  BIP122_CAIP50_ACCOUNT,
  EIP155_CAIP10_PARAMS,
  EIP155_CAIP50_ACCOUNT,
  COSMOS_CAIP10_PARAMS,
  COSMOS_CAIP50_ACCOUNT,
  POLKADOT_CAIP10_PARAMS,
  POLKADOT_CAIP50_ACCOUNT,
} from "./shared";

describe("DECODE", () => {
  it("BIP122", () => {
    const result = caip50.decode(BIP122_CAIP50_ACCOUNT);
    expect(result).to.eql(BIP122_CAIP10_PARAMS);
  });
  it("EIP155", () => {
    const result = caip50.decode(EIP155_CAIP50_ACCOUNT);
    expect(result).to.eql(EIP155_CAIP10_PARAMS);
  });
  it("COSMOS", () => {
    const result = caip50.decode(COSMOS_CAIP50_ACCOUNT);
    expect(result).to.eql(COSMOS_CAIP10_PARAMS);
  });
  it("POLKADOT", () => {
    const result = caip50.decode(POLKADOT_CAIP50_ACCOUNT);
    expect(result).to.eql(POLKADOT_CAIP10_PARAMS);
  });
});
