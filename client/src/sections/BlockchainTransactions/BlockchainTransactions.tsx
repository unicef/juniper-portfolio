import React, { useState } from 'react'
import { gql } from 'apollo-boost'
import { useQuery, useMutation } from 'react-apollo'

import {BlockchainTransactions as BlockchainTransactionsData } from './__generated__/BlockchainTransactions'
import {AddBlockchainTransaction as AddBlockchainTransactionData, AddBlockchainTransactionVariables } from './__generated__/AddBlockchainTransaction'
import {DeleteBlockchainTransaction as DeleteBlockchainTransactionData, DeleteBlockchainTransactionVariables} from './__generated__/DeleteBlockchainTransaction'
import { BlockchainTransactionListItem } from './BlockchainTransactionListItem'

const BLOCKCHAIN_TRANSACTIONS = gql`
    query BlockchainTransactions {
        blockchainTransactions {
            id
            transactionHash
            from
            to
            currency
            amountTransferred
            value
            additionalNotes
            fee
            toFundraisingArm
            toHq
            toProject
        }
    }
`

const ADD_BLOCKCHAIN_TRANSACTION = gql`
    mutation AddBlockchainTransaction($transactionHash: String!, $from: String!, $to: String!, $currency: String!, $additionalNotes: String!, $block: Int!, $amountTransferred: Float!, $value: Float!, $fee: Float!, $toFundraisingArm: Boolean!, $toHq: Boolean!, $toProject: Boolean!) {
        addBlockchainTransaction(transactionHash: $transactionHash, from: $from, to: $to, currency: $currency, additionalNotes: $additionalNotes, block: $block, amountTransferred: $amountTransferred, value: $value, fee: $fee, toFundraisingArm: $toFundraisingArm, toHq: $toHq, toProject: $toProject) {
            id
            transactionHash
            from
            to
            currency
            amountTransferred
            value
            fee
            toFundraisingArm
            toHq
            toProject
        }
    }
`

const DELETE_BLOCKCHAIN_TRANSACTION = gql`
    mutation DeleteBlockchainTransaction($id: ID!) {
        deleteBlockchainTransaction(id: $id) {
            id
            transactionHash
            from
            to
            currency
            amountTransferred
            value
            fee
            toFundraisingArm
            toHq
            toProject
        }
    }
`

interface Props {
    title: string
}

