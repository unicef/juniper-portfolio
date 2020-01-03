import React, { useState } from 'react'
import { useMutation } from 'react-apollo'
import { gql } from 'apollo-boost'
import { IncreaseRaisedAmount as IncreaseRaisedAmountData, IncreaseRaisedAmountVariables} from './__generated__/IncreaseRaisedAmount'

const INCREASE_RAISED_AMOUNT = gql`
    mutation IncreaseRaisedAmount($id: ID!, $raised: Float!) {
        increaseRaisedAmount(id: $id, raised: $raised) {
            id
            name
            amountRaised
        }
    }
`

export const FundraisingArmListItem = (props: {id: string, refetch: any}) => {
    const [raised, setRaised] = useState(0)
    const [increaseRaisedAmount] = useMutation<
        IncreaseRaisedAmountData,
        IncreaseRaisedAmountVariables
    >(INCREASE_RAISED_AMOUNT)
    const handleIncreaseRaisedAmount = async(id: string, raised: number) => {
        increaseRaisedAmount({variables: {id, raised}})
        props.refetch()
    }
    return (
        <span>
            <label htmlFor="Raised Amount">Raised Amount</label>   
            <input type='number' value={raised} onChange={e => setRaised(parseFloat(e.target.value))}/>
            <button onClick={() => {handleIncreaseRaisedAmount(props.id, raised)}}>Raise</button>
        </span>
    )
}