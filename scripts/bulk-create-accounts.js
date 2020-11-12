require("dotenv").config({ path: "../.env" });
const Juniper = require("..");
const config = require("../config");

const juniper = new Juniper(config);

const accounts = [
  {
    name: "Ethereum Foundation",
    addresses: [
      {
        address: "0x9ee457023bb3de16d51a003a247baead7fce313d",
        currency: "Ether",
        amount: 0,
      },
      {
        address: "366BiftzLeqSwhNCYhX7huj3HxkpAZ4gju",
        currency: "Bitcoin",
        amount: 0,
      },
    ],
    country: "",
    description: "",
    image: "",
    type: "donor",
    active: true,
  },
  {
    name: "UNICEF France",
    addresses: [
      {
        address: "0x53dc0c92380cce50e0c3d9df625478c3d4069bf3",
        currency: "Ether",
        amount: 0,
      },
      {
        address: "0xa59b29d7dbc9794d1e7f45123c48b2b8d0a34636",
        currency: "Ether",
        amount: 0,
      },
      {
        address: "3LMgFSv7xh8S2cXmeAina6oEd2GTPXM5z4",
        currency: "Bitcoin",
        amount: 0,
      },
    ],
    country: "",
    description: "",
    image: "",
    type: "natcom",
    active: true,
  },
  {
    name: "Atix Labs",
    addresses: [
      {
        address: "0x9808262A79c36340db8626066Ad7A8B990642955",
        currency: "Ether",
        amount: 0,
      },
      {
        address: "3PZdPWbbm9fTDo4C5a3F6G5RHAHkzaGGe5",
        currency: "Bitcoin",
        amount: 0,
      },
    ],
    country: "",
    description: "",
    image: "",
    type: "startup",
    active: true,
  },
  {
    name: "UTO Pixar",
    addresses: [
      {
        address: "0x2292270fd4bdd414f0aef6d7529774baa1feee98",
        currency: "Ether",
        amount: 0,
      },
    ],
    country: "",
    description: "",
    image: "",
    type: "startup",
    active: true,
  },
  {
    name: "Prescrypto",
    addresses: [
      {
        address: "0x18E602C36076928be908974800b52CE1d0c55206",
        currency: "Ether",
        amount: 0,
      },
    ],
    country: "",
    description: "",
    image: "",
    type: "startup",
    active: true,
  },
  {
    name: "Afinidata (Educatic)",
    addresses: [
      {
        address: "0xDB1Ff935Db3F94674FE4Bf21c6519903d114C790",
        currency: "Ether",
        amount: 0,
      },
    ],
    country: "",
    description: "",
    image: "",
    type: "startup",
    active: true,
  },
  {
    name: "Somleng (Chatterbox)",
    addresses: [
      {
        address: "0x49D6d2CaDF555417e1B48084FAdABDb45E217D2b",
        currency: "Ether",
        amount: 0,
      },
    ],
    country: "",
    description: "",
    image: "",
    type: "startup",
    active: true,
  },
  {
    name: "Ideasis",
    addresses: [
      {
        address: "0xdc1BD0c9Bdb33d27036875aD182Bf27b52641704",
        currency: "Ether",
        amount: 0,
      },
    ],
    country: "",
    description: "",
    image: "",
    type: "startup",
    active: true,
  },
  {
    name: "StaTwig",
    addresses: [
      {
        address: "0x06Fd1a0356A1e58852721331A3aEd1b7ebE214ed",
        currency: "Ether",
        amount: 0,
      },
    ],
    country: "",
    description: "",
    image: "",
    type: "startup",
    active: true,
  },
  {
    name: "Avyantra",
    addresses: [
      {
        address: "0xaCBF0d03A8F8B65079B3E63a8E13b05cC72aa1d8",
        currency: "Ether",
        amount: 0,
      },
    ],
    country: "",
    description: "",
    image: "",
    type: "startup",
    active: true,
  },
  {
    name: "Cireha",
    addresses: [
      {
        address: "0xC573D2579279ff5a5156c18c4B4937a0A530aF85",
        currency: "Ether",
        amount: 0,
      },
    ],
    country: "",
    description: "",
    image: "",
    type: "startup",
    active: true,
  },
  {
    name: "OS City",
    addresses: [
      {
        address: "0x3e07DAAC517e7587903Fec360e48468e1B4cc46F",
        currency: "Ether",
        amount: 0,
      },
    ],
    country: "",
    description: "",
    image: "",
    type: "startup",
    active: true,
  },
  {
    name: "Utopic Studio",
    addresses: [
      {
        address: "0x384cd63a3429480949b50C0fbDd347be924Cdf82",
        currency: "Ether",
        amount: 0,
      },
    ],
    country: "",
    description: "",
    image: "",
    type: "startup",
    active: true,
  },
];

async function makeAccount() {
  if (accounts.length) {
    await juniper.createAccount(accounts.pop());
    setTimeout(() => {
      makeAccount();
    }, 2000);
  } else {
    juniper.exit();
  }
}

(async () => {
  for (let i = 0; i < accounts.length; i++) {
    for (let j = 0; j < accounts[i].addresses.length; j++) {
      if (accounts[i].addresses[j].currency === "Ether") {
        accounts[i].addresses[j].address = accounts[i].addresses[
          j
        ].address.toLowerCase();
      }
    }
  }
  makeAccount();
})();
