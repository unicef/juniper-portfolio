const blockexplorer = require("blockchain.info/blockexplorer");

class BitcoinWallet {
  constructor(config) {
    this.config = config;

    this.blockexplorer = blockexplorer;
    this.address = this.config.address;
  }
  async fetchWalletData(limit, offset) {
    return this.blockexplorer.getAddress(this.address, { limit, offset });
  }
  async fetchTransactionData(limit, offset) {
    await this.fetchWalletData();
  }
}

module.exports = BitcoinWallet;
