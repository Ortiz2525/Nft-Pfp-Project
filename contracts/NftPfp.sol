pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract NftPfp {
    // tokenId -> genome
    uint64[] public packedGenomes;

    constructor() {}

    function mint(uint64 _packedGenome) public {
        packedGenomes.push(_packedGenome);
    }

    function packGenome(
        uint64[] memory _genome
    ) public view returns (uint64 packedGenome) {
        require(_genome.length == 12, "Invalid genome length");

        packedGenome =
            (_genome[0] << 58) |
            (_genome[1] << 53) |
            (_genome[2] << 49) |
            // size of (_genome[4], _genome[3]) = 10 but reduce it to 9
            ((_genome[3] * 11 + _genome[4]) << 40) |
            (_genome[5] << 33) |
            (_genome[6] << 27) |
            (_genome[7] << 21) |
            (_genome[8] << 14) |
            (_genome[9] << 10) |
            (_genome[10] << 5) |
            _genome[11];
    }

    function unpackGenome(
        uint64 packedGenome
    ) public pure returns (uint8[] memory) {
        uint8[] memory _genome = new uint8[](12);

        _genome[11] = uint8(packedGenome & 0x1F);
        packedGenome = packedGenome >> 5;
        _genome[10] = uint8(packedGenome & 0x1F);
        packedGenome = packedGenome >> 5;
        _genome[9] = uint8(packedGenome & 0x0F);
        packedGenome = packedGenome >> 4;
        _genome[8] = uint8(packedGenome & 0x7F);
        packedGenome = packedGenome >> 7;
        _genome[7] = uint8(packedGenome & 0x3F);
        packedGenome = packedGenome >> 6;
        _genome[6] = uint8(packedGenome & 0x3F);
        packedGenome = packedGenome >> 6;
        _genome[5] = uint8(packedGenome & 0x7F);
        packedGenome = packedGenome >> 7;

        // size of (_genome[4], _genome[3]) = 10 but reduce it to 9
        _genome[4] = uint8((packedGenome & 0x1FF) % 11);
        _genome[3] = uint8((packedGenome & 0x1FF) / 11);
        packedGenome = packedGenome >> 9;

        _genome[2] = uint8(packedGenome & 0x0F);
        packedGenome = packedGenome >> 4;
        _genome[1] = uint8(packedGenome & 0x1F);
        packedGenome = packedGenome >> 5;
        _genome[0] = uint8(packedGenome & 0x3F);

        return _genome;
    }
}
