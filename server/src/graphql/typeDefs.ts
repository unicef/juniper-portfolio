import { gql } from 'apollo-server-express'

export const typeDefs = gql`
    type BlockchainTransaction {
        id: ID!
        transactionHash: String!
        timestamp: String!
        from: String!
        to: String!
        currency: String!
        additionalNodes: String!
        block: Int!  
        amountTransferred: Float!
        value: Float!
        fee: Float!
    }

    type User {
        id: ID!
        name: String!
        organization: String!
        role: String!
        email: String!
        hash: String!
        salt: String!
    }

    type DailyPrice {
        id: ID!
        currency: String!
        priceBinance: String!
        priceCoinbasePro: String!
        priceBitstamp: String!
        averagePrice: String!
        date: String!
    }

    type Query {
        blockchainTransactions: [BlockchainTransaction!]!
        users: [User!]!
        dailyPrices: [DailyPrice!]!
    }

    type Mutation {
        addBlockchainTransaction(
            id: ID!
            transactionHash: String!
            timestamp: String!
            from: String!
            to: String!
            currency: String!
            additionalNodes: String!
            block: Int!
            amountTransferred: Float!
            value: Float!
            fee: Float!
        ): BlockchainTransaction!
        
        editBlockchainTransaction(
            id: ID!
        ): BlockchainTransaction!
        
        deleteBlockchainTransaction(
            id: ID!
        ): BlockchainTransaction!

        addUser(
            id: ID!
            name: String!
            organization: String!
            role: String!
            email: String!
            hash: String!
            salt: String!
        ): User!
        editUser(id: ID!): User!
        deleteUser(id: ID!): User!

        addDailyPrice(
            # id: ID!
            currency: String!
            priceBinance: String!
            priceCoinbasePro: String!
            priceBitstamp: String!
            averagePrice: String!
            date: String!
        ): DailyPrice!
        editDailyPrice(id: ID!): DailyPrice!
        deleteDailyPrice(id: ID!): DailyPrice!
    }

`