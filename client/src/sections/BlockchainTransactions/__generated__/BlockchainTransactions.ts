/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: BlockchainTransactions
// ====================================================

export interface BlockchainTransactions_blockchainTransactions {
  __typename: "BlockchainTransaction";
  id: string;
  transactionHash: string;
  from: string;
  to: string;
  currency: string;
  amountTransferred: number;
  value: number;
  additionalNotes: string;
  fee: number;
  toFundraisingArm: boolean;
  toHq: boolean;
  toProject: boolean;
}

export interface BlockchainTransactions {
  blockchainTransactions: BlockchainTransactions_blockchainTransactions[];
}
