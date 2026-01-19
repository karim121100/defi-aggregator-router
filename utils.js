const BigNumber = require('bignumber.js');

function calculateSlippage(expected, received) {
    const exp = new BigNumber(expected);
    const rec = new BigNumber(received);
    
    const diff = exp.minus(rec);
    const slippage = diff.div(exp).multipliedBy(100);
    
    return slippage.toFixed(2) + "%";
}

function toWei(amount, decimals = 18) {
    return new BigNumber(amount).multipliedBy(new BigNumber(10).pow(decimals)).toString();
}

module.exports = { calculateSlippage, toWei };
