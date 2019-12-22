import React from 'react'
import { server, useQuery, useMutation } from '../../lib/api'
import { 
        DailyPricesData, 
        DeleteDailyPriceData, 
        DeleteDailyPriceVariables,
} from './types'

const DAILY_PRICES=`
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

const DELETE_DAILY_PRICE = `
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
    const [deleteDailyPrice, { loading: deleteDailyPriceLoading, error: deleteDailyPriceError }] = useMutation<
        DeleteDailyPriceData, 
        DeleteDailyPriceVariables
    >(DELETE_DAILY_PRICE)

    const { data, loading, error, refetch } = useQuery<DailyPricesData>(DAILY_PRICES)
    
    const handleDeleteDailyPrice = async (id: string) => {
        deleteDailyPrice({ id })
        refetch()
    }
    const dailyPrices = data ? data.dailyPrices : null 
    const dailyPricesList = dailyPrices ? (
        <ul>
            {dailyPrices.map(dailyPrice => {
                return (
                    <li key={dailyPrice.id}>
                        {dailyPrice.id}{" "}
                        <button onClick={() => {handleDeleteDailyPrice(dailyPrice.id)}}>Delete</button>
                    </li>
                )
            })}
        </ul>
    ) : null

    
    const deleteDailyPriceLoadingMessage = deleteDailyPriceLoading ? (
        <h4>Deletion in progress...</h4>
    ) : null;

    const deleteDailyPriceErrorMessage = deleteDailyPriceError ? (
        <h4>
          Uh oh! Something went wrong with deleting :(. Please try again soon.
        </h4>
      ) : null;
    return (
        <div>
            <h2>{title}</h2>
            {
                loading ? 
                    <h2>Loading...</h2>
                : error ?
                    <h2>Uh oh! Something went wrong - please try again later</h2>
                :
                    ( 
                        <div>
                        {dailyPricesList}
                        {deleteDailyPriceLoadingMessage}
                        {deleteDailyPriceErrorMessage}
                        </div>
                        
                    )
            }
            
        </div>
    )
}