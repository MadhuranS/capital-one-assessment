
function mapTransactions(transactions) { //Create map using input data
  const trxmap = new Map();
  const stores = new Set(["sportcheck", "tim_hortons", "subway"]);
  for (const trx in transactions) {
    const merchant_code = stores.has(transactions[trx].merchant_code) ?  transactions[trx].merchant_code : "other"
    const amount = transactions[trx].amount_cents;
    if (!trxmap.has(merchant_code)) {
      trxmap.set(merchant_code, amount);
    } else {
      trxmap.set(merchant_code, trxmap.get(merchant_code) + amount);
    }
  }
  return getPoints(trxmap) //get max points and return it
}

function getPoints(trxmap) { //calculate maximum points for the transactions
  let points = 0
  if (trxmap.get("sportcheck") >= 7500 && trxmap.get("tim_hortons" >=2500 && trxmap.get("subway") >= 2500)) { //APPLY RULE 1 
    const numApplications = Math.min(Math.floor(trxmap.get("sportcheck")/7500), Math.floor(trxmap.get("tim_hortons")/2500), Math.floor(trxmap.get("subway")/2500))
    points += 500 * numApplications
    trxmap.set("sportcheck", trxmap.get("sportcheck") - 7500*numApplications)
    trxmap.set("tim_hortons", trxmap.get("tim_hortons") - 2500*numApplications)
    trxmap.set("subway", trxmap.get("subway") - 2500*numApplications)
  }

  if (trxmap.get("sportcheck") >= 2500 && trxmap.get("tim_hortons" >=1000 && trxmap.get("subway") >= 1000)) { //APPLY RULE 4
    const numApplications = Math.min(Math.floor(trxmap.get("sportcheck")/2500), Math.floor(trxmap.get("tim_hortons")/1000), Math.floor(trxmap.get("subway")/1000))
    points += 150 * numApplications
    trxmap.set("sportcheck", trxmap.get("sportcheck") - 2500*numApplications)
    trxmap.set("tim_hortons", trxmap.get("tim_hortons") - 1000*numApplications)
    trxmap.set("subway", trxmap.get("subway") - 1000*numApplications)
  }

  if (trxmap.get("sportcheck") >= 7500 && trxmap.get("tim_hortons" >=2500)) { //APPLY RULE 2
    const numApplications = Math.min(Math.floor(trxmap.get("sportcheck")/7500), Math.floor(trxmap.get("tim_hortons")/2500))
    points += 300 * numApplications
    trxmap.set("sportcheck", trxmap.get("sportcheck") - 7500*numApplications)
    trxmap.set("tim_hortons", trxmap.get("tim_hortons") - 2500*numApplications)
  }

  if (trxmap.get("sportcheck") >= 2000) { //APPLY RULE 6
    const numApplications = Math.floor(trxmap.get("sportcheck")/2000)
    points += 75 * numApplications
    trxmap.set("sportcheck", trxmap.get("sportcheck") - 2000*numApplications)
  }

  //It is impossible for rule 3 and rule 5 to apply since the above rules would eliminate necessary conditions
  
  for (const [key,amount] of trxmap.entries()) { //APPLY RULE 7
    const numApplications = Math.floor(amount/100)
    points += 1 * numApplications
    trxmap.set(key, trxmap.get(key) - 100*numApplications)
  }
  return points
}

module.exports = mapTransactions;
