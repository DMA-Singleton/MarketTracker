const db = require("../../../Data-Layer/DataConnection");
import StockModel from "../../../Models/Stock";
import StockPriceModel from "../../../Models/StockPrice";

beforeAll(() => (process.env.__DEV__ = "true"));

beforeEach(async () => {
  await db.sequelize.sync({ force: true });
});

test("basicOperations", async () => {
  const stockTest = await new StockModel().persist({ name: "Microsoft", symbol: "MSFT", market: "NASDAQ" });
  const stockPriceTest = await new StockPriceModel().persist({
    stockId: stockTest.id,
    date: new Date(),
    open: 25,
    close: 26,
    volume: 25,
  });
  return new StockPriceModel().findById(1).then((stockPrice) => {
    expect(stockPrice).toStrictEqual(stockPriceTest);
  });
});

test("findAllByStockId", async () => {
  const stockTest = await new StockModel().persist({ name: "Microsoft", symbol: "MSFT", market: "NASDAQ" });
  const stockPriceTest = await new StockPriceModel().persist({
    stockId: stockTest.id,
    date: new Date(2020, 1, 1),
    open: 25,
    close: 25,
    volume: 25,
  });
  const stockPriceTest2 = await new StockPriceModel().persist({
    stockId: stockTest.id,
    date: new Date(2020, 1, 2),
    open: 25,
    close: 25,
    volume: 25,
  });
  return new StockPriceModel().findAllByStockId(stockTest.id).then((stockPrices) => {
    expect(stockPrices).toMatchObject([stockPriceTest, stockPriceTest2]);
  });
});

test("persist with identity fail", async () => {
  const stockTest = await new StockModel().persist({ name: "Microsoft", symbol: "MSFT", market: "NASDAQ" });
  const stockPriceTest = await new StockPriceModel().persist({
    stockId: stockTest.id,
    date: new Date(2020, 1, 1),
    open: 25,
    close: 25,
    volume: 25,
  });
  const stockPriceTest2 = await new StockPriceModel().persist({
    stockId: stockTest.id,
    date: new Date(2020, 1, 1),
    open: 25,
    close: 25,
    volume: 25,
  });
  return new StockPriceModel().findAllByStockId(stockTest.id).then((stockPrices) => {
    expect(stockPrices).toMatchObject([stockPriceTest]);
  });
});

test("getLatestPriceOfStockId without prices", async () => {
  const stockTest = await new StockModel().persist({ name: "Microsoft", symbol: "MSFT", market: "NASDAQ" });
  return new StockPriceModel().getLatestPriceOfStockId(stockTest.id).then((stockPrice) => {
    expect(stockPrice).toStrictEqual(null);
  });
});
