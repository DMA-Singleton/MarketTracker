import container from "./ioc";
import { IStockModel } from "./Models/Interfaces/IStockModel";
import SERVICE_IDENTIFIER from "./serviceIdentifiers";

const stock = container.get<IStockModel>(SERVICE_IDENTIFIER.STOCK_MODEL);
stock.findAll().then((res) => {
  console.log(res);
});

/*import StockHistoryTracker from "./Process/StockHistoryTracker";

new StockHistoryTracker()
  .pullAllPricesHistory()
  .then(() => console.log("finished"))
  .catch((err) => console.log("error: " + err));
*/
