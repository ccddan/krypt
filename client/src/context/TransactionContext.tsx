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
  accountBalance: string;
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
  getAccountBalance: (account: string) => Promise<void>;
};
const TransactionContextPropsInitialValue: TransactionContextProps = {
  currentAccount: undefined,
  accountBalance: "0.000",
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
  getAccountBalance: async (account: string) => {},
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
  let [accountBalance, setAccountBalance] = useState("0.000");

  const handleSendTransactionPayloadChange = (
    event: ChangeEvent<HTMLInputElement>,
    inputName: string
  ) =>
    setSendTransactionPayload((prev: any) => ({
      ...prev,
      [inputName]: event.target.value,
    }));

  const getAccountBalance = async (account: string) => {
    let value: string;
    console.log("Get balance for account:", account);
    try {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const balance = await provider.getBalance(account);
      value = ethers.utils.formatEther(balance);
      setAccountBalance(value);
      console.log("Account balance:", value);
    } catch (error) {
      console.error("Cannot get balance:", error);
    }
  };

  const isWalletConnected = async () => {
    try {
      if (!ethereum) throw new Error("MetaMask wallet is not installed");

      console.log("Fetching MetaMask connected accounts...");
      const accounts = await ethereum.request({ method: "eth_accounts" });
      console.log("Connected accounts:", accounts);

      if (accounts.length) {
        let idxAcc = 0;
        let account = accounts[idxAcc];

        console.log("Set main account:", account);
        setCurrentAccount(account);
        await getAccountBalance(account);

        // getAllTransactions();
      } else {
        console.warn("No accounts connected");
      }
    } catch (error) {
      console.error("accounts in connected wallet:", error);
      throw new Error("Access account in connected wallet failed");
    }
  };

  const connectWallet = async () => {
    if (!ethereum) throw new Error("MetaMask wallet is not installed");
    try {
      console.log("Connecting MetaMask account(s)...");
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Connected MetaMask accounts:", accounts);

      if (accounts.length) {
        let idxAcc = 0;
        let account = accounts[idxAcc];
        console.log("Set main account:", account);

        setCurrentAccount(account);
        await getAccountBalance(account);
      } else {
        console.warn("No accounts were connected, connect again");
      }
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
      console.log("Loading - tx hash:", tx.hash);

      tx.wait();
      setIsLoading(false);
      console.log("Success - tx hash:", tx.hash);

      let transactionsCount = await contract.getTransactionsCount();
      setTransactionsCount(transactionsCount.toNumber());
      localStorage.setItem(
        "transactionsCount",
        `${transactionsCount.toNumber()}`
      );

      await getAccountBalance(currentAccount);
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
        accountBalance,
        isLoading,
        transactionsCount,
        connectWallet,
        sendTransactionPayload,
        handleSendTransactionPayloadChange,
        sendTransaction,
        getAccountBalance,
      }}
    >
      {props.children}
    </TransactionContext.Provider>
  );
};
