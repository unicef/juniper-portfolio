/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Hqs
// ====================================================

export interface Hqs_hqs {
  __typename: "Hq";
  id: string;
  name: string;
  bitcoinPublicAddress: string;
  ethereumPublicAddress: string;
  amountReceived: number;
}

export interface Hqs {
  hqs: Hqs_hqs[];
}
