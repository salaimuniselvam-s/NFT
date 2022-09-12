const { ethers, network } = require("hardhat");
require("dotenv").config({ path: ".env" });
const { WHITELIST_CONTRACT_ADDRESS, METADATA_URL } = require("../constants");
const { verify } = require("../utils/verify");

async function main() {
  const whitelistContract = WHITELIST_CONTRACT_ADDRESS;
  const metadataURL = METADATA_URL;
  const chainId = network.config.chainId;
  const cryptoDevsContract = await ethers.getContractFactory("CryptoDevs");

  const deployedCryptoDevsContract = await cryptoDevsContract.deploy(
    metadataURL,
    whitelistContract
  );

  console.log(
    "Crypto Devs Contract Address:",
    deployedCryptoDevsContract.address
  );
  if (chainId == 4) {
    await verify(deployedCryptoDevsContract.address, [
      metadataURL,
      whitelistContract,
    ]);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
