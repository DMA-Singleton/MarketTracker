import "reflect-metadata";
import { Container } from "inversify";
import SERVICE_IDENTIFIER from "./serviceIdentifiers";

//#region Models
//interfaces
import { IStockModel } from "./Models/Interfaces/IStockModel";
import { IStockPriceModel } from "./Models/Interfaces/IStockPriceModel";
import { IYahooFinanceStockModel } from "./Models/Interfaces/IYahooFinanceStockModel";
//classes
import StockModel from "./Models/StockModel";
import StockPriceModel from "./Models/StockPriceModel";
import YahooFinanceStockModel from "./Models/YahooFinanceStockModel";
//#endregion

let container = new Container();

//#region Models
container.bind<IStockModel>(SERVICE_IDENTIFIER.STOCK_MODEL).to(StockModel);
container.bind<IStockPriceModel>(SERVICE_IDENTIFIER.STOCK_PRICE_MODEL).to(StockPriceModel);
container.bind<IYahooFinanceStockModel>(SERVICE_IDENTIFIER.YAHOO_FINANCE_STOCK_MODEL).to(YahooFinanceStockModel);
//#endregion

export default container;
