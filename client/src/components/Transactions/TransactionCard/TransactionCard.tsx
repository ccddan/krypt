export type TransactionCardProps = {
  id: string;
  url: string;
  message: string;
  timestamp: string;
  addressFrom: string;
  amount: string;
  addressTo: string;
};

export const TransactionCard = (props: TransactionCardProps) => {
  return (
    <div className="bg-[#181918] m-4 flex flex-1 2xl:min-w-[450px] 2xl:max-w-[500px] sm:min-w-[270px] sm:max-w-[300px] flex-col p-3 rounded-md hover:shadow-2xl">
      <div className="flex flex-col items-center w-full mt-3 ">
        <div className="display-flex justify-start w-full mb-6 p-2">
          From:{" "}
          <a
            href={`https://rinkeby.etherscan.io/address/${props.addressFrom}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="text-base text-ellipsis truncate hover:text-[#2953e3]">
              {props.addressFrom}
            </p>
          </a>
          To:{" "}
          <a
            href={`https://rinkeby.etherscan.io/address/${props.addressTo}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="text-base text-ellipsis truncate hover:text-[#2953e3]">
              {props.addressTo}
            </p>
          </a>
          <p className="text-base">Amount: {props.amount} ETH</p>
          <br />
          <p className="text-base">Message: {props.message}</p>
        </div>
        <div className="bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl">
          <p className="text-[#37c7da]">{props.timestamp}</p>
        </div>
      </div>
    </div>
  );
};

export default TransactionCard;
