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
        addBlockchainTransaction: async (
            _root: undefined,
            {   
                transactionHash,
                from,
                to,
                currency,
                additionalNotes,
                block,
                amountTransferred,
                value, 
                fee,
                toFundraisingArm,
                toHq,
                toProject
            } : {
                transactionHash: string,
                from: string,
                to: string,
                currency: string,
                additionalNotes: string,
                block: number,
                amountTransferred: number,
                value: number, 
                fee: number,
                toFundraisingArm: boolean,
                toHq: boolean,
                toProject: boolean
            },
            { db } : { db: Database }
        ): Promise<BlockchainTransaction> => {
            const createRes = await db.blockchainTransactions.insertOne({
                _id: new ObjectId(),
                transactionHash,
                from,
                to,
                currency,
                additionalNotes,
                block,
                amountTransferred,
                value, 
                fee,
                toFundraisingArm,
                toHq,
                toProject,
                timestamp: Date.now().toString()
            })
            if(!createRes.ops[0]) {
                throw new Error('failed to create result')
            }
            return createRes.ops[0]
        },
        editAdditionalNotesOfBlockchainTransaction: async(
            _root: undefined,
            {
                id,
                additionalNotes
            } : {
                id: string,
                additionalNotes: string
            },
            { db } : { db: Database }
        ): Promise<BlockchainTransaction> => {
            console.log(id, additionalNotes)
            const updateRes = await db.blockchainTransactions.findOneAndUpdate(
                {_id: new ObjectId(id)},
                { $set: { additionalNotes : additionalNotes } },
                { upsert:true }
                // { returnNewDocument : true }
            )
            if(!updateRes.value) {
                console.log(updateRes)
                throw new Error('failed to update result')
            }
            return updateRes.value!
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