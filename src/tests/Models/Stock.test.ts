const db = require("../../Data-Layer/DataConnection");
import StockModel from "../../Models/StockModel";
import StockPriceModel from "../../Models/StockPriceModel";
import YahooFinanceStockModel from "../../Models/YahooFinanceStockModel";

beforeEach(async () => {
  await db.sequelize.sync({ force: true });
});

test("basicOperations", async () => {
  const stockModel = new StockModel(new StockPriceModel(), new YahooFinanceStockModel());
  const stockTest = await stockModel.persist({ name: "Microsoft", symbol: "MSFT", market: "NASDAQ" });
  return stockModel.findById(1).then((stock) => {
    expect(stock).toStrictEqual(stockTest);
  });
});

test("findAll", async () => {
  const stockModel = new StockModel(new StockPriceModel(), new YahooFinanceStockModel());
  const stockTest = await stockModel.persist({ name: "Microsoft", symbol: "MSFT", market: "NASDAQ" });
  const stockTest2 = await stockModel.persist({ name: "Microsoft", symbol: "MSFT", market: "NASDAQ" });
  return stockModel.findAll().then((stocks) => {
    expect(stocks).toMatchObject([stockTest, stockTest2]);
  });
});

test("fillStockPrices", async () => {
  const stockModel = new StockModel(new StockPriceModel(), new YahooFinanceStockModel());
  const stockPriceModel = new StockPriceModel();
  const stockTest = await stockModel.persist({ name: "Microsoft", symbol: "MSFT", market: "NASDAQ" });
  const stockPriceTest = await stockPriceModel.persist({
    stockId: stockTest.id,
    date: new Date(),
    open: 25,
    close: 25,
    volume: 25,
  });
  return stockModel.fillStockPrices(stockTest).then((stockTest) => {
    expect(stockTest.stockPrices).toMatchObject([stockPriceTest]);
  });
});

test("getLastPriceDate", async () => {
  const stockModel = new StockModel(new StockPriceModel(), new YahooFinanceStockModel());
  const stockPriceModel = new StockPriceModel();
  const stockTest = await stockModel.persist({ name: "Microsoft", symbol: "MSFT", market: "NASDAQ" });
  const stockPriceTest = await stockPriceModel.persist({
    stockId: stockTest.id,
    date: new Date(2020, 5, 1),
    open: 25,
    close: 25,
    volume: 25,
  });
  const stockPriceTest2 = await stockPriceModel.persist({
    stockId: stockTest.id,
    date: new Date(2020, 4, 1),
    open: 25,
    close: 25,
    volume: 25,
  });
  return stockModel.getLastPrice(stockTest).then((stockPrice) => {
    expect(stockPrice).toStrictEqual(stockPriceTest);
  });
});

test("getLastPrice", async () => {
  const stockModel = new StockModel(new StockPriceModel(), new YahooFinanceStockModel());
  const stockPriceModel = new StockPriceModel();
  const stockTest = await stockModel.persist({ name: "Microsoft", symbol: "MSFT", market: "NASDAQ" });
  const stockPriceTest = await stockPriceModel.persist({
    stockId: stockTest.id,
    date: new Date(2020, 5, 1),
    open: 25,
    close: 25,
    volume: 25,
  });
  const stockPriceTest2 = await stockPriceModel.persist({
    stockId: stockTest.id,
    date: new Date(2020, 4, 1),
    open: 25,
    close: 25,
    volume: 25,
  });
  return stockModel.getLastPrice(stockTest).then((stockPrice) => {
    expect(stockPrice).toStrictEqual(stockPriceTest);
  });
});

test("getYahooFinanceStock", async () => {
  const stockModel = new StockModel(new StockPriceModel(), new YahooFinanceStockModel());
  const yahooFinanceStockModel = new YahooFinanceStockModel();
  const stockTest = await stockModel.persist({ name: "Microsoft", symbol: "MSFT", market: "NASDAQ" });
  const yahooFinanceStockTest = await yahooFinanceStockModel.persist({ stockId: stockTest.id, yfStockName: "AAPL" });
  return stockModel.getYahooFinanceStock(stockTest).then((yahooFinanceStock) => {
    expect(yahooFinanceStock).toStrictEqual(yahooFinanceStockTest);
  });
});

test("persist With repeated id", async () => {
  const stockModel = new StockModel(new StockPriceModel(), new YahooFinanceStockModel());
  const stockTest = await stockModel.persist({ id: 1, name: "Microsoft", symbol: "MSFT", market: "NASDAQ" });
  const stockTest2 = await stockModel.persist({ id: 1, name: "Microsoft", symbol: "MSFT", market: "NASDAQ" });
  return stockModel.findAll().then((stocks) => {
    expect(stocks).toMatchObject([stockTest]);
  });
});
