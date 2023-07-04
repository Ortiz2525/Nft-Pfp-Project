import { HardhatUserConfig, task, types } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-gas-reporter";
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-gas-reporter");
require("dotenv").config();

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      // forking: {
      //   url: "https://goerli.infura.io/v3/afee43fb439a4e1794d9acad3e4a95b8",
      // }
    },
    bnb: {
      url: "https://bsc-mainnet.public.blastapi.io/",
      accounts: [],
    },
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/your-project-id",
      accounts: [],
    },
    mainnet: {
      url: "https://mainnet.infura.io/v3/your-project-id",
      accounts: [],
    },
    goerli: {
      url: "https://goerli.infura.io/v3/afee43fb439a4e1794d9acad3e4a95b8",
      accounts: [process.env.PRV_KEY],
    },
    sepolia: {
      url: "https://sepolia.infura.io/v3/afee43fb439a4e1794d9acad3e4a95b8",
      accounts: [process.env.PRV_KEY],
    },
  },
  solidity: {
    compilers: [
      {
        version: "0.8.0",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.8.1",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.8.2",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.6.6",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.5.16",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  typechain: {
    outDir: "types",
    target: "ethers-v5",
  },
  gasReporter: {
    enabled: true,
    currency: "USD",
    gasPrice: 21,
  },
  plugins: ["@nomiclabs/hardhat-ethers", "@openzeppelin/hardhat-upgrades"],
  etherscan: {
    apiKey: "XEAWRP777XXMIXWWNN5TC8ZJJDN6XEZ76Q",
  },
};

task("BAD", "This task is broken", async () => {
  // console.log("123");
  setTimeout(() => {
    throw new Error("This task's action returned a promise that resolved before I was thrown");
  }, 1000);
});

task("delayed-hello", "Prints 'Hello, World!' after a second", async () => {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      // console.log("Hello, World!");
      resolve();
    }, 1000);
  });
});

task("hello", "Prints a greeting")
  .addOptionalParam("greeting", "The greeting to print", "Hello, World!")
  .setAction(async ({ greeting }) => console.log(greeting));

task("hello", "Prints 'Hello' multiple times")
  .addOptionalParam("times", "The number of times to print 'Hello'", 1, types.int)
  .setAction(async ({ times }) => {
    for (let i = 0; i < times; i++) {
      // console.log("Hello");
    }
  });

export default config;
