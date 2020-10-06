import React, { useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { usdFormatter, cryptoFormatter } from "../../util";
import { monthNames } from "../../util";
import { CopyAddressButton } from "../Buttons";

const WalletDetailsCardStyles = makeStyles((theme) => ({
  authorizationInfo: {
    marginTop: "1em",
  },
  signerText: {
    fontFamily: '"Roboto", sans-serif',
    fontSize: 18,
    lineHeight: 1.33,
    marginTop: ".5em",
    color: "#000000",
  },
  authorizationSigner: {
    height: 283,
    padding: "20px 40px 40px 40px",
    borderTop: "solid 1px #e0e0e0",
  },
  subheading: {
    fontSize: 14,
    fontWeight: 700,
    letterSpacing: 0.78,
    color: "#898989",
    textTransform: "uppercase",
  },
  balance: {
    fontFamily: '"Roboto", sans-serif',
    fontSize: 18,
    marginTop: 18,
    lineHeight: 1.33,
  },
  currencyBalance: {
    fontWeight: 700,
  },
  subtitle: {
    fontFamily: '"Cabin", sans-serif',
    color: "#000000",
    marginTop: 6,
    letterSpacing: 0.83,
    fontSize: 10,
    fontWeight: 500,
    textTransform: "uppercase",
  },
  copyButton: {
    fontSize: 12,
    fontWeight: 700,
    fontFamily: '"Cabin", sans-serif',
    color: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: "#ecfaff",
    },
  },
  address: {
    marginTop: "1.5em",
  },
  walletAddress: {
    fontFamily: '"Roboto", sans-serif',
    fontSize: 14,
    lineHeight: 1.33,
    color: "#000000",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
}));

export default function AccountTransactionCard({
  type,
  received,
  currency,
  symbol,
  ethRate,
  btcRate,
  amountUSD,
  address,
  timestamp,

  title,
}) {
  const addressRef = useRef(null);

  const classes = WalletDetailsCardStyles();

  const txDate = new Date(timestamp);
  const month = monthNames[txDate.getMonth()];
  const day = txDate.getDay();
  const year = txDate.getFullYear();

  return (
    <Grid container className={classes.authorizationSigner}>
      <Grid item xs={12} className={classes.authorizationInfo}>
        <h3 className={classes.subheading}>{title}</h3>
      </Grid>
      <Grid item xs={12}>
        <div className={classes.signerText}>
          {month} {day}, {year}
        </div>
        <div className={classes.subtitle}>Time of Signing</div>
      </Grid>

      <Grid item xs={3}>
        <div className={classes.balance}>
          <span className={classes.currencyBalance}>
            {cryptoFormatter(received || 0)} {symbol}
          </span>
        </div>
        <div className={classes.subtitle}>{symbol} Received</div>
      </Grid>
      <Grid item xs={3}>
        <div className={classes.balance}>
          {usdFormatter.format(
            currency === "Ethereum"
              ? received * ethRate
              : received * btcRate || 0
          )}{" "}
          USD
        </div>
        <div className={classes.subtitle}>Current Value</div>
      </Grid>
      <Grid item xs={6}>
        <div className={classes.balance}>
          {usdFormatter.format(amountUSD || 0)} USD
        </div>
        <div className={classes.subtitle}>Value at Receipt</div>
      </Grid>

      <Grid container key={address}>
        <Grid item xs={8} className={classes.address}>
          <div className={classes.walletAddress} ref={addressRef}>
            {address}
          </div>
          <div className={classes.subtitle}>Wallet Address</div>
        </Grid>
        <Grid item xs={4} className={classes.address}>
          <CopyAddressButton address={address}>Copy</CopyAddressButton>
        </Grid>
      </Grid>
    </Grid>
  );
}
