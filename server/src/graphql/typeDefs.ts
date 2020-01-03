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
    
    type Donor {
        id: ID!
        name: String!
        bitcoinPublicAddress: String!
        ethereumPublicAddress: String!
        amountDonated: Float!
    }

    type FundraisingArm {
        id: ID!
        name: String!
        bitcoinPublicAddress: String!
        ethereumPublicAddress: String!
        amountRaised: Float!
    }

    type Query {
        blockchainTransactions: [BlockchainTransaction!]!
        users: [User!]!
        dailyPrices: [DailyPrice!]!
        donors: [Donor!]!
        fundraisingArms: [FundraisingArm!]!
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
        
        addDonor(
            name: String!,
            bitcoinPublicAddress: String!,
            ethereumPublicAddress: String!
        ): Donor!
        increaseDonationAmount(
            id: ID!, 
            donation: Float!): Donor!
        deleteDonor(id: ID!): Donor!
        
        addFundraisingArm(
            name: String!,
            bitcoinPublicAddress: String!,
            ethereumPublicAddress: String!
        ): Donor!
        increaseRaisedAmount(
            id: ID!, 
            donation: Float!): Donor!
        deleteFundraisingArm(id: ID!): Donor!

    }

`