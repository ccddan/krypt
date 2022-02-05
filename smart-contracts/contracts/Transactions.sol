//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Transactions {
  uint256 private transactionsCounter;

  event Transfer(
    address from,
    address to,
    uint256 amount,
    string message,
    uint256 timestamp,
    string keyword
  );

  struct TransferStruct {
    address from;
    address to;
    uint256 amount;
    string message;
    uint256 timestamp;
    string keyword;
  }

  TransferStruct[] private transactions;

  function addToTransactions(
    address payable to,
    string memory message,
    string memory keyword
  ) public payable {
    transactions.push(
      TransferStruct(
        msg.sender,
        to,
        msg.value,
        message,
        block.timestamp,
        keyword
      )
    );
    transactionsCounter += 1;

    emit Transfer(msg.sender, to, msg.value, message, block.timestamp, keyword);
  }

  function getAllTransactions() public view returns (TransferStruct[] memory) {
    return transactions;
  }

  function getTransactionCount() public view returns (uint256) {
    return transactionsCounter;
  }
}
