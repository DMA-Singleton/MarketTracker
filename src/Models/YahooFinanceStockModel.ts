const yahooFinanceStockDataAccess = require("../Data-Layer/DataConnection").YahooFinance_Stock;
import { BaseModel, BaseEntity, PartialId } from "./BaseModel";
import { IYahooFinanceStock, IYahooFinanceStockModel } from "./Interfaces/IYahooFinanceStockModel";

interface YahooFinanceStockEntity extends BaseEntity {
  Stock_ID: number;
  YF_StockName: string;
}

interface IYahooFinanceStock extends IBase {
class YahooFinanceStockModel extends BaseModel<IYahooFinanceStock, YahooFinanceStockEntity> implements IYahooFinanceStockModel {
  constructor() {
    super();
    this.dataAccess = yahooFinanceStockDataAccess;
  }

  protected entityMap(entity: YahooFinanceStockEntity): IYahooFinanceStock {
    return {
      id: entity.ID,
      stockId: entity.Stock_ID,
      yfStockName: entity.YF_StockName,
    };
  }

  protected entityUnMap(model: IYahooFinanceStock): YahooFinanceStockEntity {
    return { ID: model.id, Stock_ID: model.stockId, YF_StockName: model.yfStockName };
  }

  protected new({ id = 0, ...opts }: PartialId<IYahooFinanceStock>) {
    var model: IYahooFinanceStock = {
      id: id,
      stockId: opts.stockId,
      yfStockName: opts.yfStockName,
    };
    Object.assign(model, opts);
    return model;
  }

  async findByStockId(id: number) {
    const entity = await this.dataAccess.findOne({ where: { Stock_ID: id } });
    return entity === null ? null : this.entityMap(entity);
  }
}

export = YahooFinanceStockModel;
