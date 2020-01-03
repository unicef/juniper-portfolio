/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddFundraisingArm
// ====================================================

export interface AddFundraisingArm_addFundraisingArm {
  __typename: "FundraisingArm";
  id: string;
  name: string;
}

export interface AddFundraisingArm {
  addFundraisingArm: AddFundraisingArm_addFundraisingArm;
}

export interface AddFundraisingArmVariables {
  name: string;
  bitcoinPublicAddress: string;
  ethereumPublicAddress: string;
}
