import YahooFinanceMiddleware from "../Middlewares/YahooFinanceMiddleware";
import Stock from "../Models/Stock";
import StockPrice from "../Models/StockPrice";
import ProcessHelper from "../Helpers/ProcessHelper";
//TODO - TEST
class StockHistoryTracker {
  constructor() {}

  pullAllPricesHistory = async () => {
    const stocks = await new Stock().findAll();

    await Promise.all(
      stocks.map(async (s) => {
        var stockYFName = await s.getYahooFinanceStock();
        if (stockYFName !== null) {
          var yfMiddleware = new YahooFinanceMiddleware(stockYFName.yfStockName);
          //TODO - THINK ABOUT IT
          var lastPrice = await s.getLastPrice();
          if (lastPrice !== null) {
            var nextPriceDate = new Date();
            nextPriceDate.setDate(lastPrice.date.getDate() + 1);
            yfMiddleware.setStartDate(nextPriceDate);
          }
          const pi = await yfMiddleware.getPriceHistory();
          await ProcessHelper.batchProcess(pi, 50 /* TODO - remove hardcoded value*/, async (phd: any) => {
            await new StockPrice({
              id: phd.id,
              date: phd.date,
              open: phd.open,
              close: phd.close,
              volume: phd.volume,
            }).persist();
          });
        }
      })
    );
  };
}

export = StockHistoryTracker;
