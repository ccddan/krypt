import React, {
  ChangeEvent,
  ReactNode,
  useEffect,
  useState,
} from "react";

import { ethers } from "ethers";

import config from "../config";

const transactionsContract = config.blockchain.contract.transactions;

type TransactionContextProps = {
  currentAccount: any;
  isLoading: boolean;
  transactionsCount: number;
  sendTransactionPayload: {
    addressTo: string;
    amount: string;
    message: string;
    keyword: string;
  };
  connectWallet: () => Promise<void>;
  handleSendTransactionPayloadChange: (
    event: ChangeEvent<HTMLInputElement>,
    inputName: string
  ) => void;
  sendTransaction: () => Promise<boolean>;
};
const TransactionContextPropsInitialValue: TransactionContextProps = {
  currentAccount: undefined,
  isLoading: false,
  transactionsCount: 0,
  sendTransactionPayload: {
    addressTo: "",
    amount: "",
    message: "",
    keyword: "",
  },
  connectWallet: async () => {
    return;
  },
  handleSendTransactionPayloadChange: (
    event: ChangeEvent<HTMLInputElement>,
    inputName: string
  ) => {
    return;
  },
  sendTransaction: async () => {
    return false;
  },
};

const ethereum = window.ethereum;

export const TransactionContext = React.createContext(
  TransactionContextPropsInitialValue
);

const getEthContract = (): ethers.Contract => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(
    transactionsContract.addr,
    transactionsContract.abi,
    signer
  );

  return transactionContract;
};

type TransactionProviderProps = {
  children: ReactNode;
};
export const TransactionProvider = (props: TransactionProviderProps) => {
  let [currentAccount, setCurrentAccount] = useState(undefined as any);
  let [sendTransactionPayload, setSendTransactionPayload] = useState({
    addressTo: "",
    amount: "",
    message: "",
    keyword: "",
  });
  let [isLoading, setIsLoading] = useState(false);
  let [transactionsCount, setTransactionsCount] = useState(
    +(localStorage.getItem("transactionsCount") || 0)
  );

  const handleSendTransactionPayloadChange = (
    event: ChangeEvent<HTMLInputElement>,
    inputName: string
  ) =>
    setSendTransactionPayload((prev: any) => ({
      ...prev,
      [inputName]: event.target.value,
    }));

  const isWalletConnected = async () => {
    try {
      if (!ethereum) throw new Error("MetaMask wallet is not installed");

      const accounts = await ethereum.request({ method: "eth_accounts" });
      console.log("accounts:", accounts);

      if (accounts.length) {
        setCurrentAccount(accounts[0]);

        // getAllTransactions();
      } else {
        console.warn("No accounts found in connected wallet");
      }
    } catch (error) {
      console.error("accounts in connected wallet:", error);
      throw new Error("Access account in connected wallet failed");
    }
  };

  const connectWallet = async () => {
    if (!ethereum) throw new Error("MetaMask wallet is not installed");
    try {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.error("connect to wallet account:", error);
      throw new Error("Connect to wallet account operation failed");
    }
  };

  const sendTransaction = async (): Promise<boolean> => {
    try {
      if (!ethereum) throw new Error("MetaMask wallet is not installed");
      setIsLoading(true);

      let { addressTo, amount, message, keyword } = sendTransactionPayload;
      const parsedAmount = ethers.utils.parseEther(amount)._hex;

      const contract = getEthContract();
      await ethereum.request({
        method: "eth_sendTransaction",
        contract,
        params: [
          {
            from: currentAccount,
            to: addressTo,
            gas: "0x5208", // 21000 gwei
            value: parsedAmount,
          },
        ],
      });
      let tx = await contract.addToTransactions(
        addressTo,
        parsedAmount,
        message,
        keyword
      );
      console.debug("Loading -", tx.hash);

      tx.wait();
      setIsLoading(false);
      console.log("Success -", tx.hash);

      let transactionsCount = await contract.getTransactionsCount();
      setTransactionsCount(transactionsCount.toNumber());
      localStorage.setItem(
        "transactionsCount",
        `${transactionsCount.toNumber()}`
      );
    } catch (error) {
      console.error("send transaction:", error);
      setIsLoading(false);
      throw new Error("Send transaction operation failed");
    }

    return true;
  };

  useEffect(() => {
    isWalletConnected();
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        currentAccount,
        isLoading,
        transactionsCount,
        connectWallet,
        sendTransactionPayload,
        handleSendTransactionPayloadChange,
        sendTransaction,
      }}
    >
      {props.children}
    </TransactionContext.Provider>
  );
};
