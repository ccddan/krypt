import "@testing-library/jest-dom";

import {
  SendTransactionPayload,
  createConnectWalletFn,
  createGetAccountBalanceFn,
  createHandleSendTransactionPayloadChangeFn,
  createIsWalletConnectedFn,
  createSendTransactionFn,
} from "@project/context";

import { renderHook } from "@testing-library/react-hooks";
import { useTransaction } from "./TransactionContext";

describe("useTransaction", () => {
  test("transaction context instance is created", () => {
    expect(() => renderHook(() => useTransaction())).not.toThrow();
  });
});

describe("createHandleSendTransactionPayloadChangeFn", () => {
  test("transaction payload is updated", () => {
    let setSendTransactionPayloadFn = jest.fn();
    let fn = createHandleSendTransactionPayloadChangeFn(
      setSendTransactionPayloadFn
    );
    fn({ target: { value: "new value" } } as any, "propertyName");

    expect(setSendTransactionPayloadFn).toHaveBeenCalledTimes(1);
    let updatePayalod = setSendTransactionPayloadFn.mock.calls[0][0]();

    expect(updatePayalod).toEqual({ propertyName: "new value" });
  });
});

describe("createGetAccountBalanceFn", () => {
  test("account balance is returned (parsed)", async () => {
    let account = "0x1234567890";
    let balance = {
      [account]: "770000000000000000",
    };
    let parsedBalance = "0.77";
    let setAccountBalanceFn = jest.fn();
    let provider = {
      getBalance: jest.fn((account: string) => balance[account]),
    };

    let fn = createGetAccountBalanceFn(setAccountBalanceFn, provider as any);
    await fn(account);

    expect(provider.getBalance.mock.calls[0][0]).toEqual(account);
    expect(setAccountBalanceFn).toHaveBeenCalledTimes(1);

    let accountBalance = setAccountBalanceFn.mock.calls[0][0];

    expect(accountBalance).toEqual(parsedBalance);
  });

  test("catch internal execution errors", async () => {
    let account = "";
    let setAccountBalanceFn = jest.fn();
    let provider = {
      getBalance: jest.fn((account: string) => {
        throw new Error("something wrong");
      }),
    };

    let fn = createGetAccountBalanceFn(setAccountBalanceFn, provider as any);
    try {
      await fn(account);
    } catch (error) {
      expect(`${error}`).toEqual("Error: Cannot get/set account balance");
    }
  });
});

describe("createIsWalletConnectedFn", () => {
  test("require MetaMask", async () => {
    let setCurrentAccountFn = jest.fn((account: string) => {});
    let getAccountBalanceFn = jest.fn((account: string) => "");

    let fn = createIsWalletConnectedFn(
      undefined,
      setCurrentAccountFn as any,
      getAccountBalanceFn as any
    );

    try {
      await fn();
    } catch (error) {
      expect(`${error}`).toEqual("Error: MetaMask wallet is not installed");
    }
  });

  test("skip when no account is connected", async () => {
    let setCurrentAccountFn = jest.fn((account: string) => {});
    let getAccountBalanceFn = jest.fn((account: string) => "");
    let ethereum = {
      request: async (params: any) => [],
    };

    let fn = createIsWalletConnectedFn(
      ethereum,
      setCurrentAccountFn as any,
      getAccountBalanceFn as any
    );
    await fn();

    expect(setCurrentAccountFn).not.toHaveBeenCalled();
    expect(getAccountBalanceFn).not.toHaveBeenCalled();
  });

  test("access connected account/balance", async () => {
    let account = "0x1234567890";
    let balance = "77.7";
    let setCurrentAccountFn = jest.fn((account: string) => {});
    let getAccountBalanceFn = jest.fn((account: string) => balance);
    let ethereum = {
      request: async (params: any) => [account],
    };

    let fn = createIsWalletConnectedFn(
      ethereum,
      setCurrentAccountFn as any,
      getAccountBalanceFn as any
    );
    await fn();

    expect(setCurrentAccountFn.mock.calls[0][0]).toEqual(account);

    let accountBalance = getAccountBalanceFn.mock.calls[0][0];
    expect(accountBalance).toEqual(account);
  });

  test("catch any internal execution error", async () => {
    let setCurrentAccountFn = jest.fn((account: string) => {});
    let getAccountBalanceFn = jest.fn((account: string) => "");
    let ethereum = {
      request: async (params: any) => {
        throw new Error("execution error");
      },
    };

    let fn = createIsWalletConnectedFn(
      ethereum,
      setCurrentAccountFn as any,
      getAccountBalanceFn as any
    );

    try {
      await fn();
    } catch (error) {
      expect(`${error}`).toEqual(
        "Error: Access account in connected wallet failed"
      );
    }
  });
});

