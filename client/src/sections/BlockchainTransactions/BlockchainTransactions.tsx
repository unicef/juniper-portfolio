import React, { useState } from 'react'
import { server } from '../../lib/api'
import { 
    BlockchainTransaction,
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
    const [blockchainTransactions, setBlockchainTransactions] = useState<BlockchainTransaction[] | null>(null)
    
    const fetchBlockchainTransactions = async () => {
        const { data } = await server.fetch<BlockchainTransactionsData>({ query: BLOCKCHAINTRANSACTIONS })
        console.log(data)
        // setBlockchainTransactions(data.blockchainTransactions)
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

    const blockchainTransactionsList = blockchainTransactions ? (
        <ul>
            {blockchainTransactions.map(blockchainTransaction => {
                return <li key={blockchainTransaction.id}>{blockchainTransaction.id}</li>
            })}
        </ul>
    ) : null
    return (
        <div>
            <h2>{title}</h2>
            {blockchainTransactionsList}
            <button onClick={fetchBlockchainTransactions}>Query blockchain transactions!</button>
            <button onClick={deleteBlockchainTransaction}>Delete a blockchain transaction!</button>
        </div>
    )
}