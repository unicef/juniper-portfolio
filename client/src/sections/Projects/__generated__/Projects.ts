/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Projects
// ====================================================

export interface Projects_projects {
  __typename: "Project";
  id: string;
  name: string;
  bitcoinPublicAddress: string;
  ethereumPublicAddress: string;
  amountGranted: number;
  objective: string;
  image: string;
}

export interface Projects {
  projects: Projects_projects[];
}
