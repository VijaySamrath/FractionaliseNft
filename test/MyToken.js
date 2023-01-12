const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Nft Auction", async function () {

    async function deploy() {
        
  const Nft= await ethers.getContractFactory("Nft");
  nft = await Nft.deploy()
  await nft.deployed()
  console.log("Nft deployed to address:", nft.address)

  const MyToken = await ethers.getContractFactory("MyToken");
  myToken = await MyToken.deploy()
  await myToken.deployed()
  console.log("MyToken deployed to address:", myToken.address)


}

  before("Before", async () => {
        accounts = await ethers.getSigners();

        await deploy();
    })

    
    it("should Token name be", async () => {
        //let TokenName
        try {
            TokenName = await nft.name();
        } catch (error) {
            console.log(error)
        }

        console.log("TokenName: ", TokenName);
        expect(TokenName).to.equal("MyToken");

    })

    it("minting Token & giving allowance", async () => {
      await nft.safeMint(accounts[1].address, 1)
      console.log("Balance of account", await nft.balanceOf(accounts[1].address));

      await nft.connect(accounts[1]).setApprovalForAll(myToken.address, true)
        
    })

    it("initializing", async () => {

        await myToken.connect(accounts[0]).connect(accounts[1]).initialize(nft.address, 1, 100000000000)

        console.log("Owner of account", await nft.ownerOf(1));
    
      })







})