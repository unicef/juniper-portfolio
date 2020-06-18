import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import PriceIcon from "../icons/PriceIcon";
import { BalanceCard, TxFeeCard, TotalCard, WalletCard } from "../WalletCards";
import Fab from "@material-ui/core/Fab";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import AddWallet from "./AddWallet";

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
  fabLeft: {
    color: "#cbcbcb",
    backgroundColor: "rgba(0,0,0,0)",
    boxShadow: "none",
    float: "right",
    position: "absolute",
    top: "40%",
    left: -60,
    "&:hover": {
      backgroundColor: "#ecfaff",
    },
  },
  fabRight: {
    color: "#cbcbcb",
    backgroundColor: "rgba(0,0,0,0)",
    boxShadow: "none",
    float: "right",
    position: "absolute",
    top: "40%",
    right: -60,
    "&:hover": {
      backgroundColor: "#ecfaff",
    },
  },
}));

export default function ({ viewWalletDetails, getExchangeRate }) {
  const [balances, setBalances] = useState([]);
  const [fees, setFees] = useState({});
  const [totals, setTotals] = useState({});
  const [ethereumWallets, setEthereumWallets] = useState([]);
  const [ethereumWalletIndex, setEthereumWalletIndex] = useState(0);
  const [bitcoinWallets, setBitcoinWallets] = useState([]);
  const [bitcoinWalletIndex, setBitcoinWalletIndex] = useState(0);
  const [showAddWalletModal, setShowAddWalletModal] = useState(false);
  const [bitcoinExchangeRate, setBitcoinExchangeRate] = useState(0);
  const [ethereumExchangeRate, setEthereumExchangeRate] = useState(0);

  const incrementEthWalletIndex = () => {
    if (ethereumWalletIndex + 1 <= ethereumWallets.length) {
      setEthereumWalletIndex(ethereumWalletIndex + 1);
    }
  };
  const incrementBtcWalletIndex = () => {
    if (bitcoinWalletIndex + 1 <= bitcoinWallets.length) {
      setBitcoinWalletIndex(bitcoinWalletIndex + 1);
    }
  };

  const decrementEthWalletIndex = () => {
    if (ethereumWalletIndex - 1 >= 0) {
      setEthereumWalletIndex(ethereumWalletIndex - 1);
    }
  };
  const decrementBtcWalletIndex = () => {
    if (bitcoinWalletIndex - 1 >= 0) {
      setBitcoinWalletIndex(bitcoinWalletIndex - 1);
    }
  };

  const getWallets = async () => {
    let res, walletData;
    try {
      res = await fetch("/rest/admin/wallets");
      walletData = await res.json();
    } catch (e) {
      return console.log(e);
    }

    setEthereumWallets(
      walletData.filter((wallet) => {
        return wallet.currency === "Ethereum";
      })
    );

    setBitcoinWallets(
      walletData.filter((wallet) => wallet.currency === "Bitcoin")
    );
  };

  const getExchangeRates = async () => {
    setBitcoinExchangeRate(await getExchangeRate("BTC"));
    setEthereumExchangeRate(await getExchangeRate("ETH"));
  };

  const getWalletSummary = async () => {
    let data, summary;
    try {
      data = await fetch("/rest/admin/wallets/summary");
      summary = await data.json();
    } catch (e) {
      console.log(e);
    }

    console.log("summary");
    console.log(summary);
  };

  useEffect(() => {
    /* 
      State will passed through props here
      Maths will take place in the parent class
    */
    getWalletSummary();
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

    getExchangeRates();
    getWallets();
  }, []);

  const classes = mainStyles();
  return (
    <div className={classes.root}>
      <AddWallet
        open={showAddWalletModal}
        setShowAddWalletModal={setShowAddWalletModal}
        getWallets={getWallets}
      />
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
          <h1 className={classes.title}>UNICEF HQ wallet overview</h1>
        </Grid>
        {balances &&
          balances.map((balance) => {
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
            onClick={() => {
              setShowAddWalletModal(true);
            }}
          >
            Add New Wallet
          </Button>
        </Grid>

        <Grid item xs={12} style={{ marginTop: "4em" }}>
          <h3 className={classes.walletSubheading}>
            {ethereumWallets.length} Ethereum Wallets
          </h3>
        </Grid>
        <Grid container spacing={2} style={{ position: "relative" }}>
          {ethereumWalletIndex > 0 && (
            <Fab className={classes.fabLeft} onClick={decrementEthWalletIndex}>
              <ChevronLeftIcon fontSize="large" />
            </Fab>
          )}

          {ethereumWalletIndex + 2 < ethereumWallets.length && (
            <Fab className={classes.fabRight} onClick={incrementEthWalletIndex}>
              <ChevronRightIcon fontSize="large" />
            </Fab>
          )}

          {ethereumWallets &&
            ethereumWallets
              .slice(ethereumWalletIndex, ethereumWalletIndex + 2)
              .map((wallet, index) => {
                return (
                  <Grid item xs={6} key={index}>
                    <WalletCard
                      name={wallet.name}
                      currency={wallet.currency}
                      tags={wallet.tags}
                      symbol={wallet.symbol}
                      balance={wallet.balance}
                      address={wallet.address}
                      viewTransactionOnClick={viewWalletDetails}
                      exchangeRate={ethereumExchangeRate}
                    />
                  </Grid>
                );
              })}
        </Grid>

        <Grid item xs={12} style={{ marginTop: "4em" }}>
          <h3 className={classes.walletSubheading}>
            {bitcoinWallets.length} Bitcoin Wallets
          </h3>
        </Grid>

        <Grid container spacing={2} style={{ position: "relative" }}>
          {bitcoinWalletIndex > 0 && (
            <Fab className={classes.fabLeft} onClick={decrementBtcWalletIndex}>
              <ChevronLeftIcon fontSize="large" />
            </Fab>
          )}

          {bitcoinWalletIndex + 2 < bitcoinWallets.length && (
            <Fab className={classes.fabRight} onClick={incrementBtcWalletIndex}>
              <ChevronRightIcon fontSize="large" />
            </Fab>
          )}

          {bitcoinWallets &&
            bitcoinWallets
              .slice(bitcoinWalletIndex, bitcoinWalletIndex + 2)
              .map((wallet, index) => {
                return (
                  <Grid item xs={6} key={index}>
                    <WalletCard
                      name={wallet.name}
                      currency={wallet.currency}
                      tags={wallet.tags}
                      symbol={wallet.symbol}
                      balance={wallet.balance}
                      address={wallet.address}
                      viewTransactionOnClick={viewWalletDetails}
                      exchangeRate={bitcoinExchangeRate}
                    />
                  </Grid>
                );
              })}
        </Grid>
      </Grid>
    </div>
  );
}
