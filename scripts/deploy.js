const hre = require("hardhat");

async function main() {
  const accounts = await hre.ethers.getSigners();
  const contract = await hre.ethers.getContractFactory("FirstContract");
  const instance = await contract.deploy(accounts[0]);
  await instance.deployed();

  console.log("Contract deployed to:", instance.address);
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
