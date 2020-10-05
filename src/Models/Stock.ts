const stockDataAccess = require("../Data-Layer/DataConnection").Stock;
const stockPriceDataAccess = require("../Data-Layer/DataConnection").Stock_Price; //TODO - REMOVE IT
const db = require("../Data-Layer/DataConnection"); //TODO - RETHINK Op
import StockPrice from "./StockPrice";
import YahooFinanceStock from "./YahooFinanceStock";
import { BaseModel, IBase, BaseEntity, PartialId } from "./BaseModel";

interface StockEntity extends BaseEntity {
  Name?: string;
  Symbol?: string;
  Market?: string;
}

interface IStock extends IBase {
  name?: string;
  symbol?: string;
  market?: string;
  stockPrices?: StockPrice[];
}

class StockModel extends BaseModel<IStock, StockEntity> {
  public static dataAccess: any = stockDataAccess;

  constructor() {
    super();
  }

  protected entityMap(entity: StockEntity): IStock {
    return {
      id: entity.ID,
      name: entity.Name,
      symbol: entity.Symbol,
      market: entity.Market,
    };
  }

  protected entityUnMap(model: IStock): StockEntity {
    return { ID: model.id, Name: model.name, Symbol: model.symbol, Market: model.market };
  }

  protected new({ id = 0, ...opts }: PartialId<IStock>) {
    var model: IStock = {
      id: id,
    };
    Object.assign(model, opts);
    return model;
  }

  async fillStockPrices(model: IStock) {
    model.stockPrices = await new StockPrice().findAllByStockId(model.id); //TODO - move to dependency
    return model;
  }

  async getLastPrice(model: IStock) {
    return new StockPrice().getLatestPriceOfStockId(model.id); //TODO - move to dependency
  }

  async getYahooFinanceStock(model: IStock) {
    return await new YahooFinanceStock().findByStockId(model.id); //TODO - move to dependency And propperty
  }
}

export = StockModel;
