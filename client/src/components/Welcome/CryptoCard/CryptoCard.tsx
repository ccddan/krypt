import { BsInfoCircle } from "react-icons/bs";
import { SiEthereum } from "react-icons/si";

export interface CryptoCardProps {
  account: string;
  balance: string;
};

export const CryptoCard = (props: CryptoCardProps) => {
  return (
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
          <p className="text-white font-light text-sm w-full text-ellipsis truncate">
            Address:
            <br />
            <b>
              {props.account
                ? props.account
                : "0x000000000000000000000"}
            </b>
          </p>
          <p className="text-white text-lg mt-1 italic">
            Eth: <span>{props.balance ? props.balance : "N/A"}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CryptoCard;
