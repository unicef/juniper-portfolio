const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const authRecord = new Schema({
  txid: { type: String },
  contractAddress: { type: String },
  signerAddress: { type: String },
  txIndex: { type: Number },
  timestamp: { type: Date },
});

authRecord.index(
  { txid: 1, txIndex: 1, signerAddress: 1, contractAddress: 1 },
  { unique: true }
);

const GnosisAuthRecord = mongoose.model("AuthRecord", authRecord);

module.exports = GnosisAuthRecord;
