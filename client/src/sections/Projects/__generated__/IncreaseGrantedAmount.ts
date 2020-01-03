/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: IncreaseGrantedAmount
// ====================================================

export interface IncreaseGrantedAmount_increaseGrantedAmount {
  __typename: "Project";
  id: string;
  name: string;
  amountGranted: number;
}

export interface IncreaseGrantedAmount {
  increaseGrantedAmount: IncreaseGrantedAmount_increaseGrantedAmount;
}

export interface IncreaseGrantedAmountVariables {
  id: string;
  granted: number;
}
