require('dotenv').config()

import { ObjectId } from 'mongodb'
import { connectDatabase } from '../database'
import { BlockchainTransaction } from '../lib/types'

const seed = async() => {
    try {
        console.log('[seed]: running...')
        const db = await connectDatabase()
        const blockchainTransactions: BlockchainTransaction[] = [
            {
                _id: new ObjectId(),
                transactionHash: '',
                timestamp: '',
                from: '',
                to: '',
                currency: 'ETH',
                additionalNotes: '',
                block: 100,
                amountTransferred: 10,
                value: 100,
                fee: 0.01,
            },
            {
                _id: new ObjectId(),
                transactionHash: '',
                timestamp: '',
                from: '',
                to: '',
                currency: 'ETH',
                additionalNotes: '',
                block: 101,
                amountTransferred: 0,
                value: 20,
                fee: 0.01,
            },
            {
                _id: new ObjectId(),
                transactionHash: '',
                timestamp: '',
                from: '',
                to: '',
                currency: 'BTC',
                additionalNotes: '',
                block: 0,
                amountTransferred: 0,
                value: 100,
                fee: 0.01,
            }
        ] 

        for(const blockchainTransaction of blockchainTransactions) {
            await db.blockchainTransactions.insertOne(blockchainTransaction)
        }

        console.log('[seed]: success')

    } catch {
        throw new Error('failed to seed database')
    }
}

seed()