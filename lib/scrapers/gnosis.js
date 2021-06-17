require("dotenv").config({ path: "../../.env" });
const ethers = require("ethers");
const abi = require("./abi");

class GnosisScraper {
  constructor(config, db) {
    this.config = config;
    this.ethers = ethers;
    this.abi = abi.GnosisAbi.abi;
    this.address = "0x61acE53098d226e77cd26AE26E2C377FB9cB7657";
    this.network = "homestead";
    this.db = db;
    this.logs = [];
    this.provider = this.ethers.getDefaultProvider(this.network, {
      infura: process.env.INFURA_API_KEY,
      etherscan: process.env.ETHERSCAN_API_KEY,
      alchemy: process.env.ALCHEMY_API_KEY,
    });

    this.contract = new ethers.Contract(this.address, this.abi, this.provider);
  }

  async scrapeAuthRecords() {
    const filter = {
      address: this.address,
      topics: [],
    };
    const logs = await this.contract.queryFilter(filter, 0, 1e10);
    
    logs
      .filter((log) => {
        return log.event === "Confirmation";
      })
      .forEach(async (log) => {
        const tx = await this.db.getTransaction(log.transactionHash);
        
        await this.db.saveAuthRecord({
          txid: log.transactionHash,
          contractAddress: this.address,
          signerAddress: log.args.sender,
          txIndex: log.args.transactionId.toNumber(),
          timestamp: tx.timestamp,
        });
      });
  }
  async getLogs() {
    const filter = {
      address: this.address,
      topics: [],
    };
    const logs = await this.contract.queryFilter(filter, 0, 1e10);
    logs.forEach((log) => {
      this.logs.push(log);
    });
  }
  getConfirmationLogs() {
    return this.logs.filter((log) => {
      return log.event === "Confirmation";
    });
  }
  setAddress(address) {
    this.address = address;
  }
  setNetwork(network) {
    this.network = network;
  }
  async getTransactionCount() {
    return await this.contract.transactionCount();
  }
  async getTransaction(index) {
    return await this.contract.transactions(index);
  }
  async getConfirmations(index) {
    await this.contract.getConfirmations(index);
  }
}

module.exports = GnosisScraper;
