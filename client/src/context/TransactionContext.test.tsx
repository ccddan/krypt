import "@testing-library/jest-dom";

import {
  TransactionContext,
  TransactionContextPropsInitialValue,
} from "@project/context";
import { render, screen } from "@project/tests/utils";

import { renderHook } from "@testing-library/react-hooks";
import { useTransaction } from "./TransactionContext";

describe("useTransaction", () => {
  test("transaction context instance is created", () => {
    expect(() => renderHook(() => useTransaction())).not.toThrow();
  });
});
