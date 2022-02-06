const mapTransactions = require("./calculatePoints")

const args = process.argv[2]
const transactions = require(`./${args}`)

mapTransactions(transactions)