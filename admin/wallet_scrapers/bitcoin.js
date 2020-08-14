const Logger = require("../logger");
const fetch = require("node-fetch");

class BitcoinWalletScraper {
  constructor(config, db) {
    this.config = config;
    this.logger = new Logger("Bitcoin Scraper");
    this.symbol = "BTC";

    this.db = db;
  }

  async scrapeTransactionData(address, isUnicef, multisigOwners) {
    const walletData = await this.fetchWalletData(address);
    const txData = await this.fetchTransactionData(address);

    for (const tx of txData) {
      await this.saveTransactionData(walletData.address, tx, isUnicef);
    }

    await this.updateWallet(walletData);
    return true;
  }
  async fetchTransactionData(address) {
    this.logger.info(`Fetching Transaction Data for \t${address}`);
    let txs = [];
    let data, txData, lastSeenTxid;
    try {
      data = await fetch(`https://blockstream.info/api/address/${address}/txs`);
      txData = await data.json();
      txs = txs.concat(txData);
      lastSeenTxid = txs[txs.length - 1].txid;

      while (txData.length === 25) {
        data = await fetch(
          `https://blockstream.info/api/address/${address}/txs/chain/${lastSeenTxid}`
        );
        txData = await data.json();
        txs = txs.concat(txData);
        lastSeenTxid = txs[txs.length - 1].txid;
      }
    } catch (e) {
      console.log(e);
    }

    return txs;
  }
  async fetchWalletData(address) {
    this.logger.info(`Fetch Wallet Data for ${address}`);

    let data, wallet;
    try {
      data = await fetch(`https://blockstream.info/api/address/${address}`);
      wallet = await data.json();
    } catch (e) {
      console.log(e);
    }

    return wallet;
  }

  async saveTransactionData(address, tx, isUnicef) {
    let sent = false;
    let received = false;
    let timestamp = tx.status.block_time * 1000;
    let rate = await this.db.getNearestPrice(this.symbol, new Date(timestamp));
    let amount = 0;

    tx.vout.forEach((output) => {
      if (output.scriptpubkey_address === address) {
        received = true;
        if (output.value) {
          amount += output.value;
        }
      }
    });

    tx.vin.forEach((input) => {
      if (input.prevout.scriptpubkey_address === address) {
        sent = true;
        if (input.prevout.value) {
          amount += input.prevout.value;
        }
      }
    });

    console.log(rate);

    amount = Math.round(amount) / 1e8;
    let amountUSD = Math.round(amount * rate.price * 100) / 100;
    let fee = tx.fee / 1e8;
    let feeUSD = Math.round(fee * rate.price * 100) / 100;

    this.db.saveTransaction({
      txid: tx.txid,
      address,
      currency: "Bitcoin",
      symbol: this.symbol,
      source: "",
      destination: "",
      inputs: tx.vin,
      outputs: tx.vout,
      block: tx.status.block_height,
      timestamp: tx.status.block_time * 1000,
      index: tx.tx_index,
      sent,
      received,
      rate: rate.price,
      fee,
      feeUSD,
      amount,
      amountUSD,
      isUnicef,
      published: false,
      archived: false,
    });
  }
  async updateWallet(walletData) {
    const { address } = walletData;
    this.logger.info(`Updating Wallet data for \t${address}`);
    let aggregateFees = await this.db.getWalletFees(address);
    let totalFees = 0;
    let totalFeesUSD = 0;
    if (aggregateFees.length > 0) {
      totalFees = aggregateFees[0].totalFees;
      totalFeesUSD = aggregateFees[0].totalFeesUSD;
    }

    const balance =
      (walletData.chain_stats.funded_txo_sum -
        walletData.chain_stats.spent_txo_sum) /
      1e8;
    await this.db.updateWallet(address, {
      fees: totalFees,
      feesUSD: totalFeesUSD,
      balance,
    });
  }
}
module.exports = BitcoinWalletScraper;
