//declare var __DEV__: any; //TODO - remove
import { Sequelize, DataTypes } from "sequelize";
import fs from "fs";

const db: any = {};

var sequelize: Sequelize;
//TODO - rethink
if (process.env.__DEV__) {
  sequelize = new Sequelize("FINANCIAL_TEST", "agufa", "agufa", {
    host: "localhost",
    dialect: "sqlite",
    storage: ":memory:",
    define: {
      timestamps: false,
    },
    logging: false,
    pool: {
      max: 100,
      min: 0,
      acquire: 60000,
      idle: 10000,
    },
  });
} else {
  sequelize = new Sequelize("FINANCIAL", "agufa", "agufa", {
    host: "localhost",
    dialect: "mysql",
    define: {
      timestamps: false,
    },
  });
}

fs.readdirSync(__dirname + "/Data-Models/").forEach((file) => {
  var model = require("./Data-Models/" + file)(sequelize, DataTypes);
  db[model.name] = model;
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
