import transactionsInfo from "./abis/Transactions.json";
import transactionsAddr from "./abis/Transactions_addr.json";

export const config = {
  blockchain: {
    contract: {
      transactions: {
        name: transactionsInfo.contractName,
        abi: transactionsInfo.abi,
        addr: transactionsAddr.addr,
      },
    },
  },
};

export default config;
