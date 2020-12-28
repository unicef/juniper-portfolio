import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { shortMonths } from "../../util";
const WalletDetailsCardStyles = makeStyles((theme) => ({
  walletSubtitle: {
    fontFamily: '"Cabin", sans-serif',
    color: "#000000",
    marginTop: 6,
    letterSpacing: 0.83,
    fontSize: 10,
    fontWeight: 500,
    textTransform: "uppercase",
  },
  authorizationInfo: {
    marginTop: "1em",
  },
  signerText: {
    fontFamily: '"Roboto", sans-serif',
    fontSize: 18,
    lineHeight: 1.33,
    marginTop: ".5em",
    color: "#000000",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  authorizationSigner: {
    height: 283,
    padding: "20px 40px 40px 40px",
    borderBottom: "solid 1px #e0e0e0",
  },
  authorizationSubheading: {
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: 0.78,
    color: "#898989",
    textTransform: "uppercase",
  },
}));

export default function AuthorizationSignerCard({
  address,
  owner,
  timestamp,
  index,
}) {
  const classes = WalletDetailsCardStyles();
  const date = new Date(timestamp);
  const month = shortMonths[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();

  return (
    <Grid container className={classes.authorizationSigner}>
      <Grid item xs={12} className={classes.authorizationInfo}>
        <h3 className={classes.authorizationSubheading}>
          Signer {index} details
        </h3>
      </Grid>
      <Grid item xs={12}>
        <div className={classes.signerText}>{owner}</div>
        <div className={classes.walletSubtitle}>Wallet Owner</div>
      </Grid>
      <Grid item xs={12}>
        <div className={classes.signerText}>{address}</div>
        <div className={classes.walletSubtitle}>Wallet Address</div>
      </Grid>
      <Grid item xs={12}>
        <div className={classes.signerText}>
          {month} {day} {year} at {hours}:{minutes} UTC
        </div>
        <div className={classes.walletSubtitle}>Date and Time</div>
      </Grid>
    </Grid>
  );
}
