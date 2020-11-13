require("dotenv").config({ path: "../.env" });
const Juniper = require("..");
const config = require("../config");

const juniper = new Juniper(config);

const wallets = [
  {
    address: "bc1qunraq0dp8yreu990phqma9rq5m8s57nt3sszeeukcqkm3xx57q6slgkgef",
    name: "Tranche 1 Multi-Sig Bitcoin",
    tags: [],
    currency: "Bitcoin",
    symbol: "BTC",
    balance: 0,
    fees: 0,
    feesUSD: 0,
    isUnicef: true,
    isMultisig: false,
    isTracked: false,
    isTrackedOther: false,
    isAccount: false,
    multisigOwners: [
      {
        walletAddress: "",
        ownerName: "",
      },
    ],
    active: true,
  },
  {
    address: "0x7B8203687b7f9e51207270d7d3f3B2a72323Ad4c",
    name: "Tranche 1 Multi-Sig Ethereum",
    tags: ["multisig"],
    currency: "Ethereum",
    symbol: "ETH",
    balance: 0,
    fees: 0,
    feesUSD: 0,
    isUnicef: true,
    isMultisig: false,
    isTracked: false,
    isTrackedOther: false,
    isAccount: false,
    multisigOwners: [
      {
        walletAddress: "0xc4498503A5bF7cb60642bA8e9dBa952bAa92a1f1",
        ownerName: "Owner 1",
      },
      {
        walletAddress: "0x319FDED89172506b3E0A7D5e5c84066DA66383BD",
        ownerName: "Owner 2",
      },
      {
        walletAddress: "0x49165B3caEE84B5714BDE1Fa9bD68091b3E8E276",
        ownerName: "Owner 3",
      },
    ],
    active: true,
  },
  {
    address: "0x61acE53098d226e77cd26AE26E2C377FB9cB7657",
    name: "Tranche 2 Multi-Sig Ethereum",
    tags: ["multisig"],
    currency: "Ethereum",
    symbol: "ETH",
    balance: 0,
    fees: 0,
    feesUSD: 0,
    isUnicef: true,
    isMultisig: false,
    isTracked: false,
    isTrackedOther: false,
    isAccount: false,
    multisigOwners: [
      {
        walletAddress: "0xB88A88a869e3ECa21CbE0E59Db07234e31BC6D52",
        ownerName: "Owner 1",
      },
      {
        walletAddress: "0x31AB6b2E028540C0A7259C94017e13e8fceee193",
        ownerName: "Owner 2",
      },
      {
        walletAddress: "0x817838AB98F50F87917359A918cB7E57C07F9Fa4",
        ownerName: "Owner 3",
      },
    ],
    active: true,
  },
];

async function makeWallet() {
  if (wallets.length) {
    await juniper.createWallet(wallets.pop());
    setTimeout(() => {
      makeWallet();
    }, 10000);
  } else {
    juniper.exit();
  }
}

(async () => {
  makeWallet();
})();
