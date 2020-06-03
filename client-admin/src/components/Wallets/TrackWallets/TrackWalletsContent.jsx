import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import PriceIcon from "../icons/PriceIcon";
import { WalletCard } from "../WalletCards";

const mainStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100%",
  },
  priceRectangle: {
    fontFamily: '"Roboto", sans-serif',
    minHeight: 77,
    borderRadius: 5,
    fontSize: 19,
    backgroundColor: "#daf5ff",
    display: "flex",
    flexDirection: "rows",
    alignItems: "center",
    justifyContent: "center",
  },
  priceIcon: {
    marginRight: 5,
  },
  priceTitle: {
    marginRight: 5,
  },
  moreInfo: {
    textTransform: "uppercase",
    textDecoration: "none",
    width: 73,
    height: 15,
    fontSize: 12,
    fontWeight: 700,
    color: "#00aeef",
    marginLeft: "1em",
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
  walletSubtitle: {
    fontSize: 14,
    fontWeight: 700,
    letterSpacing: 0.78,
    color: "#898989",
    textTransform: "uppercase",
    marginBottom: "2em",
  },
}));

export default withRouter(function ({ history }) {
  const [trackedWallets, setTrackedWallets] = useState([]);
  const [otherWallets, setOtherWallets] = useState([]);

  useEffect(() => {
    /* 
      State will passed through props here
      Maths will take place in the parent class
    */

    setTrackedWallets(trackedWalletsData);
    setOtherWallets(otherWalletsData);
  }, []);

  const viewWalletDetails = (address) => {
    history.push(`/wallets/${address}`);
  };

  const classes = mainStyles();
  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12} className={classes.priceRectangle}>
          <div>
            <PriceIcon className={classes.priceIcon} />
            <b className={classes.priceTitle}>USD Price</b> = Average across
            three cryptocurrency exchanges, calculated at 12:01 pm (EST)
            <a href="/#" className={classes.moreInfo}>
              More Info
            </a>
          </div>
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
            InputProps={{
              className: classes.followWalletButton,
            }}
          >
            Follow a Blockchain Wallet
          </Button>
        </Grid>

        <Grid item xs={12} style={{ marginTop: "4em" }}>
          <h3 className={classes.walletSubtitle}>
            Following {trackedWallets.length} Wallets
          </h3>
        </Grid>
        <Grid container spacing={2} style={{ position: "relative" }}>
          {trackedWallets.map((wallet) => {
            return (
              <Grid item xs={6}>
                <WalletCard
                  name={wallet.name}
                  currency={wallet.currency}
                  tags={wallet.tags}
                  symbol={wallet.symbol}
                  amount={wallet.amount}
                  amountUSD={wallet.amountUSD}
                  address={wallet.address}
                  viewTransactionOnClick={viewWalletDetails}
                />
              </Grid>
            );
          })}
        </Grid>

        <Grid item xs={12} style={{ marginTop: "4em" }}>
          <h3 className={classes.walletSubtitle}>
            {otherWallets.length} Other Wallets
          </h3>
        </Grid>

        <Grid container spacing={2} style={{ position: "relative" }}>
          {otherWallets.map((wallet) => {
            return (
              <Grid item xs={6}>
                <WalletCard
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
});

// Mock Wallet Data. Will come from API and be passed from parent class
const trackedWalletsData = [
  {
    name: "Prescrypto",
    currency: "Ethereum",
    tags: ["Unicef HQ"],
    symbol: "ETH",
    amount: 25,
    amountUSD: "4692.75",
    address: "0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7",
  },
  {
    name: "Natcom France",
    currency: "Ethereum",
    tags: [],
    symbol: "ETH",
    amount: 25,
    amountUSD: "4692.75",
    address: "0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7",
  },
  {
    name: "UTO Pixar",
    currency: "Bitcoin",
    tags: [],
    symbol: "BTC",
    amount: 1,
    amountUSD: "9692.75",
    address: "Dbf7f01ED1389205A3A3b2A69De6B2c43e7",
  },
];
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
