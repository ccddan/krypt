import { ethers } from "hardhat";
import { expect } from "chai";

describe("Transactions", function () {
  it("Initial counter/transaction items are zero", async function () {
    const Transactions = await ethers.getContractFactory("Transactions");
    const transactions = await Transactions.deploy();
    await transactions.deployed();

    expect(await transactions.getTransactionCount()).to.equal(0);

    expect((await transactions.getAllTransactions()).length).to.equal(0);
  });
});
