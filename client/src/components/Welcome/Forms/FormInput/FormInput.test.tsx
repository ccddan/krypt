import "@testing-library/jest-dom";

import FormInput, { FormInputProps } from "./FormInput";
import { render, screen } from "@project/tests/utils";

import { fireEvent } from "@testing-library/react";

describe("form input component", () => {
  test("dynamic attrs values and onchange handler", () => {
    let onChangeHandlerFn = jest.fn();

    let props: FormInputProps = {
      name: "testUsername",
      type: "text",
      placeholder: "reference",
      onChangeHandler: onChangeHandlerFn,
    };

    render(<FormInput {...props} />);
    let input = screen.getByRole("textbox");

    expect(input.getAttribute("name")).toEqual(props.name);
    expect(input.getAttribute("type")).toEqual(props.type);
    expect(input.getAttribute("placeholder")).toEqual(props.placeholder);

    fireEvent.change(input, { target: { value: "some-input-value" } });
    expect(onChangeHandlerFn.mock.calls.length).toEqual(1);
    expect(onChangeHandlerFn.mock.calls[0][0]).not.toBeUndefined();
    expect(onChangeHandlerFn.mock.calls[0][1]).toEqual(props.name);
  });
});
