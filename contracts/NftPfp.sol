pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "hardhat/console.sol";

contract NftPfp is ERC721, Ownable {
    // tokenId -> genome
    uint72[] public genomes;

    constructor() ERC721("NftPfp", "PFP") {}

    function mint(address to, uint8[] memory _genomes) public onlyOwner {
        genomes.push(packGenome(_genomes));

        _mint(to, genomes.length - 1);
    }

    function packGenome(
        uint8[] memory _genome
    ) public pure returns (uint72 packedGenome) {
        require(_genome.length == 12, "Invalid genome length");

        packedGenome =
            (_genome[0] << 59) |
            (_genome[1] << 54) |
            (_genome[2] << 50) |
            (_genome[3] << 44) |
            (_genome[4] << 40) |
            (_genome[5] << 33) |
            (_genome[6] << 27) |
            (_genome[7] << 21) |
            (_genome[8] << 14) |
            (_genome[9] << 10) |
            (_genome[10] << 5) |
            _genome[11];
    }

    function unpackGenome(
        uint72 packedGenome
    ) public view returns (uint8[] memory) {
        uint8[] memory _genome = new uint8[](12);

        _genome[11] = uint8(packedGenome & 0x2F);
        packedGenome = packedGenome >> 5;
        _genome[10] = uint8(packedGenome & 0x2F);
        packedGenome = packedGenome >> 5;
        _genome[9] = uint8(packedGenome & 0x1F);
        packedGenome = packedGenome >> 4;
        _genome[8] = uint8(packedGenome & 0x8F);
        packedGenome = packedGenome >> 7;
        _genome[7] = uint8(packedGenome & 0x4F);
        packedGenome = packedGenome >> 6;
        _genome[6] = uint8(packedGenome & 0x4F);
        packedGenome = packedGenome >> 6;
        _genome[5] = uint8(packedGenome & 0x8F);
        packedGenome = packedGenome >> 7;
        _genome[4] = uint8(packedGenome & 0x0F);
        packedGenome = packedGenome >> 4;
        _genome[3] = uint8(packedGenome & 0x4F);
        packedGenome = packedGenome >> 6;
        _genome[2] = uint8(packedGenome & 0x0F);
        packedGenome = packedGenome >> 4;
        _genome[1] = uint8(packedGenome & 0x1F);
        packedGenome = packedGenome >> 5;
        _genome[0] = uint8(packedGenome & 0x4F);

        return _genome;
    }
}
