import { ethers } from "ethers";

import config from "@project/config";

export const ethereum = window.ethereum;

export const ethersWeb3ProviderFactory = (ethereum: any) => new ethers.providers.Web3Provider(ethereum);

export const ethersGetContract = (address: string, abi: any, signer: ethers.providers.JsonRpcSigner) => new ethers.Contract(address, abi, signer)

export const getContract = (): ethers.Contract => {
  const provider = ethersWeb3ProviderFactory(ethereum);
  const signer = provider.getSigner();
  const contract = ethersGetContract(
    config.blockchain.contract.transactions.addr,
    config.blockchain.contract.transactions.abi,
    signer
  );

  return contract;
};
