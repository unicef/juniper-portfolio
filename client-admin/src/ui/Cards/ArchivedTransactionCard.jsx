import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TxSentIcon from "../Icons/TxReceivedIcon";
import TxReceivedIcon from "../Icons/TxReceivedIcon";
import EditIcon from "../Icons/ArchiveTxIcon";
import TxStepper from "../TxStepper";
import { usdFormatter, cryptoFormatter } from "../../util";

const useStyles = makeStyles((theme) => ({
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
  unpublishedTxDetailsButton: {
    marginTop: "1em",
    float: "left",
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
    paddingLeft: 0,
  },
  unpublishedTxBalance: {
    fontFamily: '"Roboto", sans-serif',
    color: "#000000",
    fontSize: 24,
    fontWeight: 400,
    margin: 0,
  },
  archiveTransactionButton: {
    marginTop: "1em",
    float: "left",
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
    paddingLeft: 0,
    "& .MuiButton-startIcon": {
      margin: 0,
      marginTop: 8,
    },
  },
  tagTransactionButton: {
    width: 176,
    height: 35,
    fontFamily: '"Cabin", sans-serif',
    fontSize: 12,
    fontWeight: 700,
    textAlign: "center",
    color: "#ffffff",
    boxShadow: "none",
    marginTop: 13,
  },
}));

export default function ArchivedTransactionCard({
  txid,
  timestamp,
  amount,
  symbol,
  amountUSD,
  sent,
  received,
  isAdmin,
}) {
  const classes = useStyles();
  const txSent = new Date(timestamp);
  return (
    <Fragment>
      <Grid container className={classes.transaction}>
        <Grid item xs={12} className={classes.txHeader}>
          {sent ? (
            <TxSentIcon className={classes.arrowIcon} />
          ) : (
            <TxReceivedIcon className={classes.arrowIcon} />
          )}
          <span className={classes.headerText}>
            Crypto {sent ? "sent" : null} {received ? "received" : null} at{" "}
            <b>
              {txSent.toLocaleTimeString()}, {txSent.toDateString()}
            </b>
          </span>
        </Grid>
        <Grid item xs={8}>
          <TxStepper />
          <Button
            className={classes.unpublishedTxDetailsButton}
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
            Show Transaction Details
          </Button>
        </Grid>
        <Grid item xs={4}>
          <div className={classes.unpublishedTxBalance}>
            <b>{cryptoFormatter(amount)}</b> {symbol} /{" "}
            {usdFormatter.format(amountUSD)}
          </div>
          <div className={classes.walletSubtitle}>Donated Amount</div>
          {isAdmin && (
            <Button
              variant="contained"
              color="primary"
              className={classes.tagTransactionButton}
              onClick={() => {
                console.log("tag tx btn clicked");
              }}
            >
              Tag Transaction
            </Button>
          )}
          {isAdmin && (
            <Button
              className={classes.archiveTransactionButton}
              startIcon={<EditIcon />}
              onClick={() => {
                console.log("archive tx clicks");
              }}
            >
              Edit Transaction
            </Button>
          )}
        </Grid>
      </Grid>
      <Divider />
    </Fragment>
  );
}