export const BlockchainTransactions = ({ title } : Props) => {
    const [transactionHash, setTransactionHash] = useState('')
    const [from, setFrom] = useState('')
    const [to, setTo] = useState('')
    const [currency, setCurrency] = useState('bitcoin')
    const [additionalNotes, setAdditionalNotes] = useState('')
    const [amountTransferred, setAmountTransferred] = useState(0)
    const [value, setValue] = useState(0)
    const [block, setBlock] = useState(0)
    const [fee, setFee] = useState(0)
    const [toFundraisingArm, setToFundraisingArm] = useState(false)
    const [toHq, setToHq] = useState(false)
    const [toProject, setToProject] = useState(false)

    const { data, loading, error, refetch } = useQuery<BlockchainTransactionsData>(BLOCKCHAIN_TRANSACTIONS)
    const [addBlockchainTransaction] = useMutation<AddBlockchainTransactionData, AddBlockchainTransactionVariables>(ADD_BLOCKCHAIN_TRANSACTION)
    const [deleteBlockchainTransaction] = useMutation<DeleteBlockchainTransactionData, DeleteBlockchainTransactionVariables>(DELETE_BLOCKCHAIN_TRANSACTION)

    const handleAddBlockchainTransaction = async() => {
        addBlockchainTransaction({ variables: {transactionHash, from, to, currency, amountTransferred, additionalNotes, block, value, fee, toFundraisingArm, toHq, toProject}})
        refetch()
    }
    const handleDeleteBlockchainTransaction = async(id: string) => {
        deleteBlockchainTransaction({variables: {id}})
        refetch()
    }
    const blockchainTransactions = data ? data.blockchainTransactions : null 

    const blockchainTransactionsList = blockchainTransactions ? (
        <ul>
            {
                blockchainTransactions.map(blockchainTransaction => {
                    return(
                        <li key={blockchainTransaction.id}>
                            {blockchainTransaction.id} | {blockchainTransaction.transactionHash} | { blockchainTransaction.from } | { blockchainTransaction.to } | { blockchainTransaction.currency } | { `${blockchainTransaction.amountTransferred}${blockchainTransaction.currency === 'ethereum' ? 'ETH' : 'BTC'}` } | { `$${blockchainTransaction.value}USD` } | { `${blockchainTransaction.additionalNotes}` }
                            <BlockchainTransactionListItem
                                id={blockchainTransaction.id}
                                refetch={refetch}
                            />
                            <button onClick={() => {handleDeleteBlockchainTransaction(blockchainTransaction.id)}}>Delete</button>
                        </li>
                    )
                })
            }
        </ul>
    ) : null 
    return (
        <div>
            <h2>{title}</h2>
            <h3>Add a new blockchain transaction</h3>
            <form onSubmit={handleAddBlockchainTransaction}>
                <label htmlFor="Transaction Hash of Blockchain Transaction">Transaction Hash of Blockchain Transaction</label>   
                <input onChange={e => setTransactionHash(e.target.value)} value={transactionHash} type="text" name="name" id="name" /> 
                <label htmlFor="From of Blockchain Transaction">From of Blockchain Transaction</label>   
                <input onChange={e => setFrom(e.target.value)} value={from} type="text" name="bitcoinAddress" id="bitcoinAddress" />
                <label htmlFor="To of Blockchain Transaction">To of Blockchain Transaction</label>
                <input onChange={e => setTo(e.target.value)} value={to} type="text" name="ethereumAddress" id="ethereumAddress" />
                <label htmlFor="Currency of Blockchain Transaction">Currency of Blockchain Transaction</label>
                <select name="toFundraisingArm" onChange={e => setCurrency(e.target.value)}>
                    <option value="bitcoin">Bitcoin</option>
                    <option value="ethereum">Ethereum</option>
                </select>
                <label htmlFor="Block of Blockchain Transaction">Block of Blockchain Transaction</label>
                <input onChange={e => setBlock(parseFloat(e.target.value))} value={block} type="number" name="ethereumAddress" id="ethereumAddress" />
                <label htmlFor="Amount Transferred of Blockchain Transaction">Amount Transferred of Blockchain Transaction</label>
                <input onChange={e => setAmountTransferred(parseFloat(e.target.value))} value={amountTransferred} type="text" name="ethereumAddress" id="ethereumAddress" />
                <label htmlFor="Value of Blockchain Transaction">Value of Blockchain Transaction</label>
                <input onChange={e => setValue(parseFloat(e.target.value))} value={value} type="text" name="ethereumAddress" id="ethereumAddress" />
                <label htmlFor="Fee of Blockchain Transaction">Fee of Blockchain Transaction</label>
                <input onChange={e => setFee(parseFloat(e.target.value))} value={fee} type="text" name="ethereumAddress" id="ethereumAddress" />
                <label htmlFor="Additional Notes of Blockchain Transaction">Additional Notes of Blockchain Transaction</label>
                <input onChange={e => setAdditionalNotes(e.target.value)} value={additionalNotes} type="text" name="ethereumAddress" id="ethereumAddress" />
                <label htmlFor="To Fundraising Arm?">To Fundraising Arm?</label>
                <select name="toFundraisingArm" onChange={e => setToFundraisingArm(e.target.value === 'true' ? true : false)}>
                    <option value="true">True</option>
                    <option value="false">False</option>
                </select>
                <label htmlFor="To HQ?">Ethereum Address of Donor</label>
                <select name="toHq" onChange={e => setToHq(e.target.value === 'true' ? true : false)}>
                    <option value="true">True</option>
                    <option value="false">False</option>
                </select>
                <label htmlFor="To Project?">Ethereum Address of Donor</label>
                <select name="toProject" onChange={e => setToProject(e.target.value === 'true' ? true : false)}>
                    <option value="true">True</option>
                    <option value="false">False</option>
                </select>
                <input type="submit" value="Add new blockchain transaction" />
            </form>
            {
                loading ? 
                    <h2>Loading...</h2>
                : error ?
                    <h2>Uh oh! Something went wrong - please try again later</h2>
                :
                    ( 
                        <div>
                        <h3>List of Blockchain Transactions</h3>
                        {blockchainTransactionsList}
                        </div>
                        
                    )
            }

        </div>
    )
}