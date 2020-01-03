/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: IncreaseReceivedAmount
// ====================================================

export interface IncreaseReceivedAmount_increaseReceivedAmount {
  __typename: "Hq";
  id: string;
  name: string;
  amountReceived: number;
}

export interface IncreaseReceivedAmount {
  increaseReceivedAmount: IncreaseReceivedAmount_increaseReceivedAmount;
}

export interface IncreaseReceivedAmountVariables {
  id: string;
  received: number;
}
