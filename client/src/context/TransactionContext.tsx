import {
  ChangeEvent,
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  ethereum,
  ethersWeb3ProviderFactory,
  getContract,
} from "@project/blockchain";

import { ethers } from "ethers";

export type SendTransactionPayload = {
  addressTo: string;
  amount: string;
  message: string;
  keyword: string;
};

export type TransactionContextProps = {
  currentAccount: any;
  accountBalance: string;
  isLoading: boolean;
  transactionsCount: number;
  sendTransactionPayload: SendTransactionPayload;
  connectWallet: () => Promise<void>;
  handleSendTransactionPayloadChange: (
    event: ChangeEvent<HTMLInputElement>,
    inputName: string
  ) => void;
  sendTransaction: () => Promise<boolean>;
  getAccountBalance: (account: string) => Promise<void>;
};

export const TransactionContextPropsInitialValue: TransactionContextProps = {
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

export const TransactionContext = createContext(
  TransactionContextPropsInitialValue
);

export function useTransaction() {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error("useTransaction must be used within a TransactionProvider");
  }

  return context;
}

// Provider
export const createHandleSendTransactionPayloadChangeFn = (
  setSendTransactionPayloadFn: Dispatch<SetStateAction<SendTransactionPayload>>
) => {
  return (event: ChangeEvent<HTMLInputElement>, inputName: string) => {
    setSendTransactionPayloadFn((currentState: SendTransactionPayload) => ({
      ...currentState,
      [inputName]: event.target.value,
    }));
  };
};

export const createGetAccountBalanceFn = (
  setAccountBalanceFn: Dispatch<SetStateAction<string>>,
  provider: ethers.providers.Web3Provider
) => {
  return async (account: string) => {
    let value: string;
    console.log("Get balance for account:", account);
    try {
      const balance = await provider.getBalance(account);
      value = ethers.utils.formatEther(balance);
      setAccountBalanceFn(value);
      console.log("Account balance:", value);
    } catch (error) {
      console.error("Cannot get balance:", error);
    }
  };
};

export const createIsWalletConnectedFn = (
  setCurrentAccountFn: Dispatch<SetStateAction<string>>,
  getAccountBalanceFn: (account: string) => Promise<void>
) => {
  return async () => {
    try {
      if (!ethereum) throw new Error("MetaMask wallet is not installed");

      console.log("Fetching MetaMask connected accounts...");
      const accounts = await ethereum.request({ method: "eth_accounts" });
      console.log("Connected accounts:", accounts);

      if (accounts.length) {
        let idxAcc = 0;
        let account = accounts[idxAcc];

        console.log("Set main account:", account);
        setCurrentAccountFn(account);
        await getAccountBalanceFn(account);
      } else {
        console.warn("No accounts connected");
      }
    } catch (error) {
      console.error("accounts in connected wallet:", error);
      throw new Error("Access account in connected wallet failed");
    }
  };
};

export const createConnectWalletFn = (
  setCurrentAccountFn: Dispatch<SetStateAction<string>>,
  getAccountBalanceFn: (account: string) => Promise<void>
) => {
  return async () => {
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

        setCurrentAccountFn(account);
        await getAccountBalanceFn(account);
      } else {
        console.warn("No accounts were connected, connect again");
      }
    } catch (error) {
      console.error("connect to wallet account:", error);
      throw new Error("Connect to wallet account operation failed");
    }
  };
};

export const createSendTransactionFn = (
  currentAccount: string,
  sendTransactionPayload: SendTransactionPayload,
  setIsLoadingFn: Dispatch<SetStateAction<boolean>>,
  getAccountBalanceFn: (account: string) => Promise<void>,
  setTransactionsCountFn: Dispatch<SetStateAction<number>>,
  getContractFn: () => ethers.Contract,
  localStorage: Storage
) => {
  return async (): Promise<boolean> => {
    try {
      if (!ethereum) throw new Error("MetaMask wallet is not installed");
      setIsLoadingFn(true);

      let { addressTo, amount, message, keyword } = sendTransactionPayload;
      const parsedAmount = ethers.utils.parseEther(amount)._hex;

      const contract = getContractFn();
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
      setIsLoadingFn(false);
      console.log("Success - tx hash:", tx.hash);

      let transactionsCount = await contract.getTransactionsCount();
      setTransactionsCountFn(transactionsCount.toNumber());
      localStorage.setItem(
        "transactionsCount",
        `${transactionsCount.toNumber()}`
      );

      await getAccountBalanceFn(currentAccount);
    } catch (error) {
      console.error("send transaction:", error);
      setIsLoadingFn(false);
      throw new Error("Send transaction operation failed");
    }

    return true;
  };
};

export type TransactionProviderProps = {
  children: ReactNode;
};
export const TransactionProvider = (props: TransactionProviderProps) => {
  let [currentAccount, setCurrentAccount] = useState(
    TransactionContextPropsInitialValue.currentAccount
  );
  let [sendTransactionPayload, setSendTransactionPayload] =
    useState<SendTransactionPayload>(
      TransactionContextPropsInitialValue.sendTransactionPayload
    );
  let [isLoading, setIsLoading] = useState(
    TransactionContextPropsInitialValue.isLoading
  );
  let [transactionsCount, setTransactionsCount] = useState(
    +(
      localStorage.getItem("transactionsCount") ||
      TransactionContextPropsInitialValue.transactionsCount
    )
  );
  let [accountBalance, setAccountBalance] = useState(
    TransactionContextPropsInitialValue.accountBalance
  );

  const handleSendTransactionPayloadChange =
    createHandleSendTransactionPayloadChangeFn(setSendTransactionPayload);

  const provider = ethersWeb3ProviderFactory(ethereum);
  const getAccountBalance = createGetAccountBalanceFn(
    setAccountBalance,
    provider
  );

  const isWalletConnected = createIsWalletConnectedFn(
    setCurrentAccount,
    getAccountBalance
  );

  const connectWallet = createConnectWalletFn(
    setCurrentAccount,
    getAccountBalance
  );

  const sendTransaction = createSendTransactionFn(
    currentAccount,
    sendTransactionPayload,
    setIsLoading,
    getAccountBalance,
    setTransactionsCount,
    getContract,
    localStorage
  );

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
