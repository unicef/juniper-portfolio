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

    type Hq {
        id: ID!
        name: String!
        bitcoinPublicAddress: String!
        ethereumPublicAddress: String!
        amountReceived: Float!
    }

    type Project {
        id: ID!
        name: String!
        bitcoinPublicAddress: String!
        ethereumPublicAddress: String!
        amountGranted: Float!
        objective: String!
        image: String!
    }

    type Query {
        blockchainTransactions: [BlockchainTransaction!]!
        users: [User!]!
        dailyPrices: [DailyPrice!]!
        donors: [Donor!]!
        fundraisingArms: [FundraisingArm!]!
        hqs: [Hq!]!
        projects: [Project!]!
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
        ): FundraisingArm!
        increaseRaisedAmount(
            id: ID!, 
            raised: Float!): FundraisingArm!
        deleteFundraisingArm(id: ID!): FundraisingArm!

        addHq(
            name: String!
            bitcoinPublicAddress: String!
            ethereumPublicAddress: String!
        ): Hq!
        increaseReceivedAmount(
            id: ID!
            received: Float!
        ): Hq!
        deleteHq(id: ID!): Hq!
        
        addProject(
            name: String!
            bitcoinPublicAddress: String!
            ethereumPublicAddress: String!
        ): Project!
        increaseGrantedAmount(
            id: ID!
            granted: Float!
        ): Project!
        deleteProject(id: ID!): Project!
    }

`