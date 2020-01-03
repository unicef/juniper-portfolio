import React, { useState } from 'react'
import { gql } from 'apollo-boost'
import { useQuery, useMutation } from 'react-apollo'
import { AddFundraisingArm as AddFundraisingArmData, AddFundraisingArmVariables } from './__generated__/AddFundraisingArm'
import { DeleteFundraisingArmVariables, DeleteFundraisingArm as DeleteFundraisingArmData } from './__generated__/DeleteFundraisingArm'
import { FundraisingArms as FundraisingArmsData } from './__generated__/FundraisingArms'
import { FundraisingArmListItem } from './FundraisingArmListItem'

const FUNDRAISING_ARMS = gql`
    query FundraisingArms {
        fundraisingArms {
            id
            name
            bitcoinPublicAddress
            ethereumPublicAddress
            amountRaised
        }
    }
`

const ADD_FUNDRAISING_ARM = gql`
    mutation AddFundraisingArm($name: String!, $bitcoinPublicAddress: String!, $ethereumPublicAddress: String!) {
        addFundraisingArm(name: $name, bitcoinPublicAddress: $bitcoinPublicAddress, ethereumPublicAddress: $ethereumPublicAddress) {
            id
            name
        }
    }
`

const DELETE_FUNDRAISING_ARM = gql`
    mutation DeleteFundraisingArm($id: ID!) {
        deleteFundraisingArm(id: $id) {
            id
        }
    }
`

interface Props {
    title: string
}

export const FundraisingArms = ({ title } : Props) => {
    const [name, setName] = useState('')
    const [ethereumAddress, setEthereumAddress] = useState('')
    const [bitcoinAddress, setBitcoinAddress] = useState('')

    const [addFundraisingArm] = useMutation<
        AddFundraisingArmData,
        AddFundraisingArmVariables
    >(ADD_FUNDRAISING_ARM)
    const [deleteFundraisingArm] = useMutation<
        DeleteFundraisingArmData,
        DeleteFundraisingArmVariables
    >(DELETE_FUNDRAISING_ARM)
    const { data, loading, error, refetch } = useQuery<FundraisingArmsData>(FUNDRAISING_ARMS)
    
    const handleAddFundraisingArm = () => {
        addFundraisingArm({variables:{name, bitcoinPublicAddress: bitcoinAddress, ethereumPublicAddress: ethereumAddress}})
        refetch()
    }
    const handleDeleteFundraisingArm = (id: string) => {
        deleteFundraisingArm({variables: {id}})
        refetch()
    }
    const fundraisingArms = data ? data.fundraisingArms : null 

    const fundraisingArmList = fundraisingArms ? (
        <ul>
            {
                fundraisingArms.map(fundraisingArm => {
                    return (
                        <li key = {fundraisingArm.id}>
                            {fundraisingArm.id} | {fundraisingArm.name} | {fundraisingArm.bitcoinPublicAddress} | {fundraisingArm.ethereumPublicAddress} | {fundraisingArm.amountRaised}
                            <FundraisingArmListItem
                                id={fundraisingArm.id}
                                refetch={refetch}
                            />
                        <button onClick={() => {handleDeleteFundraisingArm(fundraisingArm.id)}}>Delete</button>
                        </li>
                    )
                })
            }
        </ul>
    ) : null
    return (
        <div>
            <h2>{title}</h2>
            <h3>Add a new fundraising arm</h3>
                <form onSubmit={handleAddFundraisingArm}>
                    <label htmlFor="Name of Fundraising Arm">Name of Fundraising Arm</label>   
                    <input onChange={e => setName(e.target.value)} value={name} type="text" name="name" id="name" /> 
                    <label htmlFor="Bitcoin Address of Fundraising Arm">Bitcoin Address of Fundraising Arm</label>   
                    <input onChange={e => setBitcoinAddress(e.target.value)} value={bitcoinAddress} type="text" name="bitcoinAddress" id="bitcoinAddress" />
                    <label htmlFor="Ethereum Address of Fundraising Arm">Ethereum Address of Fundraising Arm</label>
                    <input onChange={e => setEthereumAddress(e.target.value)} value={ethereumAddress} type="text" name="ethereumAddress" id="ethereumAddress" />
                    <input type="submit" value="Add new fundraising arm" />  
                </form>
            {
                loading ? 
                    <h2>Loading...</h2>
                : error ?
                    <h2>Uh oh! Something went wrong - please try again later</h2>
                :
                    ( 
                        <div>
                        <h3>List of Fundraising Arms</h3>
                        {fundraisingArmList}
                        </div>
                        
                    )
            }
        </div>
    ) 
}