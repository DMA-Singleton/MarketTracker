import { IBase, IBaseModel } from "./IBaseModel";

interface IStockPrice extends IBase {
  stockId: number;
  date: Date;
  open?: number;
  close?: number;
  volume?: number;
}

interface IStockPriceModel extends IBaseModel<IStockPrice> {
  findAllByStockId(id: number): Promise<IStockPrice[]>;
  getLatestPriceOfStockId(id: number): Promise<IStockPrice | null>;
}

export { IStockPrice, IStockPriceModel };
