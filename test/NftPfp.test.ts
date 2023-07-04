const hre = require("hardhat");
const { expect } = require("chai");
import { Contract } from "ethers";

describe("Staking", function () {
  let Staking: Contract;
  let RewardToken: Contract;
  let StakingToken: Contract;
  let owner: any;
  let player1: any;
  let player2: any;
  const timeTravel = async (days: number) => {
    await hre.network.provider.request({
      method: "evm_increaseTime",
      params: [days * 24 * 60 * 60],
    });
    await hre.network.provider.request({
      method: "evm_mine",
      params: [],
    });
    hre.ethers.Signer;
  };

  before(async function () {
    [owner, player1, player2] = await hre.ethers.getSigners();
    console.log("owner address: ", owner.address);
    console.log("player1 address: ", player1.address);
    console.log("player2 address: ", player2.address);

    const RT = await hre.ethers.getContractFactory("MockErc20");
    RewardToken = await RT.deploy("MockRewardToken", "RTK");
    await RewardToken.deployed();

    const ST = await hre.ethers.getContractFactory("MockErc20");
    StakingToken = await ST.deploy("MockStakingToken", "STK");
    await StakingToken.deployed();

    const S = await hre.ethers.getContractFactory("Staking");
    Staking = await S.deploy(RewardToken.address, StakingToken.address);
    await Staking.deployed();

    await RewardToken.transferOwnership(Staking.address);

    await StakingToken.transfer(player1.address, hre.ethers.utils.parseEther("10"));
    await StakingToken.transfer(player2.address, hre.ethers.utils.parseEther("10"));
  });

  it("stake", async function () {
    await StakingToken.connect(player1).approve(Staking.address, hre.ethers.utils.parseEther("3"));
    await StakingToken.connect(player2).approve(Staking.address, hre.ethers.utils.parseEther("4"));
    await Staking.connect(player1).stake(hre.ethers.utils.parseEther("1")); //  id = 1
    await Staking.connect(player2).stake(hre.ethers.utils.parseEther("1")); //  id = 2

    expect(await StakingToken.balanceOf(player1.address)).to.equal(
      hre.ethers.utils.parseEther("9")
    );
    expect(await StakingToken.balanceOf(player2.address)).to.equal(
      hre.ethers.utils.parseEther("9")
    );
  });
  it("stake again", async function () {
    await timeTravel(3);
    await Staking.connect(player1).stake(hre.ethers.utils.parseEther("2")); //  id = 3
    await Staking.connect(player2).stake(hre.ethers.utils.parseEther("3")); //  id = 4

    expect(await StakingToken.balanceOf(player1.address)).to.equal(
      hre.ethers.utils.parseEther("7")
    );
    expect(await StakingToken.balanceOf(player2.address)).to.equal(
      hre.ethers.utils.parseEther("6")
    );
  });
  it("unstake", async function () {
    await expect(Staking.connect(player1).unstake(1)).revertedWith("Stake is locked");
    await expect(Staking.connect(player2).unstake(2)).revertedWith("Stake is locked");

    await timeTravel(5);

    await Staking.connect(player1).unstake(1);

    expect(await StakingToken.balanceOf(player1.address)).to.equal(
      hre.ethers.utils.parseEther("8")
    );

    expect(await RewardToken.balanceOf(player1.address)).to.equal(
      hre.ethers.utils.parseEther("1").mul(await Staking.REWARD_AMOUNT_PER_STAKE())
    );
  });
  it("unstake again", async function () {
    await expect(Staking.connect(player1).unstake(3)).revertedWith("Stake is locked");
    await expect(Staking.connect(player2).unstake(4)).revertedWith("Stake is locked");

    await timeTravel(4);

    await Staking.connect(player1).unstake(3);

    expect(await StakingToken.balanceOf(player1.address)).to.equal(
      hre.ethers.utils.parseEther("10")
    );

    expect(await RewardToken.balanceOf(player1.address)).to.equal(
      hre.ethers.utils.parseEther("3").mul(await Staking.REWARD_AMOUNT_PER_STAKE())
    );
  });
  it("check user status", async function () {
    const player2Status = await Staking.getUserStatus(player2.address);

    expect(player2Status.length).to.equal(2);

    expect(player2Status[0].depositor).to.equal(player2.address);
    expect(player2Status[0].receiptId).to.equal(2);
    expect(player2Status[0].amount).to.equal(hre.ethers.utils.parseEther("1"));

    expect(player2Status[1].depositor).to.equal(player2.address);
    expect(player2Status[1].receiptId).to.equal(4);
    expect(player2Status[1].amount).to.equal(hre.ethers.utils.parseEther("3"));
  });
  it("unstake all", async function () {
    await Staking.connect(player2).unstakeAll();

    expect(await StakingToken.balanceOf(player2.address)).to.equal(
      hre.ethers.utils.parseEther("10")
    );

    expect(await RewardToken.balanceOf(player2.address)).to.equal(
      hre.ethers.utils.parseEther("4").mul(await Staking.REWARD_AMOUNT_PER_STAKE())
    );
  });
});
