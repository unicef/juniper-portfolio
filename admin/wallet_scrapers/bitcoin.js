const blockexplorer = require("blockchain.info/blockexplorer");
const Logger = require("../logger");

class BitcoinWalletScraper {
  constructor(config, db) {
    this.config = config;
    this.logger = new Logger("Bitcoin Scraper");
    this.symbol = "BTC";

    this.blockexplorer = blockexplorer;
    this.limit = this.config.limit || 50;
    this.db = db;
  }

  async scrapeTransactionData(address) {
    const walletData = await this.fetchWalletData(address);

    const txs = walletData.n_tx;

    let current = 0;
    let txData = [];

    while (current < txs) {
      txData = await this.fetchTransactionData(address, this.limit, current);

      txData.txs.forEach(async (tx) => {
        await this.saveTransactionData(address, tx);
      });
      current += this.limit;
    }

    this.updateWallet(address, txData);

    return true;
  }
  async fetchTransactionData(address, limit = this.limit, offset) {
    this.logger.info(
      `Fetching Transaction Data for \t${address} \tlimit: ${limit} \toffset: ${offset}`
    );
    return await this.fetchWalletData(address, limit, offset);
  }
  async fetchWalletData(address, limit = 1, offset = 0) {
    this.logger.info(`Fetch Wallet Data for ${address}`);
    return await this.blockexplorer.getAddress(address, { limit, offset });
  }

  async saveTransactionData(address, tx) {
    let sent = false;
    let received = false;
    let amount = 0;
    let amountUSD = 0;
    let timestamp = tx.time * 1000;

    tx.out.forEach((output) => {
      if (output.addr === address) {
        received = true;
      }

      if (output.value) {
        amount += output.value;
      }
    });

    tx.inputs.forEach((input) => {
      if (input.prev_out.addr === address) {
        sent = true;
      }
    });

    let rate = await this.db.getNearestPrice(this.symbol, new Date(timestamp));

    amount = Math.round(amount) / 1e8;
    amountUSD = Math.round(amount * rate.price * 100) / 100;

    this.db.saveTransaction({
      txid: tx.hash,
      address,
      currency: "Bitcoin",
      symbol: this.symbol,
      source: "",
      destination: "",
      inputs: tx.inputs,
      outputs: tx.out,
      block: tx.block_height,
      timestamp: tx.time,
      index: tx.tx_index,
      sent,
      received,
      rate: rate.price,
      amount,
      amountUSD,
    });
  }
  async updateWallet(address, txData) {
    this.logger.info(`Updating Wallet data for ${address}`);
    let totalFeesUSD = 0;

    for (const tx of txData.txs) {
      let timestamp = tx.time * 1000;
      let rate = await this.db.getNearestPrice(
        this.symbol,
        new Date(timestamp)
      );
      let inputValue = 0;
      let outputValue = 0;
      let fees = 0;

      tx.out.forEach((output) => {
        if (output.value) {
          outputValue += output.value;
        }
      });

      tx.inputs.forEach((input) => {
        if (input.prev_out && input.prev_out.value) {
          inputValue += input.prev_out.value;
        }
      });

      fees = (inputValue - outputValue) / 1e8;
      console.log("");
      console.log(inputValue);
      console.log(outputValue);
      console.log(`fees ${fees}`);
      totalFeesUSD += fees * rate.price;
    }

    console.log(`Total Fees: ${totalFeesUSD}`);
  }
}
module.exports = BitcoinWalletScraper;
