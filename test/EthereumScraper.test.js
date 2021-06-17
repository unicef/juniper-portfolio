require("dotenv").config({ path: "./.env" });
const {expect} = require('chai')
const {EthereumScraper, GnosisScraper} = require('../lib/scrapers/')
const {} = require('../lib/scrapers/')
const config = require('../config')
const DB = require('../lib/db');

describe('Ethereum Scraper', async() => {
    let scraper, gnosisScraper;
    let db
    const defaultWallet =   {
        tags: [],
        balance: 1014.72687,
        fees: 0,
        feesUSD: 0,
        isUnicef: true,
        isMultisig: true,
        isTracked: false,
        isTrackedOther: false,
        isAccount: false,
        multisigOwners: [  ],
        txs: 0,
        active: true,
        _id: '60870903998e10076dcbdf9e',
        address: '0xb1bE5E4C68B16c5b434B24D55c252E5852f7Aa29',
        __v: 0,
        currency: 'Ethereum',
        name: 'Multisig Ethereum #3',
        symbol: 'ETH'
      }
    
    beforeEach(() => {
        
        db = new DB(config.db)
        scraper = new EthereumScraper(config.ethereumScraper, db);
        gnosisScraper = new GnosisScraper({}, db);
    })

    afterEach(async () => {
        db = null;
    })

    it('exists', () => {
        expect(typeof scraper).to.be.equal('object')
    })

    describe('Scrape Wallet', async() => {
        it('scrapes transaction data', async() => {
            await scraper.scrapeTransactionData(
                defaultWallet.address,
                defaultWallet.isUnicef,
                defaultWallet.multisigOwners,
                defaultWallet.isTracked || defaultWallet.isTrackedOther
              );

              if (defaultWallet.isMultisig) {
                gnosisScraper.setAddress(defaultWallet.address);
                await gnosisScraper.scrapeAuthRecords();
              }
                 
        })
    })
})