interface BlockchainTransaction {
    id: string
    transactionHash: string
    timestamp: string
    from: string
    to: string
    currency: string
    additionalNotes: string
    block: number
    amountTransferred: number
    value: number
    fee: number
    
    toHq: boolean
    toProject: boolean
    toNatCom: boolean
}

export interface BlockchainTransactionsData {
    blockchainTransactions: BlockchainTransaction[]
}

export interface DeleteBlockchainTransactionData {
    deleteBlockchainTransaction: BlockchainTransaction
}

export interface DeleteBlockchainTransactionVariables {
    id: string
}