// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Dcommerce {
    // string public name;
    address public owner;

    struct Item {
        uint256 id;
        string name;
        string category;
        string image;
        uint256 cost;
        uint256 rating;
        uint256 stock;
    }

    struct Order{
        uint256 time;
        Item item;
    }
mapping (uint256 => Item) public items;
event List(string name,uint256 cost,uint256 quantity);
    constructor() {
        // name="Dcommerce";
        owner = msg.sender;
    }
    modifier onlyOwner{
        require(msg.sender==owner,"only owner can interact");
        _;
    }
    // List products
    function list(
        uint256 _id,
        string memory _name,
        string memory _category,
        string memory _image,
        uint256 _cost,
        uint256 _rating,
        uint256 _stock
    ) public onlyOwner{
        
        // Code goes here...
        // Create Item struct
        Item memory item = Item(
            _id,
            _name,
            _category,
            _image,
            _cost,
            _rating,
            _stock
        ); //Item is datatype & item is variable

        // Save Item struct to blockchain
        items[_id]=item;

        //Emit an event
        //Benefit:- 1.to get notification/alert 2.get the notification every single time .this function is called on the blockchain
        emit List(_name,_cost,_stock);

    }
    // Buy products
    function buy(uint256 _id)public payable{
        // Receive crypto

// Fetch item
Item memory item =items[_id];
        // create an order
        Order memory order=Order(block.timestamp,item);

        // Substract stock

        // Emit event
    }
    // withdraw funds
}
