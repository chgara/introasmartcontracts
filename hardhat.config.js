require("@nomiclabs/hardhat-waffle");
const dotenv = require("dotenv");

dotenv.config();
const PROYECT_ID = process.env.PROYECT_ID;
const privateKey = process.env.PRIVATE_KEY;

module.exports = {
  networks: {
    hardhat: {
      chainId: 1337,
    },
    mumbai: {
      url: `https://polygon-mumbai.infura.io/v3/${PROYECT_ID}`,
      accounts: [privateKey],
    },
    mainnet: {
      url: `https://polygon-mainnet.infura.io/v3/${PROYECT_ID}`,
      accounts: [privateKey],
    },
  },
  solidity: "0.8.4",
};
