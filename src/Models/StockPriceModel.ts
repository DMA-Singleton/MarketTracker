const stockPriceDataAccess = require("../Data-Layer/DataConnection").Stock_Price;
import { BaseModel, IBase, BaseEntity, PartialId } from "./BaseModel";

interface StockPriceEntity extends BaseEntity {
  Name?: string;
  Stock_ID: number;
  Date: Date;
  Open?: number;
  Close?: number;
  Volume?: number;
}

interface IStockPrice extends IBase {
  stockId: number;
  date: Date;
  open?: number;
  close?: number;
  volume?: number;
}

class StockPriceModel extends BaseModel<IStockPrice, StockPriceEntity> {
  constructor() {
    super();
    this.dataAccess = stockPriceDataAccess;
  }

  protected entityMap(entity: StockPriceEntity): IStockPrice {
    return {
      id: entity.ID,
      stockId: entity.Stock_ID,
      date: entity.Date,
      open: entity.Open,
      close: entity.Close,
      volume: entity.Volume,
    };
  }

  protected entityUnMap(model: IStockPrice): StockPriceEntity {
    return {
      ID: model.id,
      Stock_ID: model.stockId,
      Date: model.date,
      Open: model.open,
      Close: model.close,
      Volume: model.volume,
    };
  }

  protected new({ id = 0, ...opts }: PartialId<IStockPrice>) {
    var model: IStockPrice = {
      id: id,
      ...opts,
    };
    return model;
  }

  protected async checkIdentityConstraints(model: IStockPrice) {
    const entity = await this.dataAccess.findOne({
      where: { Date: model.date, Stock_ID: model.stockId },
    });
    if (entity !== null) return false;
    return true;
  }

  async findAllByStockId(id: number) {
    const stockPrices = await this.dataAccess.findAll({
      where: { Stock_ID: id },
    });
    return await stockPrices.map((e: any) => this.entityMap(e));
  }

  async getLatestPriceOfStockId(id: number) {
    const entity = await this.dataAccess.findAll({
      where: { Stock_ID: id },
      limit: 1,
      order: [["Date", "DESC"]],
    });

    if (entity.length === 0) return null;

    return this.entityMap(entity[0]);
  }
}

export = StockPriceModel;
