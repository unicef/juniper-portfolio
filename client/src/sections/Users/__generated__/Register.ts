/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Register
// ====================================================

export interface Register_register {
  __typename: "User";
  id: string;
  name: string;
  organization: string;
  role: string;
  email: string;
}

export interface Register {
  register: Register_register;
}

export interface RegisterVariables {
  name: string;
  email: string;
  organization: string;
  role: string;
  password: string;
}
