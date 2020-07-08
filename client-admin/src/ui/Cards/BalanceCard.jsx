import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  balances: {
    fontFamily: '"Roboto", sans-serif',
  },
  balanceSummary: {
    minHeight: 110,
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
  invested: {
    fontSize: 10,
    fontWeight: 500,
    marginTop: 0,
    textTransform: "uppercase",
  },
}));

export default function BalanceCard({
  received,
  invested,
  balance,
  balanceUSD,
  currency,
  symbol,
}) {
  const classes = useStyles();
  return (
    <div className={classes.balances}>
      <div className={classes.balanceSummary}>
        <h2 className={classes.balance}>
          {balance} {symbol}
        </h2>
        <h2 className={classes.balanceUSD}>{balanceUSD} USD</h2>
        <p className={classes.currency}>Current {currency} balance</p>
      </div>
      <Divider className={classes.divider} />
      <div className={classes.balanceTotals}>
        <p className={classes.totalReceived}>
          {Math.round(received * 1e8) / 1e8} {symbol}
        </p>
        <p className={classes.received}>Received</p>
        <p className={classes.totalInvested}>
          {Math.round(invested * 1e8) / 1e8} {symbol}
        </p>
        <p className={classes.invested}>Invested</p>
      </div>
    </div>
  );
}
