import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import { usdFormatter, cryptoFormatter } from "../../util";

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
    fontFamily: '"Cabin", sans-serif',
    color: "#000000",
    marginTop: 6,
    letterSpacing: 0.83,
    fontSize: 10,
    fontWeight: 500,
    textTransform: "uppercase",
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
    color: theme.palette.primary.main,
    textTransform: "uppercase",
    marginBottom: 0,
  },
  received: {
    fontFamily: '"Cabin", sans-serif',
    color: "#000000",
    marginTop: 6,
    letterSpacing: 0.83,
    fontSize: 10,
    fontWeight: 500,
    textTransform: "uppercase",
  },
  totalInvested: {
    fontSize: 18,
    color: theme.palette.primary.dark,
    textTransform: "uppercase",
    marginBottom: 0,
  },
  invested: {
    fontFamily: '"Cabin", sans-serif',
    color: "#000000",
    marginTop: 6,
    letterSpacing: 0.83,
    fontSize: 10,
    fontWeight: 500,
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
          {cryptoFormatter(balance)} {symbol}
        </h2>
        <h2 className={classes.balanceUSD}>{usdFormatter(balanceUSD)} USD</h2>
        <p className={classes.currency}>Current {currency} balance</p>
      </div>
      <Divider className={classes.divider} />
      <div className={classes.balanceTotals}>
        <p className={classes.totalReceived}>
          {cryptoFormatter(received)} {symbol}
        </p>
        <p className={classes.received}>Received</p>
        <p className={classes.totalInvested}>
          {cryptoFormatter(invested)} {symbol}
        </p>
        <p className={classes.invested}>Invested</p>
      </div>
    </div>
  );
}
