import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import { ethers } from "hardhat"

const deployGovernanceToken: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const { getNamedAccounts, deployments, network } = hre
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    const box = await deploy("Box", {
        from: deployer,
        args: [],
        log: true
    })


    const timelock = await ethers.getContract("Timelock");

    const boxContract = await ethers.getContract("Box", box.address);

    const transferOwnerTx = await boxContract.transferOwnership(
        timelock.address
    );
    await transferOwnerTx.wait(1);
    log("You Don It");
}

export default deployBox;