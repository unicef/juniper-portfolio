import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { usdFormatter, cryptoFormatter } from "../../util";

const useStyles = makeStyles((theme) => ({
  balances: {
    fontFamily: '"Roboto", sans-serif',
  },
  balanceSummary: {
    minHeight: 110,
  },
  amountInvested: {
    color: "#000000",
    fontSize: 24,
    fontWeight: 700,
    margin: 0,
  },
  amountInvestedUSD: {
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
}));

export default function AccountBalanceCard({
  amountInvested,
  amountInvestedUSD,
  currency,
  symbol,
  investedVerb,
}) {
  const classes = useStyles();

  return (
    <div className={classes.balances}>
      <div className={classes.balanceSummary}>
        <h2 className={classes.amountInvested}>
          {cryptoFormatter(amountInvested)} {symbol}
        </h2>
        <h2 className={classes.amountInvestedUSD}>
          {usdFormatter.format(amountInvestedUSD)} USD
        </h2>
        <p className={classes.currency}>
          Total {currency} {investedVerb || "invested"}
        </p>
      </div>
    </div>
  );
}
