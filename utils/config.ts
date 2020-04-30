import * as dotenv from "dotenv";

dotenv.config();
let path;
switch (process.env.NODE_ENV) {
  case "test":
    path = `${__dirname}/../../.env.test`;
    break;
  case "production":
    path = `${__dirname}/../../.env.production`;
    break;
  default:
    path = `${__dirname}/../../.env.development`;
}
dotenv.config({ path: path });


export const DB_USER = process.env.DB_USER
export const DB_USER_PASSWORD = process.env.DB_USER_PASSWORD
export const DB_NAME = process.env.DB_NAME
export const DB_URL = process.env.DB_URL
export const SERVER_PORT = process.env.SERVER_PORT
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET