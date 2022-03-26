import { useState } from "react";
import "@testing-library/jest-dom";
import { cleanup, fireEvent } from "@testing-library/react";

import { render, screen } from "@project/tests/utils";
import FormEthTx, { FormEthTxProps } from "./FormEthTx";
import {
  TransactionContext,
  TransactionContextPropsInitialValue,
} from "../../../../context/TransactionContext";

let onChangeHandlerFn = jest.fn();
let onSubmitHandlerFn = jest.fn();

describe("dynamic form inputs are rendered", () => {
  let props: FormEthTxProps = {
    inputs: [],
    submit: {
      text: "Submit Form",
      handler: onSubmitHandlerFn,
    },
  };

  afterEach(() => {
    cleanup();
  });

  afterAll(() => {
    onChangeHandlerFn.mockClear();
    onSubmitHandlerFn.mockClear();
  });

  test("zero form inputs", () => {
    render(<FormEthTx {...props} />);
    let inputs = screen.queryAllByRole("textbox");

    expect(inputs.length).toEqual(0);
  });

  test("2 form inputs", () => {
    props.inputs.push(
      {
        name: "testField1",
        type: "text",
        placeholder: "field 1 placeholder",
        onChangeHandler: onChangeHandlerFn,
      },
      {
        name: "testField2",
        type: "text",
        placeholder: "field 2 placeholder",
        onChangeHandler: onChangeHandlerFn,
      }
    );

    render(<FormEthTx {...props} />);
    let inputs = screen.getAllByRole("textbox");

    expect(inputs.length).toEqual(2);
  });
});

describe("submit form button", () => {
  let props: FormEthTxProps = {
    inputs: [],
    submit: {
      text: "Submit Form",
      handler: onSubmitHandlerFn,
    },
  };

  beforeEach(() => {
    render(<FormEthTx {...props} />);
  });

  afterAll(() => {
    onChangeHandlerFn.mockClear();
    onSubmitHandlerFn.mockClear();
  });

  test("dynamic button text", () => {
    let submitBtn = screen.getByRole("button");
    expect(submitBtn).toBeInTheDocument();
    expect(submitBtn.textContent).toEqual(props.submit.text);
  });

  test("button submits form on click", () => {
    fireEvent.click(screen.getByRole("button"));
    expect(onSubmitHandlerFn).toHaveBeenCalledTimes(1);
  });
});

describe("when loader is displayed", () => {
  test("submit button is not rendered", () => {
    let props: FormEthTxProps = {
      inputs: [],
      submit: {
        text: "Submit Form",
        handler: onSubmitHandlerFn,
      },
    };
    let { container } = render(
      <TransactionContext.Provider
        value={{ ...TransactionContextPropsInitialValue, isLoading: true }}
      >
        <FormEthTx {...props} />
      </TransactionContext.Provider>
    );

    let loader = container.getElementsByClassName("animate-spin");
    expect(loader.length).toEqual(1);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
