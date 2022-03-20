const Web3ProviderSignerInstance = jest.fn();
const Web3ProviderGetSignerFn = jest.fn(() => Web3ProviderSignerInstance);
const Web3ProviderInstance = jest.fn((ethereum: any) => ({
  getSigner: Web3ProviderGetSignerFn,
}));
const JsonRpcSignerInstance = jest.fn();
const ContractInstance = jest.fn();

jest.mock("ethers", () => {
  return {
    ethers: {
      providers: {
        Web3Provider: Web3ProviderInstance,
        JsonRpcSigner: JsonRpcSignerInstance,
      },
      Contract: ContractInstance,
    },
  };
})

import {ethers} from "ethers";
import config from "@project/config";
import { ethereum, ethersWeb3ProviderFactory, ethersGetContract, getContract } from "./helpers";

describe("ethersWeb3ProviderFactory", () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it("returns provider instance", () => {
    ethersWeb3ProviderFactory(ethereum);

    // provider
    expect(Web3ProviderInstance.mock.instances.length).toEqual(1);
    expect(Web3ProviderInstance).toHaveBeenCalledTimes(1);
    expect(Web3ProviderInstance).toHaveBeenCalledWith(ethereum);
  });
});

describe("ethersGetContract", () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it("returns contract instance", () => {
    let params = {
      address: "random-addr",
      abi: { a: true, b: false},
      signer: JsonRpcSignerInstance,
    };

    ethersGetContract(params.address, params.abi, (params.signer) as any);

    // contract
    expect(ContractInstance.mock.instances.length).toEqual(1);
    expect(ContractInstance).toHaveBeenCalledTimes(1);
    expect(ContractInstance).toHaveBeenCalledWith(params.address, params.abi, params.signer);
  });
});

describe("getContract", () => {
  it("returns contract", () => {
    getContract();

    // provider
    expect(Web3ProviderInstance.mock.instances.length).toEqual(1);
    expect(Web3ProviderInstance).toHaveBeenCalledTimes(1);
    expect(Web3ProviderInstance).toHaveBeenCalledWith(ethereum);

    // signer
    expect(Web3ProviderGetSignerFn).toBeCalled();

    // contract
    expect(ContractInstance.mock.instances.length).toEqual(1);
    expect(ContractInstance.mock.instances.length).toEqual(1);
    expect(ContractInstance).toHaveBeenCalledTimes(1);
    expect(ContractInstance).toHaveBeenCalledWith(
      config.blockchain.contract.transactions.addr,
      config.blockchain.contract.transactions.abi,
      Web3ProviderSignerInstance,
    );

  });
});
