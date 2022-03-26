import { useTransaction } from "./context/TransactionContext";
import TransactionCard from "./TransactionCard/TransactionCard";

const data = [
  {
    id: 1,
    url: "https://metro.co.uk/wp-content/uploads/2015/05/pokemon_crying.gif?quality=90&strip=all&zoom=1&resize=500%2C284",
    message: "",
    timestamp: "12/21/2021, 4:33:21 PM",
    addressFrom: "0xCF8e569A97C423952DdFf902375C7C76549A6A90",
    amount: "0.01",
    addressTo: "0x8aa395Ab97837576aF9cd6946C79024ef1acfdbE",
  },
  {
    id: 2,
    url: "https://media4.popsugar-assets.com/files/2013/11/07/832/n/1922398/eb7a69a76543358d_28.gif",
    message: "",
    timestamp: "12/21/2021, 4:33:21 PM",
    addressFrom: "0xCF8e569A97C423952DdFf902375C7C76549A6A90",
    amount: "0.01",
    addressTo: "0x8aa395Ab97837576aF9cd6946C79024ef1acfdbE",
  },
  {
    id: 3,
    url: "https://acegif.com/wp-content/uploads/gif-shaking-head-38.gif",
    message: "",
    timestamp: "12/21/2021, 4:33:21 PM",
    addressFrom: "0xCF8e569A97C423952DdFf902375C7C76549A6A90",
    amount: "0.01",
    addressTo: "0x8aa395Ab97837576aF9cd6946C79024ef1acfdbE",
  },
  {
    id: 4,
    url: "https://i.pinimg.com/originals/68/a0/9e/68a09e774e98242871c2db0f99307420.gif",
    message: "",
    timestamp: "12/21/2021, 4:33:21 PM",
    addressFrom: "0xCF8e569A97C423952DdFf902375C7C76549A6A90",
    amount: "0.01",
    addressTo: "0x8aa395Ab97837576aF9cd6946C79024ef1acfdbE",
  },
  {
    id: 5,
    url: "https://i.pinimg.com/originals/73/d3/a1/73d3a14d212314ab1f7268b71d639c15.gif",
    message: "",
    timestamp: "12/21/2021, 4:33:21 PM",
    addressFrom: "0xCF8e569A97C423952DdFf902375C7C76549A6A90",
    amount: "0.01",
    addressTo: "0x8aa395Ab97837576aF9cd6946C79024ef1acfdbE",
  },
  {
    id: 6,
    url: "https://www.omnisend.com/blog/wp-content/uploads/2016/09/funny-gifs-9.gif",
    message: "",
    timestamp: "12/21/2021, 4:33:21 PM",
    addressFrom: "0xCF8e569A97C423952DdFf902375C7C76549A6A90",
    amount: "0.01",
    addressTo: "0x8aa395Ab97837576aF9cd6946C79024ef1acfdbE",
  },
];

export const Transactions = () => {
  const { currentAccount } = useTransaction();

  return (
    <div className="flex flex-col w-full justify-center items-center 2xl:px-20 gradient-bg-transactions text-white">
      <div className="flex flex-col md:pt-12 pt-12 px-4">
        <h3 className="text-3xl text-center my-2">Latest Transactions</h3>
      </div>
      <div className="flex flex-col">
        {!currentAccount ? (
          <p>
            <i>Connect wallet first</i>
          </p>
        ) : (
          <div className="flex flex-wrap justify-center items-center mt-10">
            {data.reverse().map((tx: any, idx: number) => (
              <TransactionCard key={idx} {...tx} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Transactions;
