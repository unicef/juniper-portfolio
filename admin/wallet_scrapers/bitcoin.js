const blockexplorer = require("blockchain.info/blockexplorer");
const Logger = require("../logger");

class BitcoinWalletScraper {
  constructor(config, db) {
    this.config = config;
    this.logger = new Logger("Bitcoin Scraper");

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

    tx.out.forEach((output) => {
      if (output.addr === address) {
        received = true;
      }
    });

    tx.inputs.forEach((input) => {
      if (input.prev_out.addr === address) {
        sent = true;
      }
    });

    this.db.saveTransaction({
      txid: tx.hash,
      address,
      currency: "Bitcoin",
      symbol: "BTC",
      source: "",
      destination: "",
      inputs: tx.inputs,
      outputs: tx.out,
      block: tx.block_height,
      timestamp: tx.time,
      index: tx.tx_index,
      sent,
      received,
      rate: null,
      amount: null,
      amountUSD: null,
    });
  }
}
module.exports = BitcoinWalletScraper;
