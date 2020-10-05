const db = require("../../../Data-Layer/DataConnection");
import StockModel from "../../../Models/Stock";
import StockPriceModel from "../../../Models/StockPrice";
import YahooFinanceStockModel from "../../../Models/YahooFinanceStock";

beforeAll(() => (process.env.__DEV__ = "true"));

beforeEach(async () => {
  await db.sequelize.sync({ force: true });
});
//TODO - One model per test
test("basicOperations", async () => {
  const stockTest = await new StockModel().persist({ name: "Microsoft", symbol: "MSFT", market: "NASDAQ" });
  return new StockModel().findById(1).then((stock) => {
    expect(stock).toStrictEqual(stockTest);
  });
});

test("findAll", async () => {
  const stockTest = await new StockModel().persist({ name: "Microsoft", symbol: "MSFT", market: "NASDAQ" });
  const stockTest2 = await new StockModel().persist({ name: "Microsoft", symbol: "MSFT", market: "NASDAQ" });
  return new StockModel().findAll().then((stocks) => {
    expect(stocks).toMatchObject([stockTest, stockTest2]);
  });
});

test("fillStockPrices", async () => {
  const stockTest = await new StockModel().persist({ name: "Microsoft", symbol: "MSFT", market: "NASDAQ" });
  const stockPriceTest = await new StockPriceModel().persist({
    stockId: stockTest.id,
    date: new Date(),
    open: 25,
    close: 25,
    volume: 25,
  });
  return new StockModel().fillStockPrices(stockTest).then((stockTest) => {
    expect(stockTest.stockPrices).toMatchObject([stockPriceTest]);
  });
});

test("getLastPriceDate", async () => {
  const stockTest = await new StockModel().persist({ name: "Microsoft", symbol: "MSFT", market: "NASDAQ" });
  const stockPriceTest = await new StockPriceModel().persist({
    stockId: stockTest.id,
    date: new Date(2020, 5, 1),
    open: 25,
    close: 25,
    volume: 25,
  });
  const stockPriceTest2 = await new StockPriceModel().persist({
    stockId: stockTest.id,
    date: new Date(2020, 4, 1),
    open: 25,
    close: 25,
    volume: 25,
  });
  return new StockModel().getLastPrice(stockTest).then((stockPrice) => {
    expect(stockPrice).toStrictEqual(stockPriceTest);
  });
});

test("getLastPrice", async () => {
  const stockTest = await new StockModel().persist({ name: "Microsoft", symbol: "MSFT", market: "NASDAQ" });
  const stockPriceTest = await new StockPriceModel().persist({
    stockId: stockTest.id,
    date: new Date(2020, 5, 1),
    open: 25,
    close: 25,
    volume: 25,
  });
  const stockPriceTest2 = await new StockPriceModel().persist({
    stockId: stockTest.id,
    date: new Date(2020, 4, 1),
    open: 25,
    close: 25,
    volume: 25,
  });
  return new StockModel().getLastPrice(stockTest).then((stockPrice) => {
    expect(stockPrice).toStrictEqual(stockPriceTest);
  });
});

test("getYahooFinanceStock", async () => {
  const stockTest = await new StockModel().persist({ name: "Microsoft", symbol: "MSFT", market: "NASDAQ" });
  const yahooFinanceStockTest = await new YahooFinanceStockModel().persist({ stockId: stockTest.id, yfStockName: "AAPL" });
  return new StockModel().getYahooFinanceStock(stockTest).then((yahooFinanceStock) => {
    expect(yahooFinanceStock).toStrictEqual(yahooFinanceStockTest);
  });
});

test("persist With repeated id", async () => {
  const stockTest = await new StockModel().persist({ id: 1, name: "Microsoft", symbol: "MSFT", market: "NASDAQ" });
  const stockTest2 = await new StockModel().persist({ id: 1, name: "Microsoft", symbol: "MSFT", market: "NASDAQ" });
  return new StockModel().findAll().then((stocks) => {
    expect(stocks).toMatchObject([stockTest]);
  });
});
