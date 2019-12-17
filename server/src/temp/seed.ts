require('dotenv').config()

import { ObjectId } from 'mongodb'
import { connectDatabase } from '../database'
import { User, BlockchainTransaction, DailyPrice } from '../lib/types'

const seed = async() => {
    try {
        console.log('[seed]: running...')
        const db = await connectDatabase()
        const users: User[] = [
            {
                _id: new ObjectId(),
                name: 'Mehran Hydary',
                organization: 'UNICEF',
                role: 'Admin',
                email: 'mhydary@unicef.org',
                hash: 'RaNdOmSTRiNg',
                salt: 'lOLRuSERioUs'
            },
            {
                _id: new ObjectId(),
                name: 'Christina Lomazzo',
                organization: 'UNICEF',
                role: 'Admin',
                email: 'crlomazzo@unicef.org',
                hash: 'RaNdOmSTRiNg',
                salt: 'lOLRuSERioUs'
            }
        ]
        const dailyPrices: DailyPrice[] = [
            {
               _id: new ObjectId(), 
               currency: 'BTC',
               priceBinance: 7001,
               priceCoinbasePro: 7002,
               priceBitstamp: 7003,
               averagePrice: 7002,
               date: 'Today'
            },
            {
                _id: new ObjectId(), 
               currency: 'BTC',
               priceBinance: 7001,
               priceCoinbasePro: 7002,
               priceBitstamp: 7003,
               averagePrice: 7002,
               date: 'Yesterday'
            },
            {
                _id: new ObjectId(), 
               currency: 'BTC',
               priceBinance: 7001,
               priceCoinbasePro: 7002,
               priceBitstamp: 7003,
               averagePrice: 7002,
               date: 'Tomorrow'
            }
        ]
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
                toHq: false,
                toNatCom: false,
                toProject: false
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
                toHq: false,
                toNatCom: false,
                toProject: false
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
                toHq: false,
                toNatCom: false,
                toProject: false
            }
        ]
        
        for(const user of users) {
            await db.users.insertOne(user)
        }

        for(const dailyPrice of dailyPrices) {
            await db.dailyPrices.insertOne(dailyPrice)
        }

        for(const blockchainTransaction of blockchainTransactions) {
            await db.blockchainTransactions.insertOne(blockchainTransaction)
        }

        console.log('[seed]: success')

    } catch {
        throw new Error('failed to seed database')
    }
}

seed()