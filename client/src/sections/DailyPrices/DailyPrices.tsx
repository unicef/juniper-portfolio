import React from 'react'
import { server, useQuery } from '../../lib/api'
import { 
        DailyPricesData, 
        DeleteDailyPriceData, 
        DeleteDailyPriceVariables,
} from './types'

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
    const { data, loading, refetch } = useQuery<DailyPricesData>(DAILYPRICES)
    
    const deleteDailyPrice = async (id: string) => {
        await server.fetch<
            DeleteDailyPriceData,
            DeleteDailyPriceVariables
        >({
            query: DELETE_DAILYPRICE,
            variables: {
                id
            }
        })
        refetch()
    }
    const dailyPrices = data ? data.dailyPrices : null 
    const dailyPricesList = dailyPrices ? (
        <ul>
            {dailyPrices.map(dailyPrice => {
                return (
                    <li key={dailyPrice.id}>
                        {dailyPrice.id}{" "}
                        <button onClick={() => {deleteDailyPrice(dailyPrice.id)}}>Delete</button>
                    </li>
                )
            })}
        </ul>
    ) : null

    
    return (
        <div>
            <h2>{title}</h2>
            {
                loading ? 
                    <h2>Loading...</h2>
                :
                    dailyPricesList
            }
            
        </div>
    )
}