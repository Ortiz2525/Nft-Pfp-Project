import { ethers, upgrades } from "hardhat";

const { PRV_KEY } = require("./constants");

let Staking;
let RewardToken;
let StakingToken;
let owner;
let player1;
let player2;

const player1Address = "0x02C3d66D7C959FC45025ec85c5075cBfEF31b584";
const player2Address = "0xd64f1184447fb9264a847A31bDBB5276bD4Ee498";

async function main() {
  const provider = ethers.provider;

  // const wallet = new ethers.Wallet(PRV_KEY);
  // const signer = await wallet.connect(provider);

  // console.log("Signer's Address : ", signer.address);
  // console.log("Signer's Balance : ", await provider.getBalance(signer.address));

  // [owner] = await ethers.getSigners();
  // console.log("owner address: ", owner.address);
  // console.log("player1 address: ", player1Address);
  // console.log("player2 address: ", player2Address);

  // const RT = await ethers.getContractFactory("MockErc20");
  // RewardToken = await RT.deploy("MockRewardToken", "RTK");
  // await RewardToken.deployed();
  // console.log("RewardToken deployed to: ", RewardToken.address);

  // const ST = await ethers.getContractFactory("MockErc20");
  // StakingToken = await ST.deploy("MockStakingToken", "STK");
  // await StakingToken.deployed();
  // console.log("StakingToken deployed to: ", StakingToken.address);

  // const S = await ethers.getContractFactory("Staking");
  // Staking = await S.deploy(RewardToken.address, StakingToken.address);
  // await Staking.deployed();
  // console.log("Staking deployed to: ", Staking.address);

  // await RewardToken.transferOwnership(Staking.address);
  // console.log("RewardToken's Minter role transfered to Staking : ", Staking.address);

  // await StakingToken.transfer(player1Address, ethers.utils.parseEther("30"));
  // await StakingToken.transfer(player2Address, ethers.utils.parseEther("30"));

  // console.log("StakingTokens transfered to player1 and 2 : ", player1Address, player2Address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
