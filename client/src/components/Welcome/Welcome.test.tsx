import { useState } from "react";
import "@testing-library/jest-dom";
import { cleanup, fireEvent } from "@testing-library/react";

import { render, screen } from "@project/tests/utils";
import Welcome, { createOnFormSubmitHandlerFn } from "./Welcome";
import {
  TransactionContext,
  TransactionContextPropsInitialValue,
} from "../../context/TransactionContext";

let connectWalletFn = jest.fn();
let sendTransactionFn = jest.fn();

const currentAccount = "0x1234567890";

describe("component rendering", () => {
  afterEach(() => {
    connectWalletFn.mockClear();
  });

  test("connect wallet button is rendered when no wallet is connected", () => {
    render(
      <TransactionContext.Provider
        value={{
          ...TransactionContextPropsInitialValue,
          connectWallet: connectWalletFn,
        }}
      >
        <Welcome />
      </TransactionContext.Provider>
    );

    fireEvent.click(screen.getByText("Connect Wallet"));
    expect(connectWalletFn).toHaveBeenCalledTimes(1);
  });

  test("connect wallet button is not rendered when wallet is connected", () => {
    render(
      <TransactionContext.Provider
        value={{
          ...TransactionContextPropsInitialValue,
          connectWallet: connectWalletFn,
          currentAccount,
        }}
      >
        <Welcome />
      </TransactionContext.Provider>
    );

    expect(screen.queryByText("Connect Wallet")).not.toBeInTheDocument();
  });

  test("transfer form inputs are rendered", () => {
    render(
      <TransactionContext.Provider
        value={{
          ...TransactionContextPropsInitialValue,
        }}
      >
        <Welcome />
      </TransactionContext.Provider>
    );

    expect(screen.getByPlaceholderText("Address To")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Amount (ETH)")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Keyword (dynamic Gif image)")
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Message")).toBeInTheDocument();
  });
});

describe("on submit form handler", () => {
  const mouseEvent: any = {
    preventDefault: jest.fn(),
    stopPropagation: jest.fn(),
  };

  afterEach(() => {
    sendTransactionFn.mockClear();
  });

  test("send transactioin fn is not called if 'addressTo' is empty", () => {
    let fn = createOnFormSubmitHandlerFn(sendTransactionFn, {
      addressTo: "",
      amount: "value",
      keyword: "value",
      message: "value",
    });
    fn(mouseEvent);

    expect(sendTransactionFn).not.toHaveBeenCalled();
  });

  test("send transactioin fn is not called if 'amount' is empty", () => {
    let fn = createOnFormSubmitHandlerFn(sendTransactionFn, {
      addressTo: "value",
      amount: "",
      keyword: "value",
      message: "value",
    });
    fn(mouseEvent);

    expect(sendTransactionFn).not.toHaveBeenCalled();
  });

  test("send transactioin fn is not called if 'keyword' is empty", () => {
    let fn = createOnFormSubmitHandlerFn(sendTransactionFn, {
      addressTo: "value",
      amount: "value",
      keyword: "",
      message: "value",
    });
    fn(mouseEvent);

    expect(sendTransactionFn).not.toHaveBeenCalled();
  });

  test("send transactioin fn is not called if 'message' is empty", () => {
    let fn = createOnFormSubmitHandlerFn(sendTransactionFn, {
      addressTo: "value",
      amount: "value",
      keyword: "value",
      message: "",
    });
    fn(mouseEvent);

    expect(sendTransactionFn).not.toHaveBeenCalled();
  });

  test("send transactioin fn is called if payload has not empty value", () => {
    let fn = createOnFormSubmitHandlerFn(sendTransactionFn, {
      addressTo: "value",
      amount: "value",
      keyword: "value",
      message: "value",
    });
    fn(mouseEvent);

    expect(sendTransactionFn).toHaveBeenCalledTimes(1);
  });
});
