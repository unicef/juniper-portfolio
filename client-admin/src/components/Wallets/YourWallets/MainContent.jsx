import React from "react";
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

        <Grid item xs={12} sm={3}>
          <BalanceCard
            symbol={"ETH"}
            balanceUSD={"10,000"}
            currency={"Ether"}
            received={100}
            invested={50}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <BalanceCard
            symbol={"BTC"}
            balanceUSD={"0"}
            currency={"Bitcoin"}
            received={1}
            invested={1}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TxFeeCard
            amountUSD={"3.23"}
            amountBTC={"0.012"}
            amountETH={"0.0000321"}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TotalCard received={"28,531.96"} invested={"19,287.46"} />
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
          <h3 className={classes.walletSubtitle}>3 Ethereum Wallets</h3>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={6} style={{ position: "relative" }}>
            <Fab className={classes.fabLeft}>
              <ChevronLeftIcon fontSize="large" />
            </Fab>
            <WalletCard
              name={"Ethereum wallet test"}
              currency={"Ethereum"}
              tags={["Unicef HQ"]}
              symbol={"ETH"}
              amount={25}
              amountUSD={"4692.75"}
              address={"0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7"}
            />
          </Grid>
          <Grid item xs={6} style={{ position: "relative" }}>
            <Fab className={classes.fabRight}>
              <ChevronRightIcon fontSize="large" />
            </Fab>
            <WalletCard
              name={"Ethereum wallet test"}
              currency={"Ethereum"}
              tags={["Unicef HQ", "Multisig"]}
              symbol={"ETH"}
              amount={25}
              amountUSD={"4692.75"}
              address={"0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7"}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} style={{ marginTop: "4em" }}>
          <h3 className={classes.walletSubtitle}>2 Bitcoin Wallets</h3>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={6} style={{ position: "relative" }}>
            <Fab className={classes.fabLeft}>
              <ChevronLeftIcon fontSize="large" />
            </Fab>
            <WalletCard
              name={"Blockchain wallet test"}
              currency={"Bitcoin"}
              tags={["Unicef HQ"]}
              symbol={"BTC"}
              amount={1}
              amountUSD={"9692.75"}
              address={"Dbf7f01ED1389205A3A3b2A69De6B2c43e7"}
            />
          </Grid>
          <Grid item xs={6} style={{ position: "relative" }}>
            <Fab className={classes.fabRight}>
              <ChevronRightIcon fontSize="large" />
            </Fab>
            <WalletCard
              name={"Bitcoin wallet test"}
              currency={"Ethereum"}
              tags={["Unicef HQ"]}
              symbol={"BTC"}
              amount={0}
              amountUSD={"0"}
              address={"Dbf7f01ED1389205A3A3b2A69De6B2c43e7"}
            />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
