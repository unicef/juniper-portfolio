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
        addHq: () => {
            return 'Adding hq'
        },
        editHq: () => {
            return 'Editing hq'
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