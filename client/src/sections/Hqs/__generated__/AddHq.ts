/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddHq
// ====================================================

export interface AddHq_addHq {
  __typename: "Hq";
  id: string;
  name: string;
}

export interface AddHq {
  addHq: AddHq_addHq;
}

export interface AddHqVariables {
  name: string;
  bitcoinPublicAddress: string;
  ethereumPublicAddress: string;
}
