const { ethers } = require("hardhat");

async function main() {


  const Nft= await ethers.getContractFactory("Nft");
  const nft = await Nft.deploy()
  await nft.deployed()
  console.log("Nft deployed to address:", nft.address)

  const MyToken = await ethers.getContractFactory("MyToken");
  const myToken = await MyToken.deploy()
  await myToken.deployed()
  console.log("MyToken deployed to address:", myToken.address)

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })