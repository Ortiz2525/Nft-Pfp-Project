# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.ts
```

owner address: 0xcF41efD2Efc47F8bc58acfA281854eea13B4fC96
player1 address: 0x02C3d66D7C959FC45025ec85c5075cBfEF31b584
player2 address: 0xd64f1184447fb9264a847A31bDBB5276bD4Ee498
RewardToken deployed to : 0xa492211E3c5a67140d19DaAF293a8914CfdC2133
StakingToken deployed to : 0x5edED50e9F408c9b45469309dF571379892F1345
Staking deployed to : 0xC3027730fdCc6682cA659cFDFb8B4Cc073E08Cb5
Transfer stakingtoken to players

---

PS D:\Blockchain_Projects\Mine\StakingContractsWithHardhat> npx hardhat run .\scripts\deployStaking.ts --network sepolia
Signer's Address : 0xcF41efD2Efc47F8bc58acfA281854eea13B4fC96
Signer's Balance : BigNumber { value: "1000000000000000000" }
owner address: 0xcF41efD2Efc47F8bc58acfA281854eea13B4fC96
player1 address: 0x02C3d66D7C959FC45025ec85c5075cBfEF31b584
player2 address: 0xd64f1184447fb9264a847A31bDBB5276bD4Ee498
RewardToken deployed to: 0xE803b8A08c89a58b2B0De1dA694BAf93D292C51c
StakingToken deployed to: 0xf8487E367Dab61724674DA9C67865045c6a58300
Staking deployed to: 0x60a5367De4bD150dd4Ecd0C86CECc5ad8b460a13
Minter role transfered: 0x60a5367De4bD150dd4Ecd0C86CECc5ad8b460a13

---

PS D:\Blockchain_Projects\Mine\StakingContractsWithHardhat> npx hardhat run .\scripts\deployStaking.ts --network sepolia
Signer's Address : 0xcF41efD2Efc47F8bc58acfA281854eea13B4fC96
Signer's Balance : BigNumber { value: "996063227057051271" }
owner address: 0xcF41efD2Efc47F8bc58acfA281854eea13B4fC96
player1 address: 0x02C3d66D7C959FC45025ec85c5075cBfEF31b584
player2 address: 0xd64f1184447fb9264a847A31bDBB5276bD4Ee498
RewardToken deployed to: 0xDa069f70CCFcD0C9fDD2B8e733Bbf99FCf899aB7
StakingToken deployed to: 0xfC1ec9b534FCFFB2Fb6F13b2489a156f8b0FA079
Staking deployed to: 0x38A23f8B37241C3A5560fd2d8042d96251D50762
RewardToken's Minter role transfered to Staking : 0x38A23f8B37241C3A5560fd2d8042d96251D50762
