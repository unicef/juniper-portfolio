require("dotenv").config({ path: "../../.env" });
const ethers = require("ethers");
const abi = require("./abi");

class GnosisScraper {
  constructor(config) {
    this.config = config;
    this.ethers = ethers;
    this.abi = abi.GnosisAbi.abi;
    this.address = "0x61acE53098d226e77cd26AE26E2C377FB9cB7657";
    this.network = "homestead";
    this.provider = this.ethers.getDefaultProvider(this.network, {
      infura: process.env.INFURA_API_KEY,
      etherscan: process.env.ETHERSCAN_API_KEY,
    });

    this.contract = new ethers.Contract(this.address, this.abi, this.provider);
  }
  async test() {
    console.log(process.env.INFURA_API_KEY);
    console.log(process.env.ETHERSCAN_API_KEY);
    // Print some contract details
    let txCount;
    let tx;
    let confirmations;
    try {
      txCount = await this.contract.transactionCount();
      tx = await this.contract.transactions(0);
      confirmations = await this.contract.getConfirmations(0);
    } catch (e) {
      console.log(e);
    }

    console.log(`Total Tx: ${txCount}`);
    console.log(tx);
    console.log(confirmations);
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
