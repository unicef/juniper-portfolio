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

    type Query {
        blockchainTransactions: [BlockchainTransaction!]!
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
    }

`