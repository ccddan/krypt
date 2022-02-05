const transactionsInfo = require("./abis/Transactions.json");

export const config = {
  blockchain: {
    contract: {
      transactions: {
        name: transactionsInfo.contractName,
        abi: transactionsInfo.abi,
        addr: process.env.CONTRACT_TRANSACTIONS_ADDR,
      },
    },
  },
};

export default config;
