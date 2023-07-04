pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "hardhat/console.sol";

contract NftPfp is ERC721, Ownable {
    // tokenId -> genome
    uint128[] public genomes;

    constructor() ERC721("NftPft", "PFP") {}

    function mint(address to, uint8[] memory _genomes) public onlyOwner {
        genomes.push(encodeGenome(_genomes));

        _mint(to, genomes.length - 1);
    }

    function encodeGenome(
        uint8[] memory _genome
    ) public pure returns (uint128) {
        require(_genome.length == 12, "Invalid genome length");

        uint128 genome = 0;
        for (uint8 i = 0; i < _genome.length; i++) {
            genome = genome << 8;
            genome = genome | _genome[i];
        }

        return genome;
    }

    function decodeGenome(uint128 genome) public view returns (uint8[] memory) {
        uint8[] memory _genome = new uint8[](12);

        console.log("genome: ", genome);

        for (uint8 i = 0; i < 12; i++) {
            _genome[11 - i] = uint8(genome & 0xFF);
            genome = genome >> 8;
            console.log("i: ", i);
            console.log("genome[i]: ", _genome[i]);
        }
        console.log("genome: ", genome);
        return _genome;
    }
}
