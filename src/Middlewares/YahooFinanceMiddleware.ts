import YFGetPriceHistoryRequest from "./WebMiddlewares/YahooFinanceRequests/YFGetPriceHistoryRequest";
import YFGetDividendHistoryRequest from "./WebMiddlewares/YahooFinanceRequests/YFGetDividendHistoryRequest";
//TODO - TEST
interface IPriceHistoryData {
  date: Date;
  open: number;
  close: number;
  volume: number;
}

interface IDivHistoryData {
  date: Date;
  value: number;
}

class YahooFinanceMiddleware {
  private symbol: string;
  private startDate: Date;
  private endDate: Date;

  constructor(symbol: string, startDate: Date = new Date(1990, 0, 1), endDate: Date = new Date()) {
    this.symbol = symbol;
    this.startDate = startDate;
    this.endDate = endDate;
  }

  setStartDate = (startDate: Date) => {
    if (startDate > this.endDate) throw new Error("startDate cant be greater than endDate");
    else this.startDate = startDate;
  };

  getPriceHistory = () =>
    new YFGetPriceHistoryRequest(this.symbol, this.startDate, this.endDate).retrieveData().then((data) => {
      return YahooFinanceMiddleware.parsePriceHistory(data);
    });

  getDivHistory = (symbol: string, startDate?: Date, endDate?: Date) =>
    new YFGetDividendHistoryRequest(symbol, startDate, endDate).retrieveData().then((data) => {
      return YahooFinanceMiddleware.parseDivHistory(data);
    });

  private static parsePriceHistory = (data: string) => {
    const priceHistory = data.split("\n").sort().reverse();

    priceHistory.shift(); //remove header
    const result: IPriceHistoryData[] = [];

    for (const price of priceHistory) {
      const parts = price.split(",");
      result.push({
        date: new Date(parts[0]),
        open: Number(parts[1]),
        close: Number(parts[4]),
        volume: Number(parts[6]),
      });
    }
    return result;
  };

  private static parseDivHistory = (data: string) => {
    const priceHistory = data.split("\n").sort().reverse();

    priceHistory.shift(); //remove header
    const result: IDivHistoryData[] = [];

    for (const price of priceHistory) {
      const parts = price.split(",");
      result.push({
        date: new Date(parts[0]),
        value: Number(parts[1]),
      });
    }
    return result;
  };
}

export = YahooFinanceMiddleware;
