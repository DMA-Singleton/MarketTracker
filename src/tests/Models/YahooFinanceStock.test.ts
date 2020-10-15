const db = require("../../Data-Layer/DataConnection");
import StockModel from "../../Models/StockModel";
import StockPriceModel from "../../Models/StockPriceModel";
import YahooFinanceStockModel from "../../Models/YahooFinanceStockModel";

beforeEach(async () => {
  await db.sequelize.sync({ force: true });
});

test("basicOperations", async () => {
  const stockModel = new StockModel(new StockPriceModel(), new YahooFinanceStockModel());
  const yahooFinanceStockModel = new YahooFinanceStockModel();
  const stockTest = await stockModel.persist({ name: "Microsoft", symbol: "MSFT", market: "NASDAQ" });
  const yahooFinanceStockTest = await yahooFinanceStockModel.persist({ stockId: stockTest.id, yfStockName: "AAPL" });
  yahooFinanceStockTest.yfStockName = "AAPL2";
  await yahooFinanceStockModel.persist(yahooFinanceStockTest);
  return yahooFinanceStockModel.findById(stockTest.id).then((yahooFinanceStock) => {
    expect(yahooFinanceStock).toStrictEqual(yahooFinanceStockTest);
  });
});

test("findByStockId", async () => {
  const stockModel = new StockModel(new StockPriceModel(), new YahooFinanceStockModel());
  const yahooFinanceStockModel = new YahooFinanceStockModel();
  const stockTest = await stockModel.persist({ name: "Microsoft", symbol: "MSFT", market: "NASDAQ" });
  const yahooFinanceStockTest = await yahooFinanceStockModel.persist({ stockId: stockTest.id, yfStockName: "AAPL" });
  return yahooFinanceStockModel.findByStockId(stockTest.id).then((yahooFinanceStock) => {
    expect(yahooFinanceStock).toStrictEqual(yahooFinanceStockTest);
  });
});

test("findByStockId Not Found", async () => {
  const stockModel = new StockModel(new StockPriceModel(), new YahooFinanceStockModel());
  const yahooFinanceStockModel = new YahooFinanceStockModel();
  const stockTest = await stockModel.persist({ name: "Microsoft", symbol: "MSFT", market: "NASDAQ" });
  return yahooFinanceStockModel.findByStockId(stockTest.id).then((yahooFinanceStock) => {
    expect(yahooFinanceStock).toStrictEqual(null);
  });
});
