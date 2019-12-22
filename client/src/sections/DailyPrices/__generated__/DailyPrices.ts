/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: DailyPrices
// ====================================================

export interface DailyPrices_dailyPrices {
  __typename: "DailyPrice";
  id: string;
  currency: string;
  priceBinance: string;
  priceCoinbasePro: string;
  priceBitstamp: string;
  averagePrice: string;
  date: string;
}

export interface DailyPrices {
  dailyPrices: DailyPrices_dailyPrices[];
}
