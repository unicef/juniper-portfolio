/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddDailyPrice
// ====================================================

export interface AddDailyPrice_addDailyPrice {
  __typename: "DailyPrice";
  id: string;
  averagePrice: string;
}

export interface AddDailyPrice {
  addDailyPrice: AddDailyPrice_addDailyPrice;
}

export interface AddDailyPriceVariables {
  currency: string;
  priceBinance: string;
  priceBitstamp: string;
  priceCoinbasePro: string;
  averagePrice: string;
  date: string;
}
