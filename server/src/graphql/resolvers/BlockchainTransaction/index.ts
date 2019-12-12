import { IResolvers } from 'apollo-server-express'
import { Database, BlockchainTransaction } from '../../../lib/types'
import { ObjectId } from 'mongodb'

export const blockchainTransactionResolvers: IResolvers = {
    BlockchainTransaction: {
        id: (blockchainTransaction: BlockchainTransaction): string => blockchainTransaction._id.toString()
    },
    Query: {
        blockchainTransactions: async (
            _root: undefined, 
            _args: {}, 
            { db }: { db: Database })
        : Promise<BlockchainTransaction[]> => {
            return await db.blockchainTransactions.find({}).toArray()
        }
    },
    Mutation: {
        addBlockchainTransaction: () => {
            return 'Adding blockchain transaction'
        },
        editBlockchainTransaction: () => {
            return 'Editing blockchain transaction'
        },
        deleteBlockchainTransaction: async (
            _root: undefined, 
            { id }: { id: string }, 
            { db }: { db: Database }
        ): Promise<BlockchainTransaction> => {
            const deleteRes = await db.blockchainTransactions.findOneAndDelete({
                _id: new ObjectId(id)
            })
            if(!deleteRes.value) {
                throw new Error('failed to delete resting')
            }
            return deleteRes.value
        }
    }
}