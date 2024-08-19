const { expect } = require("chai");
const { ethers } = require("hardhat");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

const ID=1
const NAME="Shoes"
const CATEGORY="Clothing"
const IMAGE=".jpg"
const COST=tokens(1)
const RATING=4
const STOCK=5


describe("Dcommerce", () => {
let dcommerce;
let deployer,buyer;

  beforeEach(async()=>{
    // Setup Accounts to get address
    [deployer,buyer]=await ethers.getSigners()

    const Dcommerce=await ethers.getContractFactory("Dcommerce")
    dcommerce = await Dcommerce.deploy() //Deploy the contract
  })



  //container inside container Dcommerce>test1
  describe("Deployment" ,()=>{
  
  it('has a owner',async()=>{
    expect(await dcommerce.owner()).is.equal(deployer.address)
  })

})

describe("Listing",()=>{
  let transaction;

beforeEach(async ()=>{
  transaction=await dcommerce.connect(deployer).list(
    ID,
    NAME,
    CATEGORY,
    IMAGE,
    COST,
    RATING,
    STOCK
  )
  await transaction.wait()
})
  it("Returns items attributes",async()=>{
    const item =await dcommerce.items(ID)
    expect(item.id).to.equal(ID)
    expect(item.name).to.equal(NAME)
    expect(item.category).to.equal(CATEGORY)
    expect(item.image).to.equal(IMAGE)
    expect(item.cost).to.equal(COST)
    expect(item.rating).to.equal(RATING)
    expect(item.stock).to.equal(STOCK)
  })

  it("Emits list event",()=>{
    expect(transaction).to.emit(dcommerce,"List")
  })

});

describe("Listing",()=>{
  let transaction;

beforeEach(async ()=>{
  //List an item
  transaction=await dcommerce.connect(deployer).list( ID, NAME, CATEGORY, IMAGE, COST, RATING, STOCK)
  await transaction.wait()

  //Buy an item
  transaction=await dcommerce.connect(buyer).buy(ID,{value:COST})
})
it("Updates the contract balance",async ()=>{
  const result=await ethers.provider.getBalance(dcommerce.address)
  console.log(result)
  expect(result).to.equal(COST)
})
})
});