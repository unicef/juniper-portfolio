const Logger = require("../logger");
const fetch = require("node-fetch");

class EthereumWalletScraper {
  constructor(config, db) {
    this.config = config;
    this.logger = new Logger("Ethereum Scraper");
    this.symbol = "ETH";
    this.db = db;
  }

  async scrapeTransactionData(address) {
    const walletData = await this.fetchWalletData(address);
    const txData = await this.fetchTransactionData(address);

    for (const tx of txData) {
      await this.saveTransactionData(address, tx);
    }

    await this.updateWallet(walletData);
    return true;
  }
  async fetchTransactionData(address) {
    this.logger.info(`Fetching Transaction Data for \t${address}`);
    let data, txs;
    try {
      data = await fetch(
        `http://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=${this.config.apiKey}`
      );

      txs = await data.json();
      txs = txs.result;
    } catch (e) {
      console.log(e);
    }

    return txs;
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

    return {
      address,
      balance,
    };
  }

  async saveTransactionData(address, tx) {
    let sent = false;
    let received = false;
    let timestamp = tx.timeStamp * 1000;
    let rate = await this.db.getNearestPrice(this.symbol, new Date(timestamp));
    let amount = tx.value / 1e18;
    amount = Math.round(amount * 1e5) / 1e5;

    if (tx.to.toLowerCase() === address.toLowerCase()) {
      received = true;
    }

    if (tx.from.toLowerCase() === address.toLowerCase()) {
      sent = true;
    }

    let amountUSD = Math.round(amount * rate.price * 100) / 100;
    let fee = (tx.gas * tx.gasPrice) / 1e18;
    let feeUSD = Math.round(fee * rate.price * 100) / 100;

    this.db.saveTransaction({
      txid: tx.hash,
      address,
      currency: "Ethereum",
      symbol: this.symbol,
      source: "",
      destination: "",
      to: tx.to,
      from: tx.from,
      block: tx.blockNumber,
      timestamp,
      index: tx.nonce,
      sent,
      received,
      rate: rate.price,
      fee,
      feeUSD,
      amount,
      amountUSD,
    });
  }

  async updateWallet(walletData) {
    const { address, balance } = walletData;
    this.logger.info(`Updating Wallet data for \t${address}`);
    let aggregateFees = await this.db.getWalletFees(address);

    let totalFees = 0;
    if (aggregateFees.length > 0) {
      totalFees = aggregateFees[0].totalFees;
    }

    await this.db.updateWallet(address, { feesUSD: totalFees, balance });
  }
}
module.exports = EthereumWalletScraper;
