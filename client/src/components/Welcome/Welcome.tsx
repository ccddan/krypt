import { MouseEvent } from "react";

import { useTransaction } from "../Transactions";
import { CryptoCard } from "./CryptoCard";
import { FormEthTx, FormEthTxProps } from "./Forms";

const commonStyles =
  "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

export const Welcome = () => {
  const {
    currentAccount,
    accountBalance,
    connectWallet,
    sendTransactionPayload,
    handleSendTransactionPayloadChange,
    sendTransaction,
  } = useTransaction();

  const connectWalletHandler = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    console.debug("Connect Wallet Handler");
    await connectWallet();
  };
  const handleSubmit = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    console.log("transaction payload:", sendTransactionPayload);
    let { addressTo, amount, message, keyword } = sendTransactionPayload;
    if (!addressTo || !amount || !message || !keyword) return;
    sendTransaction();
  };

  /*
  <FormInput
    name="keyword"
    placeholder="Keyword (Gif)"
    type="text"
    onChangeHandler={handleSendTransactionPayloadChange}
  />
  <FormInput
    name="message"
    placeholder="Message"
    type="text"
    onChangeHandler={handleSendTransactionPayloadChange}
  />
  */

  let formProps: FormEthTxProps = {
    inputs: [
      {
        name: "addressTo",
        placeholder: "Address To",
        type: "text",
        onChangeHandler: handleSendTransactionPayloadChange,
      },
      {
        name: "amount",
        placeholder: "Amount (ETH)",
        type: "number",
        onChangeHandler: handleSendTransactionPayloadChange,
      },
      {
        name: "keyword",
        placeholder: "Keyword (dynamic Gif image)",
        type: "text",
        onChangeHandler: handleSendTransactionPayloadChange,
      },
      {
        name: "message",
        placeholder: "Message",
        type: "text",
        onChangeHandler: handleSendTransactionPayloadChange,
      },
    ],
    submit: {
      text: "Send",
      handler: handleSubmit,
    },
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
          {!currentAccount && (
            <button
              type="button"
              className="flex flex-row justify-center items-center my-5 bg-[#2953e3] p-3 rounded-full cursor-pointer hover:bg-[#2546db] font-semibold"
              onClick={connectWalletHandler}
            >
              Connect Wallet
            </button>
          )}

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
          <CryptoCard account={currentAccount} balance={accountBalance} />

          <FormEthTx {...formProps} />
        </div>
      </div>
    </div>
  );
};

export default Welcome;
