import { transactions } from '../transactions'

export const resolvers = {
    Query: {
        transactions: () => {
            return transactions
        }
    },
    Mutation: {
        addTransaction: () => {
            return 'Adding transaction'
        },
        editTransaction: () => {
            return 'Editing transaction'
        },
        deleteTransaction: () => {
            return 'Deleting transaction'
        }
    }
}