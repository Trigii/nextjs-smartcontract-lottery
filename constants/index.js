// this file represents the hole folder. By doing this we can import the contractAddresses and Abi at the same time on the LotteryEntrance
const contractAddresses = require("./contractAddresses.json");
const abi = require("./abi.json");

module.exports = {
    abi,
    contractAddresses,
};
