import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { usdFormatter, cryptoFormatter } from "../../util";

const useStyles = makeStyles((theme) => ({
  walletBalance: {
    fontFamily: '"Roboto", sans-serif',
    fontSize: 18,
    marginTop: 18,
    lineHeight: 1.33,
  },
  currencyBalance: {
    fontWeight: 700,
  },
  walletSubtitle: {
    fontFamily: '"Cabin", sans-serif',
    color: "#000000",
    marginTop: 6,
    letterSpacing: 0.83,
    fontSize: 10,
    fontWeight: 500,
    textTransform: "uppercase",
  },
  authorization: {
    height: 370,
    backgroundColor: theme.palette.primary.light,
    padding: "20px 40px 40px 40px",
  },
  authorizationTitle: {
    fontFamily: '"Roboto", sans-serif',
    fontSize: 24,
    fontWeight: 400,
    lineHeight: 1.17,
    color: "#000000",
  },
  authorizationInfo: {
    marginTop: "1em",
  },
  subText: {
    marginTop: 0,
    marginBottom: 0,
    fontSize: 14,
    lineHeight: 1.57,
    color: "#898989",
    fontFamily: '"Roboto", sans-serif',
    letterSpacing: "normal",
  },
  authorizationAddress: {
    fontFamily: '"Roboto", sans-serif',
    fontSize: 18,
    lineHeight: 1.33,
    color: "#000000",
  },
}));

export default function AuthorizationCard({
  txid,
  address,
  amount,
  symbol,
  currency,
  valueSent,
  currentValue,
}) {
  const classes = useStyles();

  return (
    <Grid container className={classes.authorization}>
      <Grid item xs={12}>
        <h1 className={classes.authorizationTitle}>Authorization record</h1>
      </Grid>
      <Grid item xs={12}>
        <div className={classes.authorizationAddress}>{address}</div>
        <div className={classes.walletSubtitle}>Destination Wallet</div>
      </Grid>

      <Grid item xs={3}>
        <div className={classes.walletBalance}>
          <span className={classes.currencyBalance}>
            {cryptoFormatter(amount)} {symbol}
          </span>
        </div>
        <div className={classes.walletSubtitle}>{currency} Sent</div>
      </Grid>
      <Grid item xs={3}>
        <div className={classes.walletBalance}>
          {usdFormatter(valueSent)} USD
        </div>
        <div className={classes.walletSubtitle}>Value at Disbursal</div>
      </Grid>
      <Grid item xs={3}>
        <div className={classes.walletBalance}>
          {usdFormatter(currentValue)} USD
        </div>
        <div className={classes.walletSubtitle}>Current Value</div>
      </Grid>
      <Grid item xs={12} className={classes.authorizationInfo}>
        <p className={classes.subText}>
          <b>Current value</b> = The average price of crypto in USD. Price is calculated 12:01 pm (UTC),
              prices are read from three diffferent cryptoexchanges.
        </p>
        <p className={classes.subText}>
          <b>Value at disbursal</b> = The average price of crypto in USD on the day of disbursal. Price
              is calculated at 12:01 pm (UTC) on the day of disbursal and prices are read from three 
              different cryptoexchanges.
        </p>
      </Grid>
    </Grid>
  );
}
