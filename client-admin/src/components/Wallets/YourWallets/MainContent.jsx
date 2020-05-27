import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import iconPrice from "./iconPrice.svg";

const overviewCardStyles = makeStyles((theme) => ({
  balances: {
    fontFamily: "Roboto",
  },
  fees: {
    fontFamily: "Roboto",
  },
  totals: {
    fontFamily: "Roboto",
  },
  feeSummary: {
    opacity: 0.5,
    minHeight: 110,
  },
  balanceSummary: {
    minHeight: 110,
  },
  totalsSummary: {
    display: "flex",
    direction: "columns",
  },
  balance: {
    color: "#000000",
    fontSize: 24,
    fontWeight: 700,
    margin: 0,
  },
  balanceUSD: {
    color: "#000000",
    fontSize: 24,
    fontWeight: 400,
    margin: 0,
  },
  currency: {
    fontSize: 10,
    fontWeight: 500,
    textTransform: "uppercase",
    color: "#000000",
  },
  divider: {
    color: "#000000",
    marginRight: "3em",

    marginBottom: "1em",
    height: 2,
  },
  balanceTotals: {},
  feeTotals: {
    opacity: 0.5,
  },
  totalReceived: {
    fontSize: 18,
    color: "#00aaef",
    textTransform: "uppercase",
    marginBottom: 0,
  },
  received: {
    fontSize: 10,
    fontWeight: 500,
    marginTop: 0,
    textTransform: "uppercase",
  },
  totalInvested: {
    fontSize: 18,
    color: "#374ea2",
    textTransform: "uppercase",
    marginBottom: 0,
  },
  totalFees: {
    fontSize: 18,
    textTransform: "uppercase",
    marginBottom: 0,
  },
  invested: {
    fontSize: 10,
    fontWeight: 500,
    marginTop: 0,
    textTransform: "uppercase",
  },
  bigDot: {
    borderRadius: "50%",
    width: 108,
    height: 108,
    backgroundColor: "#00aeef",
  },
  littleDot: {
    borderRadius: "50%",
    width: 74,
    height: 74,
    backgroundColor: "#374ea2",
    marginLeft: 15,
  },
}));

function BalanceCard({ received, invested, balanceUSD, currency, symbol }) {
  const classes = overviewCardStyles();
  return (
    <div className={classes.balances}>
      <div className={classes.balanceSummary}>
        <h2 className={classes.balance}>
          {received - invested} {symbol}
        </h2>
        <h2 className={classes.balanceUSD}>{balanceUSD} USD</h2>
        <p className={classes.currency}>Current {currency} balance</p>
      </div>
      <Divider className={classes.divider} />
      <div className={classes.balanceTotals}>
        <p className={classes.totalReceived}>
          {received} {symbol}
        </p>
        <p className={classes.received}>Received</p>
        <p className={classes.totalInvested}>
          {invested} {symbol}
        </p>
        <p className={classes.invested}>Invested</p>
      </div>
    </div>
  );
}

function TxFeeCard({ amountUSD, amountETH, amountBTC }) {
  const classes = overviewCardStyles();
  return (
    <div className={classes.fees}>
      <div className={classes.feeSummary}>
        <h2 className={classes.balance}>{amountUSD} USD</h2>
        <p className={classes.currency}>Total transaction fee</p>
      </div>
      <Divider className={classes.divider} />
      <div className={classes.feeTotals}>
        <p className={classes.totalFees}>{amountBTC} BTC</p>
        <p className={classes.received}>Total BTC Transaction Fee</p>
        <p className={classes.totalFees}>{amountETH} ETH</p>
        <p className={classes.invested}>Total ETH Transaction Fee</p>
      </div>
    </div>
  );
}

function TotalCard({ received, invested }) {
  const classes = overviewCardStyles();
  return (
    <div className={classes.totals}>
      <div className={classes.totalsSummary}>
        <div className={classes.bigDot}></div>
        <div className={classes.littleDot}></div>
      </div>
      <div className={classes.balanceTotals}>
        <p className={classes.totalReceived}>{received} USD</p>
        <p className={classes.received}>Total Crypto Received</p>
        <p className={classes.totalInvested}>{invested} USD</p>
        <p className={classes.invested}>Total Crypto Invested</p>
      </div>
    </div>
  );
}

const mainStyles = makeStyles((theme) => ({
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
}));

export default function () {
  const classes = mainStyles();
  return (
    <Fragment>
      <Grid container>
        <Grid item xs={12} className={classes.priceRectangle}>
          <img src={iconPrice} />
          <b>USD Price</b> = Average across three cryptocurrency exchanges,
          calculated at 12:01 pm (EST)
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
      </Grid>
    </Fragment>
  );
}
