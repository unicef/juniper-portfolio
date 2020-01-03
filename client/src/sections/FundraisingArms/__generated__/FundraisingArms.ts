/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FundraisingArms
// ====================================================

export interface FundraisingArms_fundraisingArms {
  __typename: "FundraisingArm";
  id: string;
  name: string;
  bitcoinPublicAddress: string;
  ethereumPublicAddress: string;
  amountRaised: number;
}

export interface FundraisingArms {
  fundraisingArms: FundraisingArms_fundraisingArms[];
}
