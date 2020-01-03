import React, { useState } from 'react'
import { useMutation } from 'react-apollo'
import { gql } from 'apollo-boost'
import { IncreaseReceivedAmount as IncreaseReceivedAmountData, IncreaseReceivedAmountVariables } from './__generated__/IncreaseReceivedAmount'

const INCREASE_RECEIVED_AMOUNT = gql`
    mutation IncreaseReceivedAmount($id: ID!, $received: Float!) {
        increaseReceivedAmount(id: $id, received: $received) {
            id
            name
            amountReceived
        }
    }
`

export const HqListItem = (props: { id: string, refetch: any }) => {
    const [received, setReceived] = useState(0)
    const [increaseReceivedAmount] = useMutation<
        IncreaseReceivedAmountData,
        IncreaseReceivedAmountVariables
    >(INCREASE_RECEIVED_AMOUNT)
    const handleIncreaseReceivedAmount = async(id: string, received: number) => {
        increaseReceivedAmount({variables: {id, received}})
        props.refetch()
    }
    return (
        <span>
            <label htmlFor='Received Amount'>Received Amount</label>
            <input type='number' value={received} onChange={e=>setReceived(parseFloat(e.target.value))} />
            <button onClick={() => {handleIncreaseReceivedAmount(props.id, received)}}>Receive</button>
        </span>
    )
}