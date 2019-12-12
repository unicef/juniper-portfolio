import { IResolvers } from 'apollo-server-express'
import { Database, Donor } from '../../../lib/types'
import { ObjectId } from 'mongodb'

export const donorResolvers: IResolvers = {
    Donor: {
        id: (donor: Donor): string => donor._id.toString()
    },
    Query: {
        donors: async (
            _root: undefined, 
            _args: {}, 
            { db }: { db: Database })
        : Promise<Donor[]> => {
            return await db.donors.find({}).toArray()
        }
    },
    Mutation: {
        addDonor: () => {
            return 'Adding donor'
        },
        editDonor: () => {
            return 'Editing donor'
        },
        deleteDonor: async (
            _root: undefined, 
            { id }: { id: string }, 
            { db }: { db: Database }
        ): Promise<Donor> => {
            const deleteRes = await db.donors.findOneAndDelete({
                _id: new ObjectId(id)
            })
            if(!deleteRes.value) {
                throw new Error('failed to delete result')
            }
            return deleteRes.value
        }
    }
}