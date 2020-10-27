# Juniper Portfolio Tool

Want to start tracking cryptocurrencies? This application can be used to track cryptocurrency wallets (bitcoin and ether).

## Prerequisittes

Please ensure that you have the following installed on your computer:

1. Node JS (^12.13.0)
2. Node Package Manager (npm) (^6.12.0)
3. Docker (^19.03.2)
4. Mongo

Please ensure that you have accounts with the following services; you will be using these accounts to create API keys for your `.env` file:

5. Amazon Web Services
6. Infura
7. Etherscan

## Getting Started

There are two main folders for this application:

1. admin
2. client-admin
   There is a `.env` that will need to be configured before getting this application to work. There is a sample `.env` (called `.env.example`) file that you can use for the application. Update it with the required credentials to ensure that this application works as intended.

### Install

Run `npm install` in the root folder. The script will install all packages required and also create a production builds of the current application as well.

### Running the application in development mode

For the server:
`cd admin`
`node index.js`
For the client:
`cd client-admin`
`npm start`

## Contributing

Review the `/contributing` folder in this repository.

## Authors

1. Alex Sherbuck (GitHub: tenthirtyone)
2. Mehran Hydary (GitHub: mehranhydary | Email: mhydary@unicef.org)
