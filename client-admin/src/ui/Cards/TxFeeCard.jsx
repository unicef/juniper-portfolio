import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import { usdFormatter } from "../../util";

const useStyles = makeStyles((theme) => ({
  fees: {
    fontFamily: '"Roboto", sans-serif',
  },
  feeSummary: {
    opacity: 0.5,
    minHeight: 110,
  },
  balance: {
    color: "#000000",
    fontSize: 24,
    fontWeight: 700,
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
  feeTotals: {
    opacity: 0.5,
  },
  totalFees: {
    fontSize: 18,
    textTransform: "uppercase",
    marginBottom: 0,
  },
  received: {
    fontSize: 10,
    fontWeight: 500,
    marginTop: 0,
    textTransform: "uppercase",
  },
  invested: {
    fontSize: 10,
    fontWeight: 500,
    marginTop: 0,
    textTransform: "uppercase",
  },
}));

export default function TxFeeCard({ amountUSD, amountETH, amountBTC }) {
  const classes = useStyles();
  return (
    <div className={classes.fees}>
      <div className={classes.feeSummary}>
        <h2 className={classes.balance}>
          {usdFormatter.format(amountUSD)} USD
        </h2>
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
