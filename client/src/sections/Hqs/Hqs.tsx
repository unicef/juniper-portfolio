import React, { useState } from 'react'
import { gql } from 'apollo-boost'
import { useQuery, useMutation } from 'react-apollo'

import { AddHq as AddHqData, AddHqVariables } from './__generated__/AddHq'
import { DeleteHq as DeleteHqData, DeleteHqVariables } from './__generated__/DeleteHq'
import { Hqs as HqsData } from './__generated__/Hqs'

import { HqListItem } from './HqListItem'

const HQS = gql`
    query Hqs {
        hqs {
            id
            name
            bitcoinPublicAddress
            ethereumPublicAddress
            amountReceived
        }
    }
`

const ADD_HQ= gql`
    mutation AddHq($name: String!, $bitcoinPublicAddress: String!, $ethereumPublicAddress: String!) {
        addHq(name: $name, bitcoinPublicAddress: $bitcoinPublicAddress, ethereumPublicAddress: $ethereumPublicAddress) {
            id
            name
        }
    }
`

const DELETE_HQ= gql`
    mutation DeleteHq($id: ID!) {
        deleteHq(id: $id) {
            id
        }
    }
`

interface Props {
    title: string
}

export const Hqs = ({ title } : Props) => {
    const [name, setName] = useState('')
    const [ethereumAddress, setEthereumAddress] = useState('')
    const [bitcoinAddress, setBitcoinAddress] = useState('')
    const [addHq] = useMutation<
        AddHqData,
        AddHqVariables
    >(ADD_HQ)
    const [deleteHq] = useMutation<
        DeleteHqData,
        DeleteHqVariables
    >(DELETE_HQ)
    const { data, loading, error, refetch } = useQuery<HqsData>(HQS)

    const handleAddHq = () => {
        addHq({variables:{name, bitcoinPublicAddress:bitcoinAddress, ethereumPublicAddress: ethereumAddress}})
    }
    const handleDeleteHq = (id: string) => {
        deleteHq({variables: {id}})
        refetch()
    }
    const hqs = data ? data.hqs : null 
    const hqList = hqs ? (
        <ul>
            {
                hqs.map(hq => {
                    return(
                        <li key = {hq.id}>
                            {hq.id} | {hq.name} | {hq.bitcoinPublicAddress} | {hq.ethereumPublicAddress} | {hq.amountReceived}
                            <HqListItem
                                id={hq.id}
                                refetch={refetch}
                            ></HqListItem>
                            <button onClick={()=>{handleDeleteHq(hq.id)}}>Delete</button>
                        </li>
                    )
                })
            }
        </ul>
    ) : null
    return (
        <div>
            <h2>{title}</h2>
            <h3>Add a new hq</h3>
            <form onSubmit={handleAddHq}>
                <label htmlFor="Name of Hq">Name of Hq</label>   
                <input onChange={e => setName(e.target.value)} value={name} type="text" name="name" id="name" /> 
                <label htmlFor="Bitcoin Address of Hq">Bitcoin Address of Hq</label>   
                <input onChange={e => setBitcoinAddress(e.target.value)} value={bitcoinAddress} type="text" name="bitcoinAddress" id="bitcoinAddress" />
                <label htmlFor="Ethereum Address of Hq">Ethereum Address of Hq</label>
                <input onChange={e => setEthereumAddress(e.target.value)} value={ethereumAddress} type="text" name="ethereumAddress" id="ethereumAddress" />
                <input type="submit" value="Add new hq" />        
            </form>
            {
                loading ? 
                    <h2>Loading</h2>
                : error ?
                    <h2>Uh oh! Something went wrong - please try again later</h2>
                : (
                    <div>
                        <h3>List of Hqs</h3>
                        {hqList}
                    </div>
                )
            }
        </div>
    )
}