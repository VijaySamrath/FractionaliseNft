
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";


contract MyToken is ERC20, Ownable, ERC20Permit, ERC721Holder {

    IERC721 public collection;
    uint256 public tokenId;
    bool public initialized = false;
    bool public forSale = false;
    uint public salePrice;
    bool public canRedeem = false;

    constructor() ERC20("MyToken", "MTK") ERC20Permit("MyToken") {}

    function initialize(address _collection, uint256 _tokenId, uint _amount) external onlyOwner{
        require(!initialized, "Already initialized");
        require(_amount > 0, "amount should be greater than zero");
        collection = IERC721(_collection);
        collection.safeTransferFrom(msg.sender, address(this), _tokenId);

        tokenId = _tokenId;
        initialized = true;
        _mint(msg.sender, _amount);
    }

    function putForSale(uint256 price) external onlyOwner {
        salePrice = price;
        forSale = true;
    }

    function purchase() external payable {
        require(forSale, "nft is not on the slae");
        require(msg.value >= salePrice, "Not enough ether sent");
        collection.transferFrom(address(this), msg.sender, tokenId);
        forSale = false;
        canRedeem = true;
    }

    function redeem(uint _amount) external {
        require(canRedeem, "Redemption not available");
        uint256 totalEther = address(this).balance;
        // calculate the msg.value to return after the sale of the Nft.
        uint256 toRedeem = _amount * totalEther / totalSupply();

        _burn(msg.sender, _amount);
        payable(msg.sender).transfer(toRedeem);


    }


}