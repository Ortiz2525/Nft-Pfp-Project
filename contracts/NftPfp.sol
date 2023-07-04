pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NftPfp is ERC721, Ownable {
    // tokenId -> genome
    uint128[] public genomes;

    constructor() ERC721("NftPft", "PFP") {}

    function mint(
        address to,
        uint256 tokenId,
        uint8[] memory _genomes
    ) public onlyOwner {
        genomes.push(encodeGenomes(_genomes));

        _mint(to, genomes.length - 1);
    }

    function encodeGenomes(
        uint8[] memory _genomes
    ) public pure returns (uint128) {
        require(_genomes.length == 12, "Invalid genome length");

        uint128 genome = 0;
        for (uint8 i = 0; i < _genomes.length; i++) {
            genome = genome << 8;
            genome = genome | _genomes[i];
        }

        return genome;
    }

    function decodeGenomes(
        uint128 genome
    ) public pure returns (uint8[] memory) {
        uint8[] memory _genomes = new uint8[](12);

        for (uint8 i = 11; i >= 0; i--) {
            _genomes[i] = uint8(genome & 0xFF);
            genome = genome >> 8;
        }

        return _genomes;
    }
}
