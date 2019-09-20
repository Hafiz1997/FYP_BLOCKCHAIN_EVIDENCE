pragma solidity ^0.5.0;

contract Marketplace {
	string public name;
	uint public productCount = 0;
	mapping(uint => Product) public products;

	struct Product {
		uint id;
		string name;
		uint price;
		address payable owner;
		bool purchased;
	}

	event ProductCreated(
		uint id,
		string name,
		uint price,
		address payable owner,
		bool purchased
	);

	event ProductPurchased(
		uint id,
		string name,
		uint price,
		address payable owner,
		bool purchased
	);

	constructor() public {
		name = "Dapp University Marketplace";
	}

	function createProduct(string memory _name, uint _price) public {
		//require name
		require(bytes(_name).length > 0);
		//require valid price
		require(_price > 0);
		productCount ++;
		//Create product
		products[productCount] = Product(productCount, _name, _price, msg.sender, false);
		//trigger event
		emit ProductCreated(productCount, _name, _price, msg.sender, false);
	}

	function purchaseProduct(uint _id) public payable {
		//fetch product
		Product memory _product = products[_id];

		//fetch owner
		address payable _seller = _product.owner;

		//product has valid id
		require(_product.id > 0 && _product.id <= productCount);

		//enough ether for transaction
		require(msg.value >= _product.price);

		//product not yet purchased
		require(!_product.purchased);

		//require buyer not seller
		require(_seller != msg.sender);

		//transfer ownership
		_product.owner = msg.sender;

		//mark as purchased
		_product.purchased = true;

		//update product
		products[_id] = _product;

		//pay seller (ether)
		address(_seller).transfer(msg.value);

		//trigger event
		emit ProductPurchased(productCount, _product.name, _product.price, msg.sender, true);
	}

}
