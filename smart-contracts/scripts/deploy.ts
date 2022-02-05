import { ethers } from "hardhat";

const main = async () => {
  const Transactions = await ethers.getContractFactory("Transactions");
  const transactions = await Transactions.deploy();

  await transactions.deployed();

  console.log("Transactions contract deployed to:", transactions.address);
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
