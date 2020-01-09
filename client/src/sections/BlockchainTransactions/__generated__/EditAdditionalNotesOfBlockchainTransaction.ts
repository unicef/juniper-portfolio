/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: EditAdditionalNotesOfBlockchainTransaction
// ====================================================

export interface EditAdditionalNotesOfBlockchainTransaction_editAdditionalNotesOfBlockchainTransaction {
  __typename: "BlockchainTransaction";
  id: string;
  transactionHash: string;
  additionalNotes: string;
}

export interface EditAdditionalNotesOfBlockchainTransaction {
  editAdditionalNotesOfBlockchainTransaction: EditAdditionalNotesOfBlockchainTransaction_editAdditionalNotesOfBlockchainTransaction;
}

export interface EditAdditionalNotesOfBlockchainTransactionVariables {
  id: string;
  additionalNotes: string;
}
