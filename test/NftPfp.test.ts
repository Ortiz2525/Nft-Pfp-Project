const hre = require("hardhat");
const { expect } = require("chai");
import { Contract } from "ethers";

describe("NftPfp", function () {
  let NftPfp: Contract;
  let owner: any;
  let player1: any;
  let player2: any;
  let genomes = [];
  let unpackedGenomes = [];
  let genomeRange = [60, 30, 10, 40, 10, 100, 50, 60, 100, 10, 25, 30];

  const makeRandomUnpackedGenome = () => {
    let unpackedGenome = [];
    for (let j = 0; j <= 11; j++) {
      unpackedGenome.push(Math.floor(Math.random() * (genomeRange[j] + 1)));
    }
    return unpackedGenome;
  };

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
      let unpackedGenome = makeRandomUnpackedGenome();
      await NftPfp.mint(await NftPfp.packGenome(unpackedGenome));
      genomes.push(await NftPfp.packGenome(unpackedGenome));
      unpackedGenomes.push(unpackedGenome);
    }
  });
  it("check the genomes", async function () {
    this.timeout(600000);
    for (let i = 0; i < 5000; i++) {
      // const packedGenomeString = (await NftPfp.unpackGenome(await NftPfp.packedGenomes(i))).map(
      //   (it) => {
      //     console.log(it);
      //     it.toNumber();
      //   }
      // );
      // const packedGenomeString1 = unpackedGenomes[i].map((it) => {
      //   it.toNumber();
      // });
      // console.log(packedGenomeString);
      console.log(i);
      console.log(unpackedGenomes[i]);
      console.log(await NftPfp.unpackGenome(await NftPfp.packedGenomes(i)));
      console.log(genomes[i]);
      console.log(await NftPfp.packedGenomes(i));
      expect(await NftPfp.unpackGenome(await NftPfp.packedGenomes(i))).to.deep.eq(
        unpackedGenomes[i]
      );
    }
  });
});
