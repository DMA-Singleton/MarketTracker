const db = require("../../Data-Layer/DataConnection");
import StockModel from "../../Models/StockModel";
import StockPriceModel from "../../Models/StockPriceModel";
import YahooFinanceStockModel from "../../Models/YahooFinanceStockModel";

beforeEach(async () => {
  await db.sequelize.sync({ force: true });
});

test("basicOperations", async () => {
  const stockModel = new StockModel(new StockPriceModel(), new YahooFinanceStockModel());
  const stockPriceModel = new StockPriceModel();
  const stockTest = await stockModel.persist({ name: "Microsoft", symbol: "MSFT", market: "NASDAQ" });
  const stockPriceTest = await stockPriceModel.persist({
    stockId: stockTest.id,
    date: new Date(),
    open: 25,
    close: 26,
    volume: 25,
  });
  stockPriceTest.open = 26;
  await stockPriceModel.persist(stockPriceTest);
  return stockPriceModel.findById(1).then((stockPrice) => {
    expect(stockPrice).toStrictEqual(stockPriceTest);
  });
});

test("findAllByStockId", async () => {
  const stockModel = new StockModel(new StockPriceModel(), new YahooFinanceStockModel());
  const stockPriceModel = new StockPriceModel();
  const stockTest = await stockModel.persist({ name: "Microsoft", symbol: "MSFT", market: "NASDAQ" });
  const stockPriceTest = await stockPriceModel.persist({
    stockId: stockTest.id,
    date: new Date(2020, 1, 1),
    open: 25,
    close: 25,
    volume: 25,
  });
  const stockPriceTest2 = await stockPriceModel.persist({
    stockId: stockTest.id,
    date: new Date(2020, 1, 2),
    open: 25,
    close: 25,
    volume: 25,
  });
  return stockPriceModel.findAllByStockId(stockTest.id).then((stockPrices) => {
    expect(stockPrices).toMatchObject([stockPriceTest, stockPriceTest2]);
  });
});

test("persist with identity fail", async () => {
  const stockModel = new StockModel(new StockPriceModel(), new YahooFinanceStockModel());
  const stockPriceModel = new StockPriceModel();
  const stockTest = await stockModel.persist({ name: "Microsoft", symbol: "MSFT", market: "NASDAQ" });
  const stockPriceTest = await stockPriceModel.persist({
    stockId: stockTest.id,
    date: new Date(2020, 1, 1),
    open: 25,
    close: 25,
    volume: 25,
  });
  const t = async () => {
    const stockPriceTest2 = await stockPriceModel.persist({
      stockId: stockTest.id,
      date: new Date(2020, 1, 1),
      open: 25,
      close: 25,
      volume: 25,
    });
  };
  return await expect(t).rejects.toThrowError(new Error("model is not creatable"));
});

test("getLatestPriceOfStockId without prices", async () => {
  const stockModel = new StockModel(new StockPriceModel(), new YahooFinanceStockModel());
  const stockPriceModel = new StockPriceModel();
  const stockTest = await stockModel.persist({ name: "Microsoft", symbol: "MSFT", market: "NASDAQ" });
  return stockPriceModel.getLatestPriceOfStockId(stockTest.id).then((stockPrice) => {
    expect(stockPrice).toStrictEqual(null);
  });
});
