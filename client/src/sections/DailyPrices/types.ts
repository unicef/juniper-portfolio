export interface DailyPrice {
    id: string
    currency: string
    priceBinance: number
    priceCoinbasePro: number
    priceBitstamp: number
    averagePrice: number
    date: string
}

export interface DailyPricesData {
    dailyPrices: DailyPrice[]
}

export interface DeleteDailyPriceData {
    deleteDailyPrice: DailyPrice
}

export interface DeleteDailyPriceVariables {
    id: string
}