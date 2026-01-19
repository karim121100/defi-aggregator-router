# DeFi Aggregator Router 🔗

![Solidity](https://img.shields.io/badge/Solidity-0.8.17-black) ![DeFi](https://img.shields.io/badge/Sector-DeFi-blue) ![Gas](https://img.shields.io/badge/Gas-Optimized-green)

## Protocol Overview

The **DeFi Aggregator Router** is a smart contract system designed to act as a middleware between users and Decentralized Exchanges (DEXs). Instead of trading on a single exchange, this router queries multiple Automated Market Makers (AMMs) to find the best possible execution price.

### Key Capabilities
* **Multi-DEX Routing:** Splits trades across Uniswap, SushiSwap, and PancakeSwap (if on BSC).
* **Slippage Protection:** Reverts transactions if the output amount is below the dynamic threshold.
* **Gas Estimation:** Calculates the trade-off between gas cost and price improvement.

### Architecture
The core logic resides in `Aggregator.sol`, which holds the interfaces for various Router contracts. The off-chain script `quote_finder.js` constantly polls the blockchain to update the optimal path.

## Integration
This codebase is designed to be deployed on **Ethereum Mainnet**, **Arbitrum**, or **Polygon**.

## Usage

1.  **Deployment**:
    Use the provided `deploy.js` script to launch the Aggregator contract.
2.  **Quoting**:
    Run `quote_finder.js` to fetch the best rate for a token pair (e.g., ETH -> DAI).
3.  **Swapping**:
    Execute `swap_manager.js` to perform the trade via the deployed contract.

---
*Open Source Infrastructure for Efficient Trading.*
