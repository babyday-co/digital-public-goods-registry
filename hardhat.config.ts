import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
import * as dotenv from "dotenv";

dotenv.config();

const accounts =
  process.env.PRIVATE_KEY &&
  process.env.PRIVATE_KEY !== "your-private-key-here"
    ? [process.env.PRIVATE_KEY]
    : [];

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks:
    accounts.length > 0
      ? {
          sepolia: {
            url: process.env.RPC_URL || "",
            accounts,
          },
        }
      : {},
};

export default config;
