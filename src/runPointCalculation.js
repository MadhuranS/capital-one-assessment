const mapTransactions = require("./calculatePoints");

const args = process.argv[2];
const transactions = require(`./${args}`);

console.log(`The maximum number of points gained from the input transactions is ${mapTransactions(transactions)}`);
