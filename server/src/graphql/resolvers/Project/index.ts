import { IResolvers } from 'apollo-server-express'
import { Database, Project } from '../../../lib/types'
import { ObjectId } from 'mongodb'

// NTS: Will need to add update project resolvers for image and objective fields

export const projectResolvers: IResolvers = {
    Project: {
        id: (project: Project): string => project._id.toString()
    },
    Query: {
        projects: async (
            _root: undefined, 
            _args: {}, 
            { db }: { db: Database })
        : Promise<Project[]> => {
            return await db.projects.find({}).toArray()
        }
    },
    Mutation: {
        addProject: async ( 
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
            { db }: {db: Database }
        ): Promise<Project> => {
            const createRes = await db.projects.insertOne({
                _id: new ObjectId(),
                name,
                bitcoinPublicAddress,
                ethereumPublicAddress,
                objective: '',
                image: '',
                amountGranted: 0
            })
            if(!createRes.ops[0]) {
                throw new Error('failed to create result')
            }
            return createRes.ops[0]
        },
        increaseGrantedAmount: async(
            _root: undefined,
            {
                id,
                granted
            } : {
                id: string,
                granted: any
            },
            {db} : {db: Database}
        ): Promise<Project> => {
            const increaseRes = await db.projects.findOneAndUpdate(
                {_id: new ObjectId(id)},
                {$inc: {amountGranted: granted}},
                {returnOriginal: false}
            )
            if(!increaseRes.value) {
                throw new Error('failed to update result')
            }
            return increaseRes.value
        },
        deleteProject: async (
            _root: undefined, 
            { id }: { id: string }, 
            { db }: { db: Database }
        ): Promise<Project> => {
            const deleteRes = await db.projects.findOneAndDelete({
                _id: new ObjectId(id)
            })
            if(!deleteRes.value) {
                throw new Error('Failed to delete result')
            }
            return deleteRes.value
        }
    }
}