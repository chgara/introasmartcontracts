const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Contract", function () {
  // Make accesible the following variables from the outer scope
  let Contract, instance, accounts, address, owner;

  beforeEach(async function () {
    // Get the contract artifact
    Contract = await ethers.getContractFactory("FirstContract");
    // Get the accounts
    accounts = await ethers.getSigners();
    // Get the owner of the contract
    owner = accounts[0];
    // Deploy the contract
    instance = await Contract.deploy(owner.address);
    // Get the address of the contract
    address = await instance.address;
  });

  it("Should add and retrieve posts correctly", async function () {
    await instance
      .connect(owner)
      .addPostUrl(
        "https://www.elladodelmal.com/2021/12/paco-has-pedido-un-satisfyer-en-amazon.html"
      );
    await instance
      .connect(owner)
      .addPostUrl(
        "https://www.elladodelmal.com/2021/12/blockchain-smart-contracts-una-serie.html"
      );
    await instance
      .connect(owner)
      .addPostUrl(
        "https://www.elladodelmal.com/2021/12/5-formas-de-como-te-pueden-robar.html"
      );
    const posts = await instance.getPosts();
    expect(posts).to.eql([
      "https://www.elladodelmal.com/2021/12/paco-has-pedido-un-satisfyer-en-amazon.html",
      "https://www.elladodelmal.com/2021/12/blockchain-smart-contracts-una-serie.html",
      "https://www.elladodelmal.com/2021/12/5-formas-de-como-te-pueden-robar.html",
    ]);
  });

  it("Delete posts correctly", async function () {
    await instance
      .connect(owner)
      .addPostUrl(
        "https://www.elladodelmal.com/2021/12/paco-has-pedido-un-satisfyer-en-amazon.html"
      );
    await instance
      .connect(owner)
      .addPostUrl(
        "https://www.elladodelmal.com/2021/12/blockchain-smart-contracts-una-serie.html"
      );
    await instance
      .connect(owner)
      .addPostUrl(
        "https://www.elladodelmal.com/2021/12/5-formas-de-como-te-pueden-robar.html"
      );

    // Delete the second post
    await instance
      .connect(owner)
      .deletePostUrl(
        "https://www.elladodelmal.com/2021/12/blockchain-smart-contracts-una-serie.html"
      );
    const posts = await instance.getPosts();
    expect(posts).to.eql([
      "https://www.elladodelmal.com/2021/12/paco-has-pedido-un-satisfyer-en-amazon.html",
      "",
      "https://www.elladodelmal.com/2021/12/5-formas-de-como-te-pueden-robar.html",
    ]);
  });

  it("Do not delete the post", async function () {
    let hasError = false;
    try {
      await instance
        .connect(owner)
        .deletePostUrl(
          "https://www.elladodelmal.com/2021/12/blockchain-smart-contracts-una-serie.html"
        );
    } catch (e) {
      expect(e.message).to.eql(
        "VM Exception while processing transaction: reverted with reason string 'The provided url does not exist'"
      );
      hasError = true;
    }
    // Ensure that the error was thrown
    expect(hasError).to.eql(true);
  });

  // Now we will test the change of the ownership
  describe("Ownership", function () {
    it("Should change the owner of the contract", async function () {
      await instance
        .connect(owner)
        .setOwnerState(accounts[1].address, "Paco", 34);
    });
    it("Should not change the owner of the contract", async function () {
      let hasError = false;
      try {
        await instance
          .connect(accounts[1])
          .setOwnerState(accounts[2].address, "Paco", 34);
      } catch (error) {
        expect(error.message).to.equal(
          "VM Exception while processing transaction: reverted with reason string 'Error, you are not the owner'"
        );
        hasError = true;
      }
      // Ensure that the error has been thrown
      expect(hasError).to.equal(true);
    });
  });
});
