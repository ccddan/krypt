import React, { ChangeEvent } from "react";

export interface FormInputProps {
  name: string;
  type: string;
  placeholder: string;
  onChangeHandler(
    event: ChangeEvent<HTMLInputElement>,
    inputName: string
  ): void;
}
export const FormInput = (props: FormInputProps) => (
  <input
    name={props.name}
    type={props.type}
    placeholder={props.placeholder}
    step="0.001"
    onChange={(e: ChangeEvent<HTMLInputElement>) =>
      props.onChangeHandler(e, props.name)
    }
    className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
  />
);

export default FormInput;
