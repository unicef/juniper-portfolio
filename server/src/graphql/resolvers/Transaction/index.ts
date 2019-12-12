import { IResolvers } from 'apollo-server-express'
import { Database, Transaction } from '../../../lib/types'
import { ObjectId } from 'mongodb'

export const transactionResolvers: IResolvers = {
    Transaction: {
        id: (transaction: Transaction): string => transaction._id.toString()
    },
    Query: {
        transactions: async (
            _root: undefined, 
            _args: {}, 
            { db }: { db: Database })
        : Promise<Transaction[]> => {
            return await db.transactions.find({}).toArray()
        }
    },
    Mutation: {
        addTransaction: () => {
            return 'Adding transaction'
        },
        editTransaction: () => {
            return 'Editing transaction'
        },
        deleteTransaction: async (
            _root: undefined, 
            { id }: { id: string }, 
            { db }: { db: Database }
        ): Promise<Transaction> => {
            const deleteRes = await db.transactions.findOneAndDelete({
                _id: new ObjectId(id)
            })
            if(!deleteRes.value) {
                throw new Error('failed to delete result')
            }
            return deleteRes.value
        }
    }
}