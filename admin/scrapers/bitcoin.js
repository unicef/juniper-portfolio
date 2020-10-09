const { Logger } = require("node-code-utils");
const fetch = require("node-fetch");

class BitcoinWalletScraper {
  constructor(config, db) {
    this.config = config;
    this.logger = new Logger("Bitcoin Scraper");
    this.symbol = "BTC";

    this.db = db;
  }

  async scrapeTransactionData(
    address,
    isUnicef,
    multisigOwners,
    tracked = false
  ) {
    const walletData = await this.fetchWalletData(address);
    const txData = await this.fetchTransactionData(address);

    const multisigOwnerLookup = {};

    multisigOwners.forEach((owner) => {
      multisigOwnerLookup[owner.walletAddress.toLowerCase()] = true;
    });

    if (!tracked) {
      for (const tx of txData) {
        await this.saveTransactionData(
          walletData.address,
          tx,
          isUnicef,
          multisigOwnerLookup
        );
      }
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
    let timestamp = tx.status.block_time * 1000;
    let accountMap = await this.getAccountMap();
    let rate = await this.db.getNearestPrice(this.symbol, new Date(timestamp));
    let amount = 0;

    if (rate.length > 0) {
      rate = rate[0];
    } else {
      rate = { average: 0 };
    }
    if (!rate) {
      rate = { price: 0 };
    }

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

    amount = Math.round(amount) / 1e8;
    let amountUSD = Math.round(amount * rate.average * 100) / 100;
    let fee = tx.fee / 1e8;
    let feeUSD = Math.round(fee * rate.average * 100) / 100;
    console.log(tx);
    const newTx = {
      txid: tx.txid,
      address,
      currency: "Bitcoin",
      symbol: this.symbol,
      to: received ? address : null,
      from: sent ? address : null,
      block: tx.blockNumber,
      timestamp,
      sent,
      received,
      rate: rate.average,
      fee,
      feeUSD,
      amount,
      amountUSD,
      isUnicef,
    };

    // If the tx already exists as part of a unicef wallet ignore the unicef flag, default is false
    if (!isUnicef) {
      delete newTx.isUnicef;
    }

    this.db.saveTransaction(newTx);
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
