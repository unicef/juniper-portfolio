import { Collection, ObjectId } from 'mongodb'

interface TransactionParticipant {
    _id: ObjectId;
    name: String;
    bitcoinPublicAddress: String;
    ethereumPublicAddress: String;
}
export interface User {
    _id: ObjectId;
    name: String;
    organization: String;
    role: Role; // can be donor, admin, project
    email: String;
    hash: String;
    salt: String;
}
export interface Role {
    type: String; // can be donor, admin, project
}
export interface DailyPrice {
    _id: ObjectId;
    currency: String;
    priceBinance: String;
    priceCoinbasePro: String;
    priceBitstamp: String;
    averagePrice: String;
    date: String;
}
export interface BlockchainTransaction {
    _id: ObjectId;
    transactionHash: String;        
    timestamp: String;        
    from: String;        
    to: String;        
    currency: String;        
    additionalNotes: String;        
    block: Number;        
    amountTransferred: Number;        
    value: Number;        
    fee: Number;
    
    toFundraisingArm: Boolean;
    toHq: Boolean;
    toProject: Boolean;
}
export interface Transaction {
    _id: ObjectId;
    donor: Donor;
    recipient: Project; 
    fundraisingArm: FundraisingArm;
    hq: Hq;
    amount: Number;
    record: [String];
    blockchainTransactions: [BlockchainTransaction];
    transactionType: String; // can be in or out
}
export interface Project extends TransactionParticipant {
    objective: String;
    image: String;
    amountGranted: Number;
}
export interface Donor extends TransactionParticipant { 
    amountDonated: Number;
}
export interface FundraisingArm extends TransactionParticipant {
    amountRaised: Number;
}
export interface Hq extends TransactionParticipant {
    amountReceived: Number;
}
export interface Database {
    users: Collection<User>;
    dailyPrices: Collection<DailyPrice>;
    blockchainTransactions: Collection<BlockchainTransaction>;
    transactions: Collection<Transaction>;
    projects: Collection<Project>;
    donors: Collection<Donor>;
    fundraisingArms: Collection<FundraisingArm>;
    hqs: Collection<Hq>;
}