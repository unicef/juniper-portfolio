/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddDonor
// ====================================================

export interface AddDonor_addDonor {
  __typename: "Donor";
  id: string;
  name: string;
}

export interface AddDonor {
  addDonor: AddDonor_addDonor;
}

export interface AddDonorVariables {
  name: string;
  bitcoinPublicAddress: string;
  ethereumPublicAddress: string;
}
