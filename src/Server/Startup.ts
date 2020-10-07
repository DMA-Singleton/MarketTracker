import express from "express";
import bodyParser from "body-parser";
import StocksController from "./Controllers/StocksController";
import container from "../ioc/ioc";
import SERVICE_IDENTIFIER from "../ioc/serviceIdentifiers";

const startServer = () => {
  const app = express();

  app.use(bodyParser.json());

  //app.use(/*errorController.get404*/); //TODO - ADD error controller\
  const controller = container.get<StocksController>(SERVICE_IDENTIFIER.STOCK_CONTROLLER);
  app.use(controller.router);

  app.listen(2999); //TODO - ADD to config file
};

export = startServer;
