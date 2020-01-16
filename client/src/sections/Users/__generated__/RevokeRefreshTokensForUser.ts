/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RevokeRefreshTokensForUser
// ====================================================

export interface RevokeRefreshTokensForUser_revokeRefreshTokensForUser {
  __typename: "User";
  tokenVersion: number;
}

export interface RevokeRefreshTokensForUser {
  revokeRefreshTokensForUser: RevokeRefreshTokensForUser_revokeRefreshTokensForUser;
}

export interface RevokeRefreshTokensForUserVariables {
  id: string;
}
