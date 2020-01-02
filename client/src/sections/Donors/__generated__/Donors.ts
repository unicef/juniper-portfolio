/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Donors
// ====================================================

export interface Donors_donors {
  __typename: "Donor";
  id: string;
  name: string;
  bitcoinPublicAddress: string;
  ethereumPublicAddress: string;
  amountDonated: number;
}

export interface Donors {
  donors: Donors_donors[];
}
