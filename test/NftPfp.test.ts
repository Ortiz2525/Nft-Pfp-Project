const hre = require("hardhat");
const { expect } = require("chai");
import { Contract } from "ethers";

describe("NftPfp", function () {
  let NftPfp: Contract;
  let owner: any;
  let player1: any;
  let player2: any;
  let genomes: number[] = [];
  let genomeRange = [60, 30, 10, 40, 10, 100, 50, 60, 100, 10, 25, 30];

  before(async function () {
    [owner, player1, player2] = await hre.ethers.getSigners();
    console.log("owner address: ", owner.address);
    console.log("player1 address: ", player1.address);
    console.log("player2 address: ", player2.address);

    const N = await hre.ethers.getContractFactory("NftPfp");
    NftPfp = await N.deploy();
    await NftPfp.deployed();
  });

  it("mint 50000 NFTs", async function () {
    this.timeout(600000);
    for (let i = 0; i < 5000; i++) {
      let genome = [];
      for (let j = 11; j >= 0; j--) {
        genome.push(Math.floor(Math.random() * (genomeRange[j] + 1)));
      }
      await NftPfp.mint(player1.address, genome);
      genomes.push(await NftPfp.packGenome(genome));
    }
    expect(await NftPfp.balanceOf(player1.address)).to.equal(5000);
  });
  it("check the genomes", async function () {
    for (let i = 0; i < 5000; i++) {
      expect(await NftPfp.genomes(i)[0]).to.equal(await NftPfp.unpackGenome(genomes[i])[0]);
      expect(await NftPfp.genomes(i)[3]).to.equal(await NftPfp.unpackGenome(genomes[i])[3]);
      expect(await NftPfp.genomes(i)[5]).to.equal(await NftPfp.unpackGenome(genomes[i])[5]);
      expect(await NftPfp.genomes(i)[8]).to.equal(await NftPfp.unpackGenome(genomes[i])[8]);
      expect(await NftPfp.genomes(i)[11]).to.equal(await NftPfp.unpackGenome(genomes[i])[11]);
    }
  });
});
