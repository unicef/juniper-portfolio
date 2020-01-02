import React, { useState } from 'react'
import { useMutation } from 'react-apollo'
import { gql } from 'apollo-boost'
import { IncreaseDonationAmount as IncreaseDonationAmountData, IncreaseDonationAmountVariables} from './__generated__/IncreaseDonationAmount'

const INCREASE_DONATION_AMOUNT = gql`
    mutation IncreaseDonationAmount($id: ID!, $donation: Float!) {
        increaseDonationAmount(id: $id, donation: $donation) {
            id
            name
            amountDonated
        }
    }
`

export const DonorListItem = (props: {id: string, refetch: any}) => {
    const [donation, setDonation] = useState(0)
    const [increaseDonationAmount] = useMutation<
        IncreaseDonationAmountData,
        IncreaseDonationAmountVariables
    >(INCREASE_DONATION_AMOUNT)
    const handleIncreaseDonationAmount = async(id: string, donation: number) => {
        console.log(id, donation)
        increaseDonationAmount({variables: {id, donation}})
        props.refetch()
    }
    return (
        <span>
            <label htmlFor="Donation Amount">Donation Amount</label>   
            <input type='number' value={donation} onChange={e => setDonation(parseFloat(e.target.value))}/>
            <button onClick={() => {handleIncreaseDonationAmount(props.id, donation)}}>Donate</button>
        </span>
    )
}