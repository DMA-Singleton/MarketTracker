import express from "express";
import bodyParser from "body-parser";
import StocksController from "./Controllers/StocksController";

const startServer = () => {
  const app = express();

  app.use(bodyParser.json());

  //app.use(/*errorController.get404*/); //TODO - ADD error controller
  app.use(new StocksController().router);

  app.listen(2999); //TODO - ADD to config file
};

export = startServer;
