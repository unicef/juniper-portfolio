/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddProject
// ====================================================

export interface AddProject_addProject {
  __typename: "Project";
  id: string;
  name: string;
}

export interface AddProject {
  addProject: AddProject_addProject;
}

export interface AddProjectVariables {
  name: string;
  bitcoinPublicAddress: string;
  ethereumPublicAddress: string;
}
