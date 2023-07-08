const hre = require("hardhat");
const { expect } = require("chai");
import { Contract } from "ethers";

describe("NftPfp", function () {
  let NftPfp: Contract;
  let owner: any;
  let player1: any;
  let player2: any;
  const genomeRange = [60, 30, 10, 40, 10, 100, 50, 60, 100, 10, 25, 30];

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

  describe("check save4Genomes", function () {
    let genomes = [];
    let unpackedGenomes = [];
    it("mint 50000 NFTs", async function () {
      this.timeout(600000);
      for (let i = 0; i < 5000; i++) {
        let unpackedGenome = makeRandomUnpackedGenome();
        genomes.push(await NftPfp.packGenome(unpackedGenome));
        unpackedGenomes.push(unpackedGenome);
      }
      for (let i = 0; i < 1250; i++) {
        // console.log("---------    start        --------");
        // console.log("i : ", i);
        const packedGenome0 = await NftPfp.packGenome(unpackedGenomes[i * 4]);
        const packedGenome1 = await NftPfp.packGenome(unpackedGenomes[i * 4 + 1]);
        const packedGenome2 = await NftPfp.packGenome(unpackedGenomes[i * 4 + 2]);
        const packedGenome3 = await NftPfp.packGenome(unpackedGenomes[i * 4 + 3]);
        const packed4Genome = await NftPfp.packTo4Genome([
          packedGenome0,
          packedGenome1,
          packedGenome2,
          packedGenome3,
        ]);
        await NftPfp.save4Genome(packed4Genome, i);
        // console.log("packed4Genome : ", packed4Genome);
        // console.log("packedGenome0 : ", packedGenome0);
        // console.log("await NftPfp.getPackedGenome(i * 4) : ", await NftPfp.getPackedGenome(i * 4));
        // console.log("---------    end        --------");
      }
    });
    it("check the genomes", async function () {
      this.timeout(600000);
      for (let i = 0; i < 5000; i++) {
        // console.log(i);
        // console.log(unpackedGenomes[i]);
        // console.log(await NftPfp.unpackGenome(await NftPfp.getPackedGenome(i)));
        // console.log(genomes[i]);
        // console.log(await NftPfp.getPackedGenome(i));
        expect(await NftPfp.unpackGenome(await NftPfp.getPackedGenome(i))).to.deep.eq(
          unpackedGenomes[i]
        );
      }
    });
  });
});
