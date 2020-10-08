import express from "express";
import Stock from "../Models/Stock";

class StocksController {
  public path = "/Stocks";
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get(this.path, this.getAllStocks);
  }

  async getAllStocks(request: express.Request, response: express.Response) {
    response.send(await new Stock().findAll());
  }
}

export = StocksController;
