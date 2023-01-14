const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Fractionalise Nft", async function () {

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

      await nft.safeMint(accounts[0].address, 1)
      console.log("Nft balance of account[0]", await nft.balanceOf(accounts[0].address));

      await nft.connect(accounts[0]).setApprovalForAll(myToken.address, true)
        
    })

    it("initializing", async () => {

      await myToken.connect(accounts[0]).initialize(nft.address, 1, 100000000000)
      console.log("Owner of Nft", await nft.ownerOf(1))
      console.log("Token balance of account[0]", await myToken.balanceOf(accounts[0].address))
    
    })

    it("transfer Token to the account 1", async() => {
      await myToken.connect(accounts[0]).transfer(accounts[1].address, 100000)
      console.log("Token balance of account[1]", await myToken.balanceOf(accounts[1].address))
      console.log("Token balance of account[0]", await myToken.balanceOf(accounts[0].address))

    })

    it("put for sale ", async () =>{
      await myToken.connect(accounts[0]).putForSale(ethers.utils.parseEther("10"))
      // using ethers.utils.parseUnits("10000000000000000000000000") for converting Big no. in strings 
      console.log("sale started", await myToken.forSale())
      console.log("saleing price", await myToken.salePrice())

    })

    it("purchase", async() => {

      await myToken.connect(accounts[5]).purchase({value:ethers.utils.parseEther("10")})
      console.log("Nft purchased by", await nft.ownerOf(1))
      console.log("ethers available in account 5:", await ethers.provider.getBalance(accounts[5].address))

    })

    it("redeem", async() => {

      await myToken.connect(accounts[0]).redeem(99999900000)
      console.log("balance of account 0", await ethers.provider.getBalance(accounts[0].address))
      console.log("Token balance of account[0]", await myToken.balanceOf(accounts[0].address))


      })

    it("redeem", async() => {

      await myToken.connect(accounts[1]).redeem(100000)
       
      console.log("balance of account 1", await ethers.provider.getBalance(accounts[1].address))
      console.log("Token balance of account[1]", await myToken.balanceOf(accounts[1].address))
    })

})