/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Users
// ====================================================

export interface Users_users {
  __typename: "User";
  id: string;
  name: string;
  organization: string;
  role: string;
  email: string;
  tokenVersion: number;
}

export interface Users {
  users: Users_users[];
}
