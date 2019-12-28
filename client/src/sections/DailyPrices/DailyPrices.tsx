import React, { useState, useEffect } from 'react'
import { gql } from 'apollo-boost'
import { useQuery, useMutation } from 'react-apollo'
import { DailyPrices as DailyPricesData } from './__generated__/DailyPrices'
import { DeleteDailyPrice as DeleteDailyPriceData, DeleteDailyPriceVariables} from './__generated__/DeleteDailyPrice'
import { AddDailyPrice as AddDailyPriceData, AddDailyPriceVariables} from './__generated__/AddDailyPrice'

const DAILY_PRICES= gql`
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
const ADD_DAILY_PRICE = gql`
    mutation AddDailyPrice($currency:String!, $priceBinance:String!, $priceBitstamp:String!, $priceCoinbasePro:String!, $averagePrice:String!, $date:String!) {
        addDailyPrice(currency: $currency, priceBinance: $priceBinance, priceBitstamp: $priceBitstamp, priceCoinbasePro: $priceCoinbasePro, averagePrice: $averagePrice, date: $date) {
            id
            averagePrice
        }
    }
`
const DELETE_DAILY_PRICE = gql`
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
    const [currency, setCurrency] = useState('ETH')
    const [priceBinance, setPriceBinance] = useState('0')
    const [priceBitstamp, setPriceBitstamp] = useState('0')
    const [priceCoinbasePro, setPriceCoinbasePro] = useState('0')
    const [averagePrice, setAveragePrice] = useState('0')

    useEffect(() => {
        handleAveragePrice()
    }, [priceBinance, priceBitstamp, priceCoinbasePro])
    const [deleteDailyPrice, { loading: deleteDailyPriceLoading, error: deleteDailyPriceError }] = useMutation<
        DeleteDailyPriceData, 
        DeleteDailyPriceVariables
    >(DELETE_DAILY_PRICE)

    const [addDailyPrice, { loading: addDailyPriceLoading, error: addDailyPriceError }] = useMutation<
        AddDailyPriceData, 
        AddDailyPriceVariables
    >(ADD_DAILY_PRICE)

    const { data, loading, error, refetch } = useQuery<DailyPricesData>(DAILY_PRICES)
    
    const handleDeleteDailyPrice = async (id: string) => {
        deleteDailyPrice({ variables: {id} })
        refetch()
    }
    const handleAddDailyPrice = async () => {
        addDailyPrice({ variables: {currency, priceBinance, priceBitstamp, priceCoinbasePro, averagePrice, date: Date.now().toString()}})
        refetch()
    }
    const handleAveragePrice = () => {
        setAveragePrice(((parseFloat(priceBinance) + parseFloat(priceBitstamp) + parseFloat(priceCoinbasePro))/3).toString())
    }
    const dailyPrices = data ? data.dailyPrices : null 
    const dailyPricesList = dailyPrices ? (
        <ul>
            {dailyPrices.map(dailyPrice => {
                return (
                    <li key={dailyPrice.id}>
                        {dailyPrice.id} | {'$' + parseFloat(dailyPrice.averagePrice).toFixed(2) + ' ' + dailyPrice.currency}{" "}
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
            <h3>Add new daily price</h3>
            <form onSubmit={handleAddDailyPrice}>
                <label htmlFor="Currency">Currency</label>   
                <select name="currency" onChange={e => setCurrency(e.target.value)}>
                    <option value="ETH">Ethereum</option>
                    <option value="BTC">Bitcoin</option>
                </select>
                <label htmlFor="Price from Binance">Price from Binance</label>   
                <input onChange={e => setPriceBinance(e.target.value)} value={priceBinance} type="number" name="priceBinance" id="priceBinance" /> 
                <label htmlFor="Price from Bitstamp">Price from Bitstamp</label>   
                <input onChange={e => setPriceBitstamp(e.target.value)} value={priceBitstamp} type="number" name="priceBitstamp" id="priceBitstamp" />
                <label htmlFor="Price from Coinbase Pro">Price from Coinbase Pro</label>
                <input onChange={e => setPriceCoinbasePro(e.target.value)} value={priceCoinbasePro} type="number" name="priceCoinbasePro" id="priceCoinbasePro" />
                <label htmlFor="Average Price">Average Price</label>
                <span>{'$'+averagePrice}</span>
                <input type="submit" value="Add new price" />    
            </form>  
            {
                loading ? 
                    <h2>Loading...</h2>
                : error ?
                    <h2>Uh oh! Something went wrong - please try again later</h2>
                :
                    ( 
                        <div>
                        <h3>List of Daily Prices</h3>
                        {dailyPricesList}
                        {deleteDailyPriceLoadingMessage}
                        {deleteDailyPriceErrorMessage}
                        </div>
                        
                    )
            }
        </div>
    )
}