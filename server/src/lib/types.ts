import { Collection, ObjectId } from 'mongodb'

export interface BlockchainTransaction {
    _id: ObjectId;
    transactionHash: string;        
    timestamp: string;        
    from: string;        
    to: string;        
    currency: string;        
    additionalNotes: string;        
    block: number;        
    amountTransferred: number;        
    value: number;        
    fee: number;       
}

export interface Transaction {
    _id: ObjectId;
    donor: String;
    recipient: String;
    amount: Number;
    record: [String];
    blockchainTransactions: [BlockchainTransaction];
}

export interface User {
    _id: ObjectId;
    name: String;
    organization: String;
    role: String; // can be donor, admin, project
    email: String;
    hash: String;
    salt: String;
}

export interface DailyPrice {
    _id: ObjectId;
    currency: String;
    priceBinance: Number;
    priceCoinbasePro: Number;
    priceBitstamp: Number;
    averagePrice: Number;
    date: String;
}

export interface Project {
    _id: ObjectId;
    name: String;
    objective: String;
    amountFunded: Number;
    currency: Number;
    image: String;
}

export interface Donor { 
    _id: ObjectId;
    name: String;
    publicAddress: String;
    amountDonated: Number;
}

export interface Database {
    transactions: Collection<Transaction>;
    users: Collection<User>;
    dailyPrices: Collection<DailyPrice>;
    blockchainTransactions: Collection<BlockchainTransaction>;
    projects: Collection<Project>;
    donors: Collection<Donor>;
}