import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import TxArrowIcon from "../icons/TxArrowIcon";
import { usdFormatter } from "../../util";

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

  transaction: {
    marginTop: "2em",
    marginBottom: "3em",
  },
  arrowIcon: {
    width: "1.25em",
    marginRight: ".5em",
  },
  txHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "left",
  },
  headerText: {
    fontFamily: '"Roboto", sans-serif',
    fontSize: 14,
    lineHeight: 1.57,
    color: "#000000",
  },
  txDetailsAddress: {
    marginTop: 20,
    fontFamily: '"Roboto", sans-serif',
    fontSize: 18,
    fontWeight: 700,
    lineHeight: 1.33,
    color: "#000000",
    overflowX: "hidden",
    textOverflow: "ellipsis",
    maxWidth: 162,
  },
  tagDestinationButton: {
    fontFamily: '"Cabin", sans-serif',
    fontSize: 12,
    fontWeight: 700,
    textAlign: "center",
    color: "#ffffff",
    boxShadow: "none",
    marginTop: "2em",
  },
  txDetailsButton: {
    marginTop: "1em",
    float: "right",
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: 1,
    fontFamily: '"Cabin", sans-serif',
    color: "#00aeef",
    "&:hover": {
      backgroundColor: "#ecfaff",
    },
    "& .MuiButton-endIcon": {
      margin: 0,
    },
  },
}));

export default function TransactionDetailsCard({
  txid,
  timestamp,
  address,
  currency,
  amount,
  symbol,
  to,
  from,
  amountUSD,
  currentValue,
  sent,
  received,
  setAuthorizationRecord,
}) {
  const classes = useStyles();
  const txSent = new Date(timestamp);
  return (
    <Fragment>
      <Grid container className={classes.transaction}>
        <Grid item xs={12} className={classes.txHeader}>
          <TxArrowIcon className={classes.arrowIcon} />{" "}
          <span className={classes.headerText}>
            Crypto {sent ? "sent" : null} {received ? "received" : null} at{" "}
            <b>
              {txSent.toLocaleTimeString()}, {txSent.toDateString()}
            </b>
          </span>
        </Grid>
        <Grid item xs={3}>
          {received && (
            <Fragment>
              <div className={classes.txDetailsAddress}>{from}</div>
              <div className={classes.walletSubtitle}>Source Wallet</div>
            </Fragment>
          )}

          {sent && (
            <Fragment>
              <div className={classes.txDetailsAddress}>{to}</div>
              <div className={classes.walletSubtitle}>Destination Wallet</div>
              <Button
                color="primary"
                variant="contained"
                className={classes.tagDestinationButton}
              >
                Tag Destination Wallet
              </Button>
            </Fragment>
          )}
        </Grid>
        <Grid item xs={2}>
          <div className={classes.walletBalance}>
            <span className={classes.currencyBalance}>
              {amount} {symbol}
            </span>
          </div>
          <div className={classes.walletSubtitle}>{currency} Sent</div>
        </Grid>
        <Grid item xs={2}>
          <div className={classes.walletBalance}>
            {usdFormatter.format(amountUSD)} USD
          </div>
          <div className={classes.walletSubtitle}>Value at Disbursal</div>
        </Grid>
        <Grid item xs={2}>
          <div className={classes.walletBalance}>
            {usdFormatter.format(currentValue)} USD
          </div>
          <div className={classes.walletSubtitle}>Current Value</div>
        </Grid>
        <Grid item xs={3}>
          <Button
            className={classes.txDetailsButton}
            endIcon={<ChevronRightIcon />}
            onClick={() => {
              switch (symbol) {
                case "BTC":
                  window.open(
                    `https://www.blockchain.com/btc/tx/${txid}`,
                    "_blank"
                  );
                  break;
                case "ETH":
                  window.open(`https://etherscan.io/tx/${txid}`);
                  break;
                default:
                  break;
              }
            }}
          >
            Transaction Details
          </Button>
          <Button
            className={classes.txDetailsButton}
            startIcon={<FormatListBulletedIcon />}
            onClick={() => {
              setAuthorizationRecord(txid);
            }}
          >
            Authorization Record
          </Button>
        </Grid>
      </Grid>
      <Divider />
    </Fragment>
  );
}
