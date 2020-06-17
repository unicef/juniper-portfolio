const Logger = require("../logger");
const fetch = require("node-fetch");

class BitcoinWalletScraper {
  constructor(config, db) {
    this.config = config;
    this.logger = new Logger("Ethereum Scraper");
    this.symbol = "ETH";

    this.db = db;
  }

  async scrapeTransactionData(address) {
    const walletData = await this.fetchWalletData(address);
    const txData = []; //await this.fetchTransactionData(address);

    for (const tx of txData) {
      //await this.saveTransactionData(walletData.address, tx);
    }

    await this.updateWallet(walletData);
    return true;
  }
  async fetchTransactionData(address) {
    this.logger.info(`Fetching Transaction Data for \t${address}`);
  }
  async fetchWalletData(address) {
    this.logger.info(`Fetch Wallet Data for ${address}`);
    let data, balance;
    try {
      data = await fetch(
        `https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=${this.config.apiKey}`
      );
      balance = await data.json();
      balance = balance.result;
      balance = balance / 1e18;
      balance = Math.round(balance * 1e5) / 1e5;
    } catch (e) {
      console.log(e);
    }

    console.log(balance);
    return {
      address,
      balance,
    };
  }

  async saveTransactionData(address, tx) {}
  async updateWallet(walletData) {
    console.log(walletData);
    const { address, balance } = walletData;
    await this.db.updateWallet(address, { balance });
  }
}
module.exports = BitcoinWalletScraper;
