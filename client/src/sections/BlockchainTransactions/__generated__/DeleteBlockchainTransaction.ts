/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteBlockchainTransaction
// ====================================================

export interface DeleteBlockchainTransaction_deleteBlockchainTransaction {
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

export interface DeleteBlockchainTransaction {
  deleteBlockchainTransaction: DeleteBlockchainTransaction_deleteBlockchainTransaction;
}

export interface DeleteBlockchainTransactionVariables {
  id: string;
}
