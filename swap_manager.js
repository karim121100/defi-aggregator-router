const { ethers } = require('ethers');
const { WETH, DAI } = require('./config');
require('dotenv').config();

// Connect to our deployed Aggregator
const AGGREGATOR_ADDRESS = "0xYourDeployedAddress";
const aggregatorAbi = [
    "function swapBestPrice(address, address, uint256, uint256, bool) external"
];

async function executeSwap(useUniswap) {
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    const contract = new ethers.Contract(AGGREGATOR_ADDRESS, aggregatorAbi, wallet);

    const amountIn = ethers.utils.parseEther("0.1");
    const minOut = 0; // Slippage unset for demo

    console.log("Executing Swap via Aggregator...");
    
    const tx = await contract.swapBestPrice(
        WETH,
        DAI,
        amountIn,
        minOut,
        useUniswap
    );

    console.log(`Transaction Sent: ${tx.hash}`);
    await tx.wait();
    console.log("Swap Confirmed.");
}

module.exports = { executeSwap };
