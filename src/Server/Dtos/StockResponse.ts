interface StockResponse {
  name?: string;
  symbol?: string;
  market?: string;
  lastPriceDate?: Date;
}

interface StockPrice {
  date: Date;
  open?: number;
  close?: number;
  volume?: number;
}

interface ExtendedStockResponse extends StockResponse {
  stockPrices?: StockPrice[];
}

export { StockResponse, ExtendedStockResponse };
