import React from 'react'
import { server } from '../../lib/api'
import { DailyPricesData, DeleteDailyPriceData, DeleteDailyPriceVariables } from './types'

const DAILYPRICES=`
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

const DELETE_DAILYPRICE = `
    mutation DeleteDailyPrice($id: ID!) {
        deleteDailyPrice(id: $id) {
            id
        }
    }
`

interface Props {
    title: string
}

export const DailyPrices = ({ title } : Props) => {
    const fetchDailyPrices = async () => {
        const { data } = await server.fetch<DailyPricesData>({ query: DAILYPRICES })
        console.log(data.dailyPrices)
    }
    const deleteDailyPrice = async () => {
        const { data } = await server.fetch<
            DeleteDailyPriceData,
            DeleteDailyPriceVariables
        >({
            query: DELETE_DAILYPRICE,
            variables: {
                id: '5df2b8ae067a43b693c9099d'
            }
        })
        console.log(data)
    }
    return (
        <div>
            <h2>{title}</h2>
            <button onClick={fetchDailyPrices}>Query daily prices!</button>
            <button onClick={deleteDailyPrice}>Delete a daily price!</button>
        </div>
    )
}