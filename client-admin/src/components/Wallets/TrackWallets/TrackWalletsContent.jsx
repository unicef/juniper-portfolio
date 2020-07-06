import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import PriceInfoBanner from "../../../ui/PriceInfoBanner";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { TrackWalletCard } from "../WalletCards";
import AddWallet from "../AddWallet";

const mainStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100%",
  },
  title: {
    fontFamily: '"Roboto", sans-serif',
    fontSize: 28,
    fontWeight: 700,
    color: "#000000",
  },
  trackWalletsText: {
    fontFamily: '"Roboto", sans-serif',
    fontSize: 19,
    lineHeight: 1.42,
    color: "#000000",
  },
  followWalletButton: {
    fontFamily: '"Cabin", sans-serif',
    fontSize: 12,
    fontWeight: 700,
    textAlign: "center",
    color: "#ffffff",
    boxShadow: "none",
  },
  addWalletButton: {
    width: 148,
    height: 35,
    fontFamily: '"Cabin", sans-serif',
    fontSize: 12,
    fontWeight: 700,
    textAlign: "center",
    color: "#ffffff",
    boxShadow: "none",
  },
  walletSubheading: {
    fontSize: 14,
    fontWeight: 700,
    letterSpacing: 0.78,
    color: "#898989",
    textTransform: "uppercase",
    marginBottom: "2em",
  },
}));

export default function ({ getExchangeRate }) {
  const [trackedWallets, setTrackedWallets] = useState([]);
  const [otherWallets, setOtherWallets] = useState([]);
  const [showAddWalletModal, setShowAddWalletModal] = useState(false);
  const [bitcoinExchangeRate, setBitcoinExchangeRate] = useState(0);
  const [ethereumExchangeRate, setEthereumExchangeRate] = useState(0);

  const getTrackedWallets = async () => {
    let res, walletData;
    try {
      res = await fetch("/rest/admin/wallets/tracked");
      walletData = await res.json();
    } catch (e) {
      return console.log(e);
    }

    setTrackedWallets(walletData);
    setOtherWallets(otherWalletsData);
  };

  useEffect(() => {
    const getExchangeRates = async () => {
      setBitcoinExchangeRate(await getExchangeRate("BTC"));
      setEthereumExchangeRate(await getExchangeRate("ETH"));
    };
    getExchangeRates();
    getTrackedWallets();
  }, []);

  const classes = mainStyles();
  return (
    <div className={classes.root}>
      <AddWallet
        open={showAddWalletModal}
        setShowAddWalletModal={setShowAddWalletModal}
        afterAddWallet={() => {
          getTrackedWallets();
        }}
        showMultisig={false}
        isUnicef={false}
        isTracked={true}
      />
      <Grid container>
        <Grid item xs={12}>
          <PriceInfoBanner />
        </Grid>

        <Grid item xs={12} style={{ marginTop: "2em" }}>
          <h1 className={classes.title}>Tracking blockchain wallets</h1>
          <p className={classes.trackWalletsText}>
            Blockchain wallets can offer visibility to the public to view the
            movement of cryptocurrency, using the wallet public address. This
            address is also used to transact in cryptocurrency.
          </p>
          <Button
            color="primary"
            variant="contained"
            className={classes.followWalletButton}
            onClick={() => {
              setShowAddWalletModal(true);
            }}
          >
            Follow a Blockchain Wallet
          </Button>
        </Grid>

        <Grid item xs={12} style={{ marginTop: "4em" }}>
          <h3 className={classes.walletSubheading}>
            Following {trackedWallets.length} Wallets
          </h3>
        </Grid>
        <Grid container spacing={2} style={{ position: "relative" }}>
          {trackedWallets &&
            trackedWallets.map((wallet, index) => {
              return (
                <Grid item xs={6} key={`${index}-${wallet.address}`}>
                  <TrackWalletCard
                    name={wallet.name}
                    currency={wallet.currency}
                    tags={wallet.tags}
                    symbol={wallet.symbol}
                    balance={wallet.balance}
                    address={wallet.address}
                    exchangeRate={
                      wallet.symbol === "ETH"
                        ? ethereumExchangeRate
                        : bitcoinExchangeRate
                    }
                    afterUnfollowWallet={() => {
                      getTrackedWallets();
                    }}
                  />
                </Grid>
              );
            })}
        </Grid>

        <Grid item xs={12} style={{ marginTop: "4em" }}>
          <h3 className={classes.walletSubheading}>
            {otherWallets.length} Other Wallets
          </h3>
        </Grid>

        <Grid container spacing={2} style={{ position: "relative" }}>
          {otherWallets &&
            otherWallets.map((wallet, index) => {
              return (
                <Grid item xs={6} key={`${index}-${wallet.address}`}>
                  <TrackWalletCard
                    name={wallet.name}
                    currency={wallet.currency}
                    tags={wallet.tags}
                    symbol={wallet.symbol}
                    amount={wallet.amount}
                    amountUSD={wallet.amountUSD}
                    address={wallet.address}
                  />
                </Grid>
              );
            })}
        </Grid>
      </Grid>
    </div>
  );
}

const otherWalletsData = [
  {
    name: "Natcom New Zealand",
    currency: "Ethereum",
    tags: ["Unicef HQ"],
    symbol: "ETH",
    amount: 25,
    amountUSD: "4692.75",
    address: "0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7",
  },
  {
    name: "Natcom Australia",
    currency: "Ethereum",
    tags: [],
    symbol: "ETH",
    amount: 25,
    amountUSD: "4692.75",
    address: "0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7",
  },
  {
    name: "Ethereum Foundation Alt",
    currency: "Ethereum",
    tags: [],
    symbol: "ETH",
    amount: 1,
    amountUSD: "9692.75",
    address: "Dbf7f01ED1389205A3A3b2A69De6B2c43e7",
  },
  {
    name: "Coinsense",
    currency: "Ethereum",
    tags: [],
    symbol: "ETH",
    amount: 1,
    amountUSD: "9692.75",
    address: "Dbf7f01ED1389205A3A3b2A69De6B2c43e7",
  },
];
