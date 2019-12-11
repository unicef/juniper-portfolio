import dotenv from 'dotenv'
dotenv.config()
import express, { Application } from 'express'
import { ApolloServer } from 'apollo-server-express'
import { connectDatabase } from './database'
import { typeDefs, resolvers } from './graphql'

const port = process.env.SERVER_PORT

const mount = async (app: Application) => {
    const db = await connectDatabase()
    const server = new ApolloServer({ 
        typeDefs, 
        resolvers,
        context: () => ({ db })
    })

    const projects = await db.projects.find({}).toArray()
    const dailyPrices = await db.dailyPrices.find({}).toArray()
    const users = await db.users.find({}).toArray()
    const transactions = await db.transactions.find({}).toArray()

    server.applyMiddleware({ app, path: '/api' })
    app.listen(port)
    console.log(`[server] running on port ${port}`)
}

mount(express())


