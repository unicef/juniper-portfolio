import { gql } from 'apollo-server-express'

export const typeDefs = gql`
    type Transaction {
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
        transactions: [Transaction!]!
    }

    type Mutation {
        addTransaction(
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
        ): Transaction!
        
        editTransaction(
            id: ID!
        ): Transaction!
        
        deleteTransaction(
            id: ID!
        ): Transaction!
    }

`