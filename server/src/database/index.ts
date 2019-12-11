import { MongoClient } from 'mongodb'

const dbName = `${process.env.MONGO_DB_NAME}`
const url = `${process.env.MONGO_URL}`

export const connectDatabase = async () => {
    const client = await MongoClient.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    const db = client.db(dbName)
    return {
        projects: db.collection('projects'),
        dailyPrices: db.collection('dailyPrices'),
        users: db.collection('dailyPrice'),
        transactions: db.collection('transactions')
    }
}