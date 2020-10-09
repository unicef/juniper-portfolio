const { Logger } = require("node-code-utils");
const fetch = require("node-fetch");
const defaultConfig = require("../config");

class EthereumWalletScraper {
  constructor(config, db) {
    this.config = { ...defaultConfig.ethereumScraper, ...config };
    this.logger = new Logger("Ethereum Scraper");
    this.symbol = "ETH";
    this.db = db;
  }

  async scrapeTransactionData(address, isUnicef, multisigOwners) {
    const walletData = await this.fetchWalletData(address);
    const txData = await this.fetchTransactionData(address);
    const internalTxData = await this.fetchInternalTransactionData(address);

    const multisigOwnerLookup = {};

    multisigOwners.forEach((owner) => {
      multisigOwnerLookup[owner.walletAddress.toLowerCase()] = true;
    });

    for (const tx of txData) {
      await this.saveTransactionData(
        address,
        tx,
        isUnicef,
        multisigOwnerLookup
      );
    }

    if (internalTxData) {
      for (const itx of internalTxData) {
        await this.saveTransactionData(address, itx, isUnicef);
      }
    }

    await this.updateWallet(walletData);
    return true;
  }
  async fetchInternalTransactionData(address) {
    this.logger.info(`Fetching Internal Transactions for \t ${address}`);
    let data, txs;

    try {
      data = await fetch(
        `http://api.etherscan.io/api?module=account&action=txlistinternal&address=${address}#internaltx&startblock=0&endblock=9999999999999&sort=asc#internaltx&apikey=${this.config.apiKey}`
      );

      txs = await data.json();

      if (txs.status === "0") {
        throw new Error(txs.result);
      }
      txs = txs.result;
    } catch (e) {
      this.logger.error(e);
      return console.log(e);
    }

    return txs;
  }

  async fetchTransactionData(address) {
    this.logger.info(`Fetching Transaction Data for \t${address}`);
    let data, txs;

    try {
      data = await fetch(
        `http://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=${this.config.apiKey}`
      );

      txs = await data.json();
      if (txs.status === 0) {
        throw new Error(txs.result);
      }
      txs = txs.result;
    } catch (e) {
      this.logger.error(e);
      return console.log(e);
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

  async getAccountMap() {
    let accounts = await this.db.getAccounts();
    let map = {};

    accounts.forEach((account) => {
      account.addresses.forEach((address) => {
        map[address.address] = account.name;
      });
    });

    return map;
  }

  async saveTransactionData(address, tx, isUnicef, multisigOwnerLookup = {}) {
    let sent = false;
    let received = false;
    let isMultisigOwner = false;
    let timestamp = tx.timeStamp * 1000;

    let rate = await this.db.getNearestPrice(this.symbol, new Date(timestamp));
    let accountMap = await this.getAccountMap();
    let amount = tx.value / 1e18;
    amount = Math.round(amount * 1e5) / 1e5;

    if (rate.length > 0) {
      rate = rate[0];
    } else {
      rate = { average: 0 };
    }
    if (!rate) {
      rate = { average: 0 };
    }

    if (tx.to.toLowerCase() === address.toLowerCase()) {
      received = true;
    }

    if (tx.from.toLowerCase() === address.toLowerCase()) {
      sent = true;
    }

    if (multisigOwnerLookup[tx.from.toLowerCase()]) {
      isMultisigOwner = true;
    }

    let amountUSD = Math.round(amount * rate.average * 100) / 100;

    let fee = 0;
    if (tx.gasPrice) {
      fee = (tx.gasUsed * tx.gasPrice) / 1e18;
    }
    let feeUSD = Math.round(fee * rate.average * 100) / 100;

    const newTx = {
      txid: tx.hash,
      address,
      currency: "Ethereum",
      symbol: this.symbol,
      source: accountMap[tx.from],
      destination: accountMap[tx.to],
      to: tx.to,
      from: tx.from,
      block: tx.blockNumber,
      timestamp,
      index: tx.nonce || null,
      sent,
      received,
      rate: rate.average,
      fee,
      feeUSD,
      amount,
      amountUSD,
      isUnicef,
      isMultisigOwner,
    };

    // If the tx already exists as part of a unicef wallet ignore the unicef flag, default is false
    if (!isUnicef) {
      delete newTx.isUnicef;
    }

    this.db.saveTransaction(newTx);
  }
  async updateWallet(walletData) {
    const { address, balance } = walletData;
    this.logger.info(`Updating Wallet data for \t${address}`);
    let aggregateFees = await this.db.getWalletFees(address);
    let aggregateMultisigFees = await this.db.getMultisigWalletFees(address);

    let totalFees = 0;
    let totalFeesUSD = 0;

    if (aggregateFees.length > 0) {
      totalFees = aggregateFees[0].totalFees;
      totalFeesUSD = aggregateFees[0].totalFeesUSD;
    }

    if (aggregateMultisigFees.length > 0) {
      totalFees = aggregateMultisigFees[0].totalFees;
      totalFeesUSD = aggregateMultisigFees[0].totalFeesUSD;
    }

    await this.db.updateWallet(address, {
      fees: totalFees,
      feesUSD: totalFeesUSD,
      balance,
    });
  }
}
module.exports = EthereumWalletScraper;
