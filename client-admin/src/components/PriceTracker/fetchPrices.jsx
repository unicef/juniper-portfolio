import React from 'react';
import { gql } from 'apollo-boost'
import { useQuery } from 'react-apollo'

const DAILY_PRICES = gql`
    query DailyPrices {
        dailyPrices {
            id
            currency
            priceBinance
            priceCoinbasePro
            priceBitstamp
            averagePrice
            date
        }
    }
`


export const fetchPrices = (Component) => {
    return (props) => {
        const { loading, error, data } = useQuery(DAILY_PRICES);

        return <Component loading={loading} error={error} data={data} {...props} />;
    };
};