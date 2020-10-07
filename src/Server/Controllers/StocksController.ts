import express from "express";
import { IStockModel, IStock } from "../../Models/Interfaces/IStockModel";
import { injectable, inject } from "inversify";
import SERVICE_IDENTIFIER from "../../ioc/serviceIdentifiers";

@injectable()
class StocksController {
  public path = "/Stocks";
  public router = express.Router();
  private stockModel: IStockModel;

  constructor(@inject(SERVICE_IDENTIFIER.STOCK_MODEL) stockModel: IStockModel) {
    this.initializeRoutes();
    this.stockModel = stockModel;
  }

  public initializeRoutes() {
    this.router.get(this.path, this.getAllStocks.bind(this));
  }

  async getAllStocks(request: express.Request, response: express.Response) {
    response.send(await this.stockModel.findAll());
  }
}

export = StocksController;
