import React, { useState, useEffect } from 'react'
import { gql } from 'apollo-boost'
import { useQuery, useMutation } from 'react-apollo'
import { Donors as DonorsData } from './__generated__/Donors'
import { DeleteDonor as DeleteDonorData, DeleteDonorVariables} from './__generated__/DeleteDonor'
import { AddDonor as AddDonorData, AddDonorVariables} from './__generated__/AddDonor'
import { IncreaseDonationAmount as IncreaseDonationAmountData, IncreaseDonationAmountVariables} from './__generated__/IncreaseDonationAmount'
import { DonorListItem } from './DonorListItem'

const DONORS = gql`
    query Donors {
        donors {
            id
            name
            bitcoinPublicAddress
            ethereumPublicAddress
            amountDonated
        }
    }
`
const ADD_DONOR = gql`
    mutation AddDonor($name: String!, $bitcoinPublicAddress: String!, $ethereumPublicAddress: String!) {
        addDonor(name: $name, bitcoinPublicAddress: $bitcoinPublicAddress, ethereumPublicAddress: $ethereumPublicAddress) {
            id
            name
        }
    }
`

const INCREASE_DONATION_AMOUNT = gql`
    mutation IncreaseDonationAmount($id: ID!, $donation: Float!) {
        increaseDonationAmount(id: $id, donation: $donation) {
            id
            name
            amountDonated
        }
    }
`
const DELETE_DONOR = gql`
    mutation DeleteDonor($id: ID!) {
        deleteDonor(id: $id) {
            id
        }
    }
`
interface Props {
    title: string
}

export const Donors = ({ title } : Props) => {
    const [name, setName] = useState('')
    const [ethereumAddress, setEthereumAddress] = useState('')
    const [bitcoinAddress, setBitcoinAddress] = useState('')

    useEffect(() => {
        // Nothing at this time
    })
    
    const [deleteDonor, {loading: deleteDonorLoading, error: deleteDonorError}] = useMutation<
        DeleteDonorData,
        DeleteDonorVariables
    >(DELETE_DONOR)

    const[addDonor] = useMutation<
        AddDonorData,
        AddDonorVariables
    >(ADD_DONOR)

    const [increaseDonationAmount] = useMutation<
        IncreaseDonationAmountData,
        IncreaseDonationAmountVariables
    >(INCREASE_DONATION_AMOUNT)

    const { data, loading, error, refetch } = useQuery<DonorsData>(DONORS)

    const handleDeleteDonor = async(id: string) => {
        deleteDonor({variables: {id}})
        refetch()
    }

    const handleAddDonor = async() => {
        addDonor({ variables: {name, bitcoinPublicAddress: bitcoinAddress, ethereumPublicAddress: ethereumAddress}})
        refetch()
    }

    const handleIncreaseDonationAmount = async(id: string, donation: number) => {
        console.log(id, donation)
        increaseDonationAmount({variables: {id, donation}})
        refetch()
    }

    const donors = data ? data.donors : null

    const donorList = donors ? (
        <ul>
            {
                donors.map(donor => {
                    return (
                        <li key={donor.id}>
                            {donor.id} | {donor.name} | {donor.bitcoinPublicAddress} | {donor.ethereumPublicAddress} | {donor.amountDonated}
                            <DonorListItem
                                id={donor.id}
                                refetch={refetch}
                            />
                            <button onClick={() => {handleDeleteDonor(donor.id)}}>Delete</button>
                        </li>
                    )
                })
            }
        </ul>
    ) : null
    // Don't forget to add error and loading messages for each mutation / query


    return (
        <div>
            <h2>{title}</h2>
            <h3>Add a new donor</h3>
                <form onSubmit={handleAddDonor}>
                    <label htmlFor="Name of Donor">Name of Donor</label>   
                    <input onChange={e => setName(e.target.value)} value={name} type="text" name="name" id="name" /> 
                    <label htmlFor="Bitcoin Address of Donor">Bitcoin Address of Donor</label>   
                    <input onChange={e => setBitcoinAddress(e.target.value)} value={bitcoinAddress} type="text" name="bitcoinAddress" id="bitcoinAddress" />
                    <label htmlFor="Ethereum Address of Donor">Ethereum Address of Donor</label>
                    <input onChange={e => setEthereumAddress(e.target.value)} value={ethereumAddress} type="text" name="ethereumAddress" id="ethereumAddress" />
                    <input type="submit" value="Add new donor" />  
                </form>
            {
                loading ? 
                    <h2>Loading...</h2>
                : error ?
                    <h2>Uh oh! Something went wrong - please try again later</h2>
                :
                    ( 
                        <div>
                        <h3>List of Donors</h3>
                        {donorList}
                        </div>
                        
                    )
            }
        </div>
    )
}