import express from "express";
import bodyParser from "body-parser";

const startServer = () => {
  const app = express();

  app.use(bodyParser.urlencoded({ extended: false }));

  //app.use(/*errorController.get404*/); //TODO - ADD error controller

  app.listen(2999); //TODO - ADD to config file
};

export = startServer;
