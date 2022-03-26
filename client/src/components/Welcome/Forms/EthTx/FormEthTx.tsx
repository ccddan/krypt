import { FormInput, FormInputProps } from "../FormInput";

import { Loader } from "../../../Loader";
import { MouseEvent } from "react";
import { useTransaction } from "@project/context";

export interface FormEthTxProps {
  inputs: FormInputProps[];
  submit: {
    text: string;
    handler: (event: MouseEvent<HTMLButtonElement>) => void;
  };
}

export const FormEthTx = (props: FormEthTxProps) => {
  const { isLoading } = useTransaction();

  return (
    <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
      {props.inputs.map((inputProps: FormInputProps, idx: number) => (
        <FormInput key={idx} {...inputProps} />
      ))}

      <div className="h-[1px] w-full bg-gray-400 my-2" />
      {isLoading ? (
        <Loader />
      ) : (
        <button
          type="button"
          className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer hover:bg-[#2546db]"
          onClick={props.submit.handler}
        >
          {props.submit.text}
        </button>
      )}
    </div>
  );
};

export default FormEthTx;
