const { ethers } = require('ethers');
const { UNISWAP_ADDRESS, SUSHISWAP_ADDRESS, WETH, DAI } = require('./config');
const routerAbi = require('./router_abi.json');
require('dotenv').config();

async function getBestQuote(amountInEth) {
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
    
    const uniRouter = new ethers.Contract(UNISWAP_ADDRESS, routerAbi, provider);
    const sushiRouter = new ethers.Contract(SUSHISWAP_ADDRESS, routerAbi, provider);

    const amountIn = ethers.utils.parseEther(amountInEth);
    const path = [WETH, DAI];

    // Fetch quotes in parallel
    const [uniQuote, sushiQuote] = await Promise.all([
        uniRouter.getAmountsOut(amountIn, path),
        sushiRouter.getAmountsOut(amountIn, path)
    ]);

    const uniOut = uniQuote[1];
    const sushiOut = sushiQuote[1];

    console.log(`Uniswap Return: ${ethers.utils.formatEther(uniOut)} DAI`);
    console.log(`SushiSwap Return: ${ethers.utils.formatEther(sushiOut)} DAI`);

    // Decision Logic
    if (uniOut.gt(sushiOut)) {
        console.log("Recommendation: USE UNISWAP");
        return true; // true = uniswap
    } else {
        console.log("Recommendation: USE SUSHISWAP");
        return false; // false = sushi
    }
}

getBestQuote('1.0');
