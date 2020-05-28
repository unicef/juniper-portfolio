import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import priceIcon from "./priceIcon.svg";
import { BalanceCard, TxFeeCard, TotalCard, WalletCard } from "./Cards";
import Fab from "@material-ui/core/Fab";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

const mainStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100%",
  },
  priceRectangle: {
    fontFamily: "Roboto",
    minHeight: 77,
    borderRadius: 5,
    fontSize: 19,
    backgroundColor: "#daf5ff",
    display: "flex",
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
    fontFamily: "Roboto",
    fontSize: 28,
    fontWeight: 700,
    color: "#000000",
  },
  addWalletButton: {
    width: 148,
    height: 35,
    fontFamily: "Cabin",
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
  fabLeft: {
    color: "#cbcbcb",
    backgroundColor: "rgba(0,0,0,0)",
    boxShadow: "none",
    float: "right",
    position: "absolute",
    top: "40%",
    left: -60,
  },
  fabRight: {
    color: "#cbcbcb",
    backgroundColor: "rgba(0,0,0,0)",
    boxShadow: "none",
    float: "right",
    position: "absolute",
    top: "40%",
    right: -60,
  },
}));

export default function () {
  const [balances, setBalances] = useState([]);
  const [fees, setFees] = useState({});
  const [totals, setTotals] = useState({});
  const [ethereumWallets, setEthereumWallets] = useState([]);
  const [ethereumWalletIndex] = useState(0);
  const [bitcoinWallets, setBitcoinWallets] = useState([]);
  const [bitcoinWalletIndex] = useState(0);

  useEffect(() => {
    /* 
      State will passed through props here
      Maths will take place in the parent class
    */

    setBalances([
      {
        symbol: "ETH",
        balanceUSD: "10,000",
        currency: "Ether",
        received: 100,
        invested: 50,
      },
      {
        symbol: "BTC",
        balanceUSD: "0",
        currency: "Bitcoin",
        received: 1,
        invested: 1,
      },
    ]);

    setFees({
      amountUSD: 3.23,
      amountBTC: 0.012,
      amountETH: 0.0000321,
    });

    setTotals({
      received: "28,531.96",
      invested: "19,287.47",
    });

    setEthereumWallets(
      walletData.filter((wallet) => {
        return wallet.currency === "Ethereum";
      })
    );
    setBitcoinWallets(
      walletData.filter((wallet) => wallet.currency === "Bitcoin")
    );
  }, []);

  const classes = mainStyles();
  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12} className={classes.priceRectangle}>
          <img src={priceIcon} className={classes.priceIcon} />{" "}
          <b className={classes.priceTitle}>USD Price</b> = Average across three
          cryptocurrency exchanges, calculated at 12:01 pm (EST)
          <a href="#" className={classes.moreInfo}>
            More Info
          </a>
        </Grid>

        <Grid item xs={12} style={{ marginTop: "2em" }}>
          <h1 className={classes.title}>UNICEF HQ wallet overview</h1>
        </Grid>
        {balances.map((balance) => {
          return (
            <Grid item xs={12} sm={3} key={balance.received}>
              <BalanceCard
                symbol={balance.symbol}
                balanceUSD={balance.balanceUSD}
                currency={balance.currency}
                received={balance.received}
                invested={balance.invested}
              />
            </Grid>
          );
        })}
        <Grid item xs={12} sm={3}>
          <TxFeeCard
            amountUSD={fees.amountUSD}
            amountBTC={fees.amountBTC}
            amountETH={fees.amountETH}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TotalCard received={totals.received} invested={totals.invested} />
        </Grid>
        <Grid item xs={12} style={{ marginTop: "2em" }}>
          <Button
            variant="contained"
            color="primary"
            className={classes.addWalletButton}
          >
            Add New Wallet
          </Button>
        </Grid>

        <Grid item xs={12} style={{ marginTop: "4em" }}>
          <h3 className={classes.walletSubtitle}>
            {ethereumWallets.length} Ethereum Wallets
          </h3>
        </Grid>
        <Grid container spacing={2} style={{ position: "relative" }}>
          {ethereumWalletIndex > 0 && (
            <Fab className={classes.fabLeft}>
              <ChevronLeftIcon fontSize="large" />
            </Fab>
          )}

          {ethereumWalletIndex + 2 < ethereumWallets.length && (
            <Fab className={classes.fabRight}>
              <ChevronRightIcon fontSize="large" />
            </Fab>
          )}

          {ethereumWallets
            .slice(ethereumWalletIndex, ethereumWalletIndex + 2)
            .map((wallet) => {
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

        <Grid item xs={12} style={{ marginTop: "4em" }}>
          <h3 className={classes.walletSubtitle}>2 Bitcoin Wallets</h3>
        </Grid>

        <Grid container spacing={2} style={{ position: "relative" }}>
          {bitcoinWalletIndex > 0 && (
            <Fab className={classes.fabLeft}>
              <ChevronLeftIcon fontSize="large" />
            </Fab>
          )}

          {bitcoinWalletIndex + 2 < bitcoinWallets.length && (
            <Fab className={classes.fabRight}>
              <ChevronRightIcon fontSize="large" />
            </Fab>
          )}

          {bitcoinWallets
            .slice(bitcoinWalletIndex, bitcoinWalletIndex + 2)
            .map((wallet) => {
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
}

// Mock Wallet Data. Will come from API and be passed from parent class
const walletData = [
  {
    name: "Ethereum wallet test 1",
    currency: "Ethereum",
    tags: ["Unicef HQ"],
    symbol: "ETH",
    amount: 25,
    amountUSD: "4692.75",
    address: "0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7",
  },
  {
    name: "Ethereum wallet test 2",
    currency: "Ethereum",
    tags: ["Unicef HQ", "Multisig"],
    symbol: "ETH",
    amount: 25,
    amountUSD: "4692.75",
    address: "0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7",
  },
  {
    name: "Ethereum wallet test 3",
    currency: "Ethereum",
    tags: ["Unicef HQ", "Multisig"],
    symbol: "ETH",
    amount: 25,
    amountUSD: "4692.75",
    address: "0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7",
  },
  {
    name: "Blockchain wallet test 1",
    currency: "Bitcoin",
    tags: [],
    symbol: "BTC",
    amount: 1,
    amountUSD: "9692.75",
    address: "Dbf7f01ED1389205A3A3b2A69De6B2c43e7",
  },
  {
    name: "Bitcoin wallet 2",
    currency: "Bitcoin",
    tags: ["Unicef HQ"],
    symbol: "BTC",
    amount: 25,
    amountUSD: "232,102.21",
    address: "Dbf7f01ED1389205A3A3b2A69De6B2c43e7",
  },
];
