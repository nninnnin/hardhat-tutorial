const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe("Token contract", function () {
  async function deployTokenFixture() {
    const TokenFactory = await ethers.getContractFactory("Token");
    const [owner, addr1, addr2] = await ethers.getSigners();

    /**

      A signer in ethers is an abstraction of an Ethereum Account which can be used to sign messages and transactions
      and send signed transactions to the Ethereum Network to execute state changing operations.

      The most common signers you will encounter are..
      - Wallet, which is a class which knows its private key and can execute any operations with it
      - JsonRpcSigner, which is connected to a JsonRpcProvider and is acquire using getSigner

     */

    const hardhatToken = await TokenFactory.deploy();

    await hardhatToken.deployed();

    return { TokenFactory, hardhatToken, owner, addr1, addr2 };
  }

  it("Should assign the total supply of tokens to the owner", async function () {
    const { hardhatToken, owner } = await loadFixture(deployTokenFixture);

    const ownerBalance = await hardhatToken.balanceOf(owner.address);
    expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
  });

  it("Should transfer tokens between accounts", async function () {
    const { hardhatToken, owner, addr1, addr2 } = await loadFixture(
      deployTokenFixture
    );

    // Transfer 50 tokens from owner to addr1
    await hardhatToken.transfer(addr1.address, 50);
    expect(await hardhatToken.balanceOf(addr1.address)).to.equal(50);
    expect(await hardhatToken.balanceOf(owner.address)).to.equal(150);

    // Transfer 50 tokens from addr1 to addr2
    await hardhatToken.connect(addr1).transfer(addr2.address, 50);
    expect(await hardhatToken.balanceOf(addr2.address)).to.equal(50);
    expect(await hardhatToken.balanceOf(addr1.address)).to.equal(0);
  });
});
