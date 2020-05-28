import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";

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

export { BalanceCard, TxFeeCard, TotalCard };
