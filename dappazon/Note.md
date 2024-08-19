## sample test in hardhat

```javascript
const { expect } = require("chai");
const { ethers } = require("hardhat");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), "ether");
};

//we can consider describe as a container
describe("Dcommerce", () => {
  let dcommerce;
  let deployer, buyer;
  // As we have to deploy our smart contract each time we run a test
  // Before hook it will repeat easch time,help in DRY concept
  // beforeEach()

  beforeEach(async () => {
    // Setup Accounts to get address
    [deployer, buyer] = await ethers.getSigners();
    console.log(deployer.address, buyer.address);

    const Dcommerce = await ethers.getContractFactory("Dcommerce");
    dcommerce = await Dcommerce.deploy(); //Deploy the contract
  });

  //container inside container Dcommerce
  describe("test1", () => {

    //container inside container Dcommerce>test1
    describe("Deployment", () => {

      it("has a owner", async () => {

        //   // will be executed after beforeEach , after smart contract is deployed
        expect(await dcommerce.owner()).is.equal(deployer.address);

      });

    });

  });
});
```


### Running the test
> npx hardhat test