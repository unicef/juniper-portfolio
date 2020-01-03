/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: IncreaseRaisedAmount
// ====================================================

export interface IncreaseRaisedAmount_increaseRaisedAmount {
  __typename: "FundraisingArm";
  id: string;
  name: string;
  amountRaised: number;
}

export interface IncreaseRaisedAmount {
  increaseRaisedAmount: IncreaseRaisedAmount_increaseRaisedAmount;
}

export interface IncreaseRaisedAmountVariables {
  id: string;
  raised: number;
}
