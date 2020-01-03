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
        addFundraisingArm: async (
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
            { db }: { db: Database }
        ): Promise<FundraisingArm> => {
            const createRes = await db.fundraisingArms.insertOne({
                _id: new ObjectId(),
                name,
                bitcoinPublicAddress,
                ethereumPublicAddress,
                amountRaised: 0
            })
            if(!createRes.ops[0]) {
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
        ): Promise<FundraisingArm> => {
            const increaseRes = await db.fundraisingArms.findOneAndUpdate(
                {_id: new ObjectId(id)}, // query
                {$inc: { amountRaised: donation }},
                {returnOriginal: false}
            )
            if(!increaseRes.value) {
                throw new Error('failed to update result')
            }
            return increaseRes.value!
        },
        // editFundraisingArm: () => {
        //     return 'Editing fundraising arm'
        // },
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