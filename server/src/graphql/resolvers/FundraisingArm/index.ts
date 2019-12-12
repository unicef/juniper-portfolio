import { IResolvers } from 'apollo-server-express'
import { Database, FundraisingArm } from '../../../lib/types'
import { ObjectId } from 'mongodb'

export const fundraisingArmResolvers: IResolvers = {
    FundraisingArm: {
        id: (fundraisingArm: FundraisingArm): string => fundraisingArm._id.toString()
    },
    Query: {
        fundraisingArms: async (
            _root: undefined, 
            _args: {}, 
            { db }: { db: Database })
        : Promise<FundraisingArm[]> => {
            return await db.fundraisingArms.find({}).toArray()
        }
    },
    Mutation: {
        addFundraisingArm: () => {
            return 'Adding fundraising arm'
        },
        editFundraisingArm: () => {
            return 'Editing fundraising arm'
        },
        deleteFundraisingArm: async (
            _root: undefined, 
            { id }: { id: string }, 
            { db }: { db: Database }
        ): Promise<FundraisingArm> => {
            const deleteRes = await db.fundraisingArms.findOneAndDelete({
                _id: new ObjectId(id)
            })
            if(!deleteRes.value) {
                throw new Error('failed to delete result')
            }
            return deleteRes.value
        }
    }
}