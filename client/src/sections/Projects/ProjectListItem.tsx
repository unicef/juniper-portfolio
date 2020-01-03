import React, { useState } from 'react'
import { useMutation } from 'react-apollo'
import { gql } from 'apollo-boost'
import { IncreaseGrantedAmount as IncreaseGrantedAmountData, IncreaseGrantedAmountVariables } from './__generated__/IncreaseGrantedAmount'

const INCREASE_GRANTED_AMOUNT = gql`
    mutation IncreaseGrantedAmount($id: ID!, $granted: Float!) {
        increaseGrantedAmount(id: $id, granted: $granted) {
            id
            name
            amountGranted
        }
    }
`

export const ProjectListItem = (props: {id: string, refetch: any}) => {
    const [granted, setGranted] = useState(0)
    
    const [increaseGrantedAmount]=useMutation<
        IncreaseGrantedAmountData,
        IncreaseGrantedAmountVariables
    >(INCREASE_GRANTED_AMOUNT)
    
    const handleIncreaseGrantedAmount = (id: string, granted: number) => {
        increaseGrantedAmount({variables:{id, granted}})
        props.refetch()
    }

    return (
        <span>
            <label htmlFor='Granted Amount'>Granted Amount</label>
            <input type='number' value={granted} onChange={e=>setGranted(parseFloat(e.target.value))} />
            <button onClick={() => {handleIncreaseGrantedAmount(props.id, granted)}}>Grant</button>
        </span>
    )
}