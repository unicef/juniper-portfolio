import React from 'react'
import { server } from '../../lib/api'
import { 
    BlockchainTransactionsData,
    DeleteBlockchainTransactionData,
    DeleteBlockchainTransactionVariables
 } from './types'

const BLOCKCHAINTRANSACTIONS=`
    query BlockchainTransactions {
        blockchainTransactions {
            id
            transactionHash
            timestamp
            from
            to
            currency
            additionalNotes
            block
            amountTransferred
            value
            fee
            
            toHq
            toProject
            toNatCom

        }
    }
`

const DELETE_BLOCKCHAINTRANSACTION = `
    mutation DeleteBlockchainTransaction($id: ID!) {
        deleteBlockchainTransaction(id: $id) {
            id
        }
    }
`

interface Props {
    title: string
}

export const BlockchainTransactions = ({ title } : Props) => {
    const fetchBlockchainTransactions = async () => {
        const { data } = await server.fetch<BlockchainTransactionsData>({ query: BLOCKCHAINTRANSACTIONS })
        console.log(data)
    }
    const deleteBlockchainTransaction = async () => {
        const { data } = await server.fetch<
            DeleteBlockchainTransactionData,
            DeleteBlockchainTransactionVariables
        >({
            query: DELETE_BLOCKCHAINTRANSACTION,
            variables: {
                id: ''
            }
        })
        console.log(data)
    }
    return (
        <div>
            <h2>{title}</h2>
            <button onClick={fetchBlockchainTransactions}>Query blockchain transactions!</button>
            <button onClick={deleteBlockchainTransaction}>Delete a blockchain transaction!</button>
        </div>
    )
}