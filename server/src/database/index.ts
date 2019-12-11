import { MongoClient } from 'mongodb'
const user = ``
const userPassword = ``
const cluster = ``
const dbName = `test-tracking`

const url = `mongodb://localhost:27017`

export const connectDatabase = async () => {
    const client = await MongoClient.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    const db = client.db(dbName)
    // Need to add the other collections from Mongo...
    // The tracking application will have the following:
    // 1. Projects
    // 2. Transactions (master)
    // 3. Daily Price of ETH or BTC
    // 4. Users (donors, projects, admins)
    // 5. Wallet Transactions // Will be read from the wallet of users
    return {
        projects: db.collection('projects'),
        dailyPrices: db.collection('dailyPrices'),
        users: db.collection('dailyPrice'),
        transactions: db.collection('transactions')
    }
}