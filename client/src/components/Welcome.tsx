import React, {
  ChangeEvent,
  MouseEvent,
} from "react";

import { BsInfoCircle } from "react-icons/bs";
import { SiEthereum } from "react-icons/si";

import { Loader } from "./Loader";

const commonStyles =
  "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

interface FormInputProps {
  name: string;
  type: string;
  placeholder: string;
  onChangeHandler(
    event: ChangeEvent<HTMLInputElement>,
    inputName: string
  ): void;
}
const FormInput = (props: FormInputProps) => (
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

export const Welcome = () => {
  let isLoading = false;

  const connectWalletHandler = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    console.debug("Connect Wallet Handler");
  };
  const handleSubmit = (event: MouseEvent<HTMLButtonElement>) => {
    //
  };

  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
        <div className="flex flex-1 justify-start flex-col mf:mr-10 text-white">
          <h1 className="text-3xl sm:text-5xl text-gradient py-1">
            Send crypto <br />
            across the world
          </h1>
          <p className="text-left mt-10 font-light md:w-9/12 w-11/12 text-base">
            Explore the crypto world. Buy and sell crypto currencies easily with
            Krypto.
          </p>
          <button
            type="button"
            className="flex flex-row justify-center items-center my-5 bg-[#2953e3] p-3 rounded-full cursor-pointer hover:bg-[#2546db] font-semibold"
            onClick={connectWalletHandler}
          >
            Connect Wallet
          </button>

          <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
            <div className={`rounded-tl-2xl ${commonStyles}`}>Reliability</div>
            <div className={commonStyles}>Security</div>
            <div className={`rounded-tr-2xl ${commonStyles}`}>Ethereum</div>
            <div className={`rounded-bl-2xl ${commonStyles}`}>Web 3.0</div>
            <div className={commonStyles}>Low Fees</div>
            <div className={`rounded-br-2xl ${commonStyles}`}>Blockchain</div>
          </div>
        </div>

        <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
          <div className="p-3 justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card white-glassmorphism">
            <div className="flex justify-between flex-col w-full h-full">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                  <SiEthereum size={20} color="#fff" />
                </div>
                <BsInfoCircle
                  color="#fff"
                  size={20}
                  style={{ cursor: "pointer" }}
                />
              </div>
              <div>
                <p className="text-white font-light text-sm">
                  Address: <b>0x000000000000000000000</b>
                </p>
                <p className="text-white font-semibold text-lg mt-1 italic">
                  Ethereum
                </p>
              </div>
            </div>
          </div>

          <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
            <FormInput
              name="addressTo"
              placeholder="Address To"
              type="text"
              onChangeHandler={(e: any, n: string) => console.log("h")}
            />
            <FormInput
              name="amount"
              placeholder="Amount (ETH)"
              type="number"
              onChangeHandler={(e: any, n: string) => console.log("h")}
            />
            <FormInput
              name="keyword"
              placeholder="Keyword (Gif)"
              type="text"
              onChangeHandler={(e: any, n: string) => console.log("h")}
            />
            <FormInput
              name="message"
              placeholder="Message"
              type="text"
              onChangeHandler={(e: any, n: string) => console.log("h")}
            />

            <div className="h-[1px] w-full bg-gray-400 my-2" />
            {isLoading ? (
              <Loader />
            ) : (
              <button
                type="button"
                className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer hover:bg-[#2546db]"
                onClick={handleSubmit}
              >
                Send
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