describe("createConnectWalletFn", () => {
  test("require MetaMask", async () => {
    let setCurrentAccountFn = jest.fn((account: string) => {});
    let getAccountBalanceFn = jest.fn((account: string) => "");

    let fn = createConnectWalletFn(
      undefined,
      setCurrentAccountFn as any,
      getAccountBalanceFn as any
    );

    try {
      await fn();
    } catch (error) {
      expect(`${error}`).toEqual("Error: MetaMask wallet is not installed");
    }
  });

  test("skip when no account is connecected", async () => {
    let setCurrentAccountFn = jest.fn((account: string) => {});
    let getAccountBalanceFn = jest.fn((account: string) => "");
    let ethereum = {
      request: async (params: any) => [],
    };

    let fn = createConnectWalletFn(
      ethereum,
      setCurrentAccountFn as any,
      getAccountBalanceFn as any
    );
    await fn();

    expect(setCurrentAccountFn).not.toHaveBeenCalled();
    expect(getAccountBalanceFn).not.toHaveBeenCalled();
  });

  test("access connected account/balance", async () => {
    let account = "0x1234567890";
    let balance = "77.7";
    let setCurrentAccountFn = jest.fn((account: string) => {});
    let getAccountBalanceFn = jest.fn((account: string) => balance);
    let ethereum = {
      request: async (params: any) => [account],
    };

    let fn = createConnectWalletFn(
      ethereum,
      setCurrentAccountFn as any,
      getAccountBalanceFn as any
    );
    await fn();

    expect(setCurrentAccountFn.mock.calls[0][0]).toEqual(account);

    let accountBalance = getAccountBalanceFn.mock.calls[0][0];
    expect(accountBalance).toEqual(account);
  });

  test("catch any internal execution error", async () => {
    let setCurrentAccountFn = jest.fn((account: string) => {});
    let getAccountBalanceFn = jest.fn((account: string) => "");
    let ethereum = {
      request: async (params: any) => {
        throw new Error("execution error");
      },
    };

    let fn = createConnectWalletFn(
      ethereum,
      setCurrentAccountFn as any,
      getAccountBalanceFn as any
    );

    try {
      await fn();
    } catch (error) {
      expect(`${error}`).toEqual(
        "Error: Connect to wallet account operation failed"
      );
    }
  });
});

describe("createSendTransactionFn", () => {
  test("require MetaMask", async () => {
    let getAccountBalanceFn = jest.fn((account: string) => "");
    let setIsLoadingFn = jest.fn((account: string) => {});
    let setTransactionsCountFn = jest.fn((account: string) => {});
    let awaitFn = jest.fn();
    let addToTransactionsFn = jest.fn(async () => ({
      hash: "",
      await: awaitFn,
    }));

    let params = {
      currentAccount: "",
      sendTransactionPayload: {
        addressTo: "",
        amount: "",
        message: "",
        keyword: "",
      },
      setIsLoadingFn,
      getAccountBalanceFn,
      setTransactionsCountFn,
      getContractFn: () => ({ addToTransactions: addToTransactionsFn }),
      localStorage: { setItem: jest.fn() },
    };

    let fn = createSendTransactionFn(
      undefined,
      params.currentAccount,
      params.sendTransactionPayload,
      params.setIsLoadingFn as any,
      params.getAccountBalanceFn as any,
      params.setTransactionsCountFn as any,
      params.getContractFn as any,
      params.localStorage as any
    );

    try {
      await fn();
    } catch (error) {
      expect(`${error}`).toEqual("Error: MetaMask wallet is not installed");
    }
  });

  test("transaction is sent", async () => {
    expect("TODO").toEqual("WIP");
  });

  test("catch any internal execution error", async () => {
    let getAccountBalanceFn = jest.fn((account: string) => "");
    let setIsLoadingFn = jest.fn((account: string) => {});
    let setTransactionsCountFn = jest.fn((account: string) => {});
    let awaitFn = jest.fn();
    let addToTransactionsFn = jest.fn(async () => ({
      hash: "",
      await: awaitFn,
    }));

    let params = {
      ethereum: {},
      currentAccount: "",
      sendTransactionPayload: {
        addressTo: "",
        amount: "",
        message: "",
        keyword: "",
      },
      setIsLoadingFn,
      getAccountBalanceFn,
      setTransactionsCountFn,
      getContractFn: () => {
        throw new Error("something worng");
      },
      localStorage: { setItem: jest.fn() },
    };

    let fn = createSendTransactionFn(
      params.ethereum,
      params.currentAccount,
      params.sendTransactionPayload,
      params.setIsLoadingFn as any,
      params.getAccountBalanceFn as any,
      params.setTransactionsCountFn as any,
      params.getContractFn as any,
      params.localStorage as any
    );

    try {
      await fn();
    } catch (error) {
      expect(`${error}`).toEqual("Error: Send transaction operation failed");
    }
  });
});
