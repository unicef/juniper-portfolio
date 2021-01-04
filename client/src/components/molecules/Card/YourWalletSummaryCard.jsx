import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import { usdFormatter, cryptoFormatter } from "../../../util";
import QuestionMarkIcon from "../../atoms/Icons/QuestionMarkIcon";

const useStyles = makeStyles((theme) => ({
  title: {
    color: "#000000",
    fontSize: 24,
    fontWeight: 700,
    margin: 0,
  },
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
    position: "relative",
  },
  divider: {
    color: "#000000",
    marginRight: "3em",

    marginBottom: "1em",
    height: 2,
  },
  balanceTotals: {},
  help: {
    position: "absolute",
    top: -2,
    marginLeft: 4,
    cursor: "pointer",
  },
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
  faded: {
    opacity: 0.5,
  },
  inOut: {
    fontSize: 18,
    textTransform: "uppercase",
    marginTop: 0,
    marginBottom: 0,
    fontWeight: 400,
  },
  inOutBold: {
    fontSize: 18,
    textTransform: "uppercase",
    marginBottom: 0,
    fontWeight: 700,
  },
}));

export default function YourWalletSummaryCard({ summary, onHelpClick }) {
  const classes = useStyles();

  if (!summary) return null;

  return (
    <Grid container className={classes.balances}>
      <Grid item xs={12} className={classes.title}>
        {summary.count} {summary.currency} wallets
      </Grid>
      <Grid item xs={12}>
        <Divider className={classes.divider} />
      </Grid>
      <Grid item xs={6} className={classes.balanceSummary}>
        <h2 className={classes.balance}>
          {cryptoFormatter(summary.balance)} {summary.symbol}
        </h2>
        <h2 className={classes.balanceUSD}>
          {usdFormatter(summary.balanceUSD)} USD
        </h2>
        <p className={classes.currency}>Current {summary.currency} balance</p>
      </Grid>
      <Grid item xs={6}>
        <h2 className={classes.balance}>
          {cryptoFormatter(summary.fees)} {summary.symbol}
        </h2>
        <h2 className={classes.balanceUSD}>
          {usdFormatter(summary.feesUSD)} USD
        </h2>
        <p className={classes.currency}>
          {summary.currency} transaction fee{" "}
          <QuestionMarkIcon className={classes.help} onClick={onHelpClick} />
        </p>
      </Grid>
      <Grid item xs={12}>
        <Divider className={classes.divider} />
      </Grid>

      <Grid item xs={6} className={classes.faded}>
        <h2 className={classes.inOutBold}>
          {cryptoFormatter(summary.received)} {summary.symbol}
        </h2>
        <h2 className={classes.inOut}>
          {usdFormatter(summary.receivedUSD)} USD
        </h2>
        <p className={classes.currency}>Total {summary.name} received</p>
      </Grid>
      <Grid item xs={6} className={classes.faded}>
        <h2 className={classes.inOutBold}>
          {cryptoFormatter(summary.sent)} {summary.symbol}
        </h2>
        <h2 className={classes.inOut}>{usdFormatter(summary.sentUSD)} USD</h2>
        <p className={classes.currency}>Total {summary.name} sent</p>
      </Grid>
    </Grid>
  );
}
