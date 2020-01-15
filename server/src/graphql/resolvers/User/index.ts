import { IResolvers } from 'apollo-server-express'
import { Database, User } from '../../../lib/types'
import { ObjectId } from 'mongodb'
import { hash, compare } from 'bcryptjs'
import { Request, Response } from 'express'
import { createRefreshToken, createAccessToken } from './auth'
import { sendRefreshToken } from '../../../sendRefreshToken'


export const userResolvers: IResolvers = {
    // Need to add other queries and mutations
    User: {
        id: (user: User): string => user._id.toString()
    },
    // Might need to add LoginResponse here
    Query: {
        users: async (
            _root: undefined, 
            _args: {}, 
            { req, db }: { req: any, db: Database })
        : Promise<User[]> => {
            console.log(req.payload)
            return await db.users.find({}).toArray()
        }
    },
    Mutation: {
        register: async(
            _root: undefined,
            {
                name,
                email,
                organization,
                role, // will be an id from the db
                password

            } : {
                name: string
                email: string,
                organization: string,
                role: string,
                password: string

            }, 
            { db } : { db: Database }
        ): Promise<User> => {
            const hashedPassword = await hash(password, 12)
            const createRes = await db.users.insertOne({
                _id: new ObjectId(),
                name,
                email,
                organization,
                role,
                hash: hashedPassword,
                tokenVersion: 0
            })
            if (!createRes.ops[0]) {
                throw new Error('failed to create result')
            }
            return createRes.ops[0]
        },
        createUser: async(
            _root: undefined,
            {
                name, 
                email, 
                organization, 
                role
            } : {
                name: string, 
                email: string, 
                organization: string, 
                role: string
            },
            { db } : { db: Database }
        ): Promise<User> => {
            const createRes = await db.users.insertOne({
                _id: new ObjectId(),
                name,
                email,
                organization,
                role,
                hash: '',
                tokenVersion: 0
            })
            if (!createRes.ops[0]) {
                throw new Error('failed to create result')
            }
            return createRes.ops[0]
        },
        revokeRefreshTokensForUser: async(
            _root: undefined,
            {
                id
            }: {
                id: string
            },
            { db } : { db: Database }
        ): Promise<User> => {
            let incrementer: any = 1
            const increaseRes = await db.users.findOneAndUpdate(
                {_id: new ObjectId(id)}, 
                {$inc: { tokenVersion: incrementer }}, 
                {returnOriginal: false}
            )
            if(!increaseRes.value) {
                throw new Error('failed to update result')
            }
            return increaseRes.value!
        },
        login: async (
            _root: undefined,
            {
                email,
                password,
            } : {
                email: string,
                password: string,
            },
            { db, req, res }: { db: Database, req: Request, res: Response }
        ) => {

            const user = await db.users.findOne({ email })
            if(!user) {
                throw new Error('user not found')
            }

            const valid = await compare(password, user.hash.toString())
            if(!valid) {
                throw new Error('bad password')
            }
            // // login successful
            sendRefreshToken(res, createRefreshToken(user))
            
            return {
                accessToken: createAccessToken(user)
            }

        }

    }
}