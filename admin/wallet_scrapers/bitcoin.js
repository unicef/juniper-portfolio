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
    let count = 0;
    let txData = [];

    this.logger.info(`Scraping ${txs} txs for ${address}`);
    while (current < txs) {
      txData = await this.fetchTransactionData(address, this.limit, current);

      txData.txs.forEach(async (tx) => {
        count++;
        await this.saveTransactionData(address, tx);
      });
      current += this.limit;
    }

    return true;
  }
  async fetchTransactionData(address, limit = this.limit, offset) {
    return this.fetchWalletData(address, limit, offset);
  }
  async fetchWalletData(address, limit = 1, offset = 0) {
    return await this.blockexplorer.getAddress(address, { limit, offset });
  }

  async saveTransactionData(address, tx) {
    let sent = false;
    let received = false;
    let amount = 0;
    let amountUSD = 0;
    let timestamp = tx.time * 1000;
    let rate = await this.db.getNearestPrice(this.symbol, new Date(timestamp));

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
}
module.exports = BitcoinWalletScraper;
