import { IResolvers } from 'apollo-server-express'
import { Database, DailyPrice } from '../../../lib/types'
import { ObjectId } from 'mongodb'

export const dailyPriceResolvers: IResolvers = {
    DailyPrice: {
        id: (dailyPrice: DailyPrice): string => dailyPrice._id.toString()
    },
    Query: {
        dailyPrices: async (
            _root: undefined, 
            _args: {}, 
            { db }: { db: Database })
        : Promise<DailyPrice[]> => {
            return await db.dailyPrices.find({}).toArray()
        }
    },
    Mutation: {
        addDailyPrice: () => {
            return 'Adding daily price'
        },
        editDailyPrice: () => {
            return 'Editing daily price'
        },
        deleteDailyPrice: async (
            _root: undefined, 
            { id }: { id: string }, 
            { db }: { db: Database }
        ): Promise<DailyPrice> => {
            const deleteRes = await db.dailyPrices.findOneAndDelete({
                _id: new ObjectId(id)
            })
            if(!deleteRes.value) {
                throw new Error('failed to delete result')
            }
            return deleteRes.value
        }
    }
}