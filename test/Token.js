const { expect } = require("chai");

describe("Token contract", function () {
  it("Deployment should assign the total supply of tokens to the owner", async function () {
    const [owner] = await ethers.getSigners();

    // a signer in ethers is an abstraction of an Ethereum Account,
    // which can be used to sign messages and transactions (메세지나 트랜잭션에 사인을 한다는게 뭘까?)
    // and send signed transactions to the Ethereum Network to execute state changing operations.

    // the most common signers you will encounter are

    // - Wallet, which is a class which knows its private key and can execute any operations with it
    // - JsonRpcSigner, which is connected to a JsonRpcProvider and is acquire using getSigner

    const Token = await ethers.getContractFactory("Token");
    const hardhatToken = await Token.deploy();
    const ownerBalance = await hardhatToken.balanceOf(owner.address);

    expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
  });
});
