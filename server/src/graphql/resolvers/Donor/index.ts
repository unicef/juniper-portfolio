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
            console.log('Getting donors')
            return await db.donors.find({}).toArray()
        }
    },
    Mutation: {
        addDonor: async (
            _root: undefined,
            {
                name,
                bitcoinPublicAddress,
                ethereumPublicAddress
            } : {
                name: string,
                bitcoinPublicAddress: string,
                ethereumPublicAddress: string,
            },
            { db }: {db: Database }
        ): Promise<Donor> => {
            console.log(name, bitcoinPublicAddress, ethereumPublicAddress)
            const createRes = await db.donors.insertOne({
                _id: new ObjectId(),
                name,
                bitcoinPublicAddress,
                ethereumPublicAddress,
                amountDonated: 0
            })
            if(!createRes.ops[0]) {
                console.log('Fail!')
                throw new Error('failed to create result')
            }
            return createRes.ops[0]
        },
        increaseDonationAmount: async (
            _root: undefined,
            {
                id,
                donation
            } : {
                id: string,
                donation: any
            },
            { db }: {db: Database}
        ): Promise<Donor> => {
            const increaseRes = await db.donors.findOneAndUpdate(
                {_id: new ObjectId(id)}, // query
                {$inc: { amountDonated: donation }},
                {returnOriginal: false}
            )
            if(!increaseRes.value) {
                throw new Error('failed to update result')
            }
            return increaseRes.value!
        },
        // add edit owner to update blockchain addresses, name at a later time
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