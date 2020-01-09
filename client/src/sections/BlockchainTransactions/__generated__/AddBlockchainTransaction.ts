/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddBlockchainTransaction
// ====================================================

export interface AddBlockchainTransaction_addBlockchainTransaction {
  __typename: "BlockchainTransaction";
  id: string;
  transactionHash: string;
  from: string;
  to: string;
  currency: string;
  amountTransferred: number;
  value: number;
  fee: number;
  toFundraisingArm: boolean;
  toHq: boolean;
  toProject: boolean;
}

export interface AddBlockchainTransaction {
  addBlockchainTransaction: AddBlockchainTransaction_addBlockchainTransaction;
}

export interface AddBlockchainTransactionVariables {
  transactionHash: string;
  from: string;
  to: string;
  currency: string;
  additionalNotes: string;
  block: number;
  amountTransferred: number;
  value: number;
  fee: number;
  toFundraisingArm: boolean;
  toHq: boolean;
  toProject: boolean;
}
