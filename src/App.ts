import StockHistoryTracker from "./Process/StockHistoryTracker";

new StockHistoryTracker()
  .pullAllPricesHistory()
  .then(() => console.log("finished"))
  .catch((err) => console.log("error: " + err));
