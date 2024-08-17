const { expect } = require("chai")

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

describe("Dcommerce", () => {

  it('has a name',async()=>{
    const Dcommerce=await ethers.getContractFactory("Dcommerce")
    dcommerce = await Dcommerce.deploy()
    expect(await dcommerce.name()).to.equal("Dcommerce")
  })
  it("MyAddress",async()=>{
    const Dcommerce= await ethers.getContractFactory("Dcommerce")
    dcommerce=await Dcommerce.deploy()
    expect(await dcommerce.number()).is.equal(10)
  })
})
