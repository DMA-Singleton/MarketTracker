const stockDataAccess = require("../Data-Layer/DataConnection").Stock;
const stockPriceDataAccess = require("../Data-Layer/DataConnection").Stock_Price; //TODO - REMOVE IT
const db = require("../Data-Layer/DataConnection"); //TODO - RETHINK Op
import StockPrice from "./StockPrice";
import YahooFinanceStock from "./YahooFinanceStock";
import { BaseModel, BaseModelOptions, BaseEntity } from "./BaseModel";

interface StockOptions extends BaseModelOptions {
  name?: string;
  symbol?: string;
  market?: string;
}

interface StockEntity extends BaseEntity {
  Name?: string;
  Symbol?: string;
  Market?: string;
}

class Stock extends BaseModel<Stock, StockEntity, StockOptions> {
  public name?: string;
  public symbol?: string;
  public market?: string;
  public stockPrices: StockPrice[] = [];
  public static dataAccess: any = stockDataAccess;

  constructor({ ...opts }: StockOptions = {}) {
    super({ ...opts });
  }

  protected entityMap(entity: StockEntity): Stock {
    return new Stock({
      id: entity.ID,
      name: entity.Name,
      symbol: entity.Symbol,
      market: entity.Market,
    });
  }

  protected entityUnMap(): StockEntity {
    return { ID: this.id, Name: this.name, Symbol: this.symbol, Market: this.market };
  }

  async fillStockPrices() {
    this.stockPrices = await new StockPrice().findAllByStockId(this.id);
    return this;
  }

  async getLastPrice() {
    return new StockPrice().getLatestPriceOfStockId(this.id);
  }

  async getYahooFinanceStock() {
    return await new YahooFinanceStock().findByStockId(this.id);
  }
}

export = Stock;
