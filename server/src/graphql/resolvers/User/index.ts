import { IResolvers } from 'apollo-server-express'
import { Database, User } from '../../../lib/types'
import { ObjectId } from 'mongodb'

export const userResolvers: IResolvers = {
    // Need to add other queries and mutations
    User: {
        id: (user: User): string => user._id.toString()
    },
    Query: {
        users: async (
            _root: undefined, 
            _args: {}, 
            { db }: { db: Database })
        : Promise<User[]> => {
            return await db.users.find({}).toArray()
        }
    },
    Mutation: {
        addUser: () => {
            return 'Adding user'
        },
        editUser: () => {
            return 'Editing user'
        },
        deleteUser: async (
            _root: undefined, 
            { id }: { id: string }, 
            { db }: { db: Database }
        ): Promise<User> => {
            const deleteRes = await db.users.findOneAndDelete({
                _id: new ObjectId(id)
            })
            if(!deleteRes.value) {
                throw new Error('failed to delete result')
            }
            return deleteRes.value
        }
    }
}