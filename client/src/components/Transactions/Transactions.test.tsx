import "@testing-library/jest-dom";

import {
  TransactionContext,
  TransactionContextPropsInitialValue,
} from "@project/context";
import { render, screen } from "@project/tests/utils";

import Transactions from "./Transactions";

describe("render component", () => {
  test("ask user to connect wallet when no wallet is connected", () => {
    render(
      <TransactionContext.Provider
        value={{ ...TransactionContextPropsInitialValue }}
      >
        <Transactions />
      </TransactionContext.Provider>
    );

    expect(screen.getByText("Connect wallet first")).toBeInTheDocument();
  });

  test("list account transactions for connected wallet", () => {
    render(
      <TransactionContext.Provider
        value={{
          ...TransactionContextPropsInitialValue,
          currentAccount: "0x1234567890",
        }}
      >
        <Transactions />
      </TransactionContext.Provider>
    );

    expect(screen.queryByText("Connect wallet first")).not.toBeInTheDocument();
    expect(screen.queryAllByText(/From:/i).length).toEqual(6); // 6 is the number of dummy records in Transactions.tsx
  });
});
