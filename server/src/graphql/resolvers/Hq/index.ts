import { IResolvers } from 'apollo-server-express'
import { Database, Hq } from '../../../lib/types'
import { ObjectId } from 'mongodb'

export const hqResolvers: IResolvers = {
    Hq: {
        id: (hq: Hq): string => hq._id.toString()
    },
    Query: {
        hqs: async (
            _root: undefined, 
            _args: {}, 
            { db }: { db: Database })
        : Promise<Hq[]> => {
            return await db.hqs.find({}).toArray()
        }
    },
    Mutation: {
        addHq: async (
            _root: undefined,
            {
                name,
                bitcoinPublicAddress,
                ethereumPublicAddress
            } : {
                name: string,
                bitcoinPublicAddress: string,
                ethereumPublicAddress: string
            },
            { db }: { db: Database }
        ): Promise<Hq> => {
            const createRes = await db.hqs.insert({
                _id: new ObjectId(),
                name,
                bitcoinPublicAddress,
                ethereumPublicAddress,
                amountReceived: 0
            })
            if (!createRes.ops[0]) {
                throw new Error('failed to create result')
            }
            return createRes.ops[0]
        },
        increaseReceivedAmount: async (
            _root: undefined,
            {
                id,
                received
            } : {
                id: string,
                received: any
            }, 
            { db }: {db: Database}
        ): Promise<Hq> => {
            const increaseRes = await db.hqs.findOneAndUpdate(
                {_id: new ObjectId(id)},
                {$inc: { amountReceived: received }},
                {returnOriginal: false}
            )
            if(!increaseRes.value) {
                throw new Error('failed to update result')
            }
            return increaseRes.value!
        },
        deleteHq: async (
            _root: undefined, 
            { id }: { id: string }, 
            { db }: { db: Database }
        ): Promise<Hq> => {
            const deleteRes = await db.hqs.findOneAndDelete({
                _id: new ObjectId(id)
            })
            if(!deleteRes.value) {
                throw new Error('failed to delete result')
            }
            return deleteRes.value
        }
    }
}