/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: IncreaseDonationAmount
// ====================================================

export interface IncreaseDonationAmount_increaseDonationAmount {
  __typename: "Donor";
  id: string;
  name: string;
  amountDonated: number;
}

export interface IncreaseDonationAmount {
  increaseDonationAmount: IncreaseDonationAmount_increaseDonationAmount;
}

export interface IncreaseDonationAmountVariables {
  id: string;
  donation: number;
}
