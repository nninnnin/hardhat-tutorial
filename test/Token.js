const { expect } = require("chai");

describe("Token contract", function () {
  it("Deployment should assign the total supply of tokens to the owner", async function () {
    const [owner] = await ethers.getSigners();

    /**

      A signer in ethers is an abstraction of an Ethereum Account which can be used to sign messages and transactions
      and send signed transactions to the Ethereum Network to execute state changing operations.

      The most common signers you will encounter are..
      - Wallet, which is a class which knows its private key and can execute any operations with it
      - JsonRpcSigner, which is connected to a JsonRpcProvider and is acquire using getSigner

     */

    const Token = await ethers.getContractFactory("Token"); // "Contract Factory"
    const hardhatToken = await Token.deploy(); // deployed "Contract"
    const ownerBalance = await hardhatToken.balanceOf(owner.address); // Once contract is deployed, we can call methods from it

    expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
  });

  it("Should transfer tokens between accounts", async function () {
    const [owner, addr1, addr2] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("Token");

    const hardhatToken = await Token.deploy();

    // Transfer 50 tokens from owner to addr1
    await hardhatToken.transfer(addr1.address, 50);
    expect(await hardhatToken.balanceOf(addr1.address)).to.equal(50);

    // Transfer 50 tokens from addr1 to addr2
    await hardhatToken.connect(addr1).transfer(addr2.address, 50);
    expect(await hardhatToken.balanceOf(addr2.address)).to.equal(50);
    expect(await hardhatToken.balanceOf(addr1.address)).to.equal(0);

    console.log(await hardhatToken.balanceOf(owner.address));
  });
});
