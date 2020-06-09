const blockexplorer = require("blockchain.info/blockexplorer");

class BitcoinWalletScraper {
  constructor(config, db) {
    this.config = config;

    this.blockexplorer = blockexplorer;
    this.address = this.config.address;
    this.limit = this.config.limit || 500;
    this.db = db;
  }
  async fetchWalletData(limit = 1, offset = 0) {
    return this.blockexplorer.getAddress(this.address, { limit, offset });
  }
  async fetchTransactionData(limit, offset) {
    return this.fetchWalletData(limit, offset);
  }
  async saveTransactionData(tx) {
    let sent = false;
    let received = false;

    tx.out.forEach((output) => {
      if (output.addr === this.address) {
        received = true;
      }
    });

    tx.inputs.forEach((input) => {
      if (input.prev_out.addr === this.address) {
        sent = true;
      }
    });

    console.log({
      txid: tx.hash,
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
      rate: null, // TODO: pull price from price db, update amounts.
      amount: null,
      amountUSD: null,
    });
  }
  async scrapeTransactionData() {
    const walletData = await this.fetchWalletData();
    const txs = walletData.n_tx;
    let current = 0;
    let txData = [];
    while (current < txs) {
      txData = await this.fetchTransactionData(this.limit, current);

      txData.txs.forEach((tx) => {
        this.saveTransactionData(tx);
      });
      current += this.limit;
    }
    return true;
  }

  async test() {
    console.log(await this.scrapeTransactionData());
  }
}

const walletData = {
  hash160: "62e907b15cbf27d5425399ebf6f0fb50ebb88f18",
  address: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
  n_tx: 2275,
  total_received: 6832247273,
  total_sent: 0,
  final_balance: 6832247273,
  txs: [
    {
      ver: 1,
      inputs: [Array],
      weight: 1204,
      block_height: 633719,
      relayed_by: "0.0.0.0",
      out: [Array],
      lock_time: 0,
      result: 1000,
      size: 301,
      block_index: 0,
      time: 1591624314,
      tx_index: 0,
      vin_sz: 1,
      hash: "4160c25bffafab6da8e84311175e779c4b038ab32bb6b5795aa58028fb373100",
      vout_sz: 3,
    },
  ],
};

const txData = {
  ver: 1,
  inputs: [],
  weight: 1204,
  block_height: 633719,
  relayed_by: "0.0.0.0",
  out: [],
  lock_time: 0,
  result: 1000,
  size: 301,
  block_index: 0,
  time: 1591624314,
  tx_index: 0,
  vin_sz: 1,
  hash: "4160c25bffafab6da8e84311175e779c4b038ab32bb6b5795aa58028fb373100",
  vout_sz: 3,
};

module.exports = BitcoinWalletScraper;
