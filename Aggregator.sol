// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./Interfaces.sol";

contract Aggregator {
    address public owner;
    
    // Known Router Addresses
    address public constant UNISWAP_V2 = 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;
    address public constant SUSHISWAP = 0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F;

    constructor() {
        owner = msg.sender;
    }

    // Swaps on the exchange that offers the best return
    function swapBestPrice(
        address _tokenIn,
        address _tokenOut,
        uint256 _amountIn,
        uint256 _minAmountOut,
        bool _useUniswap
    ) external {
        IERC20(_tokenIn).transferFrom(msg.sender, address(this), _amountIn);
        IERC20(_tokenIn).approve(UNISWAP_V2, _amountIn);
        IERC20(_tokenIn).approve(SUSHISWAP, _amountIn);

        address[] memory path = new address[](2);
        path[0] = _tokenIn;
        path[1] = _tokenOut;

        address targetRouter = _useUniswap ? UNISWAP_V2 : SUSHISWAP;

        IUniswapV2Router(targetRouter).swapExactTokensForTokens(
            _amountIn,
            _minAmountOut,
            path,
            msg.sender,
            block.timestamp
        );
    }
}
