import React, { useState, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import TxReceivedIcon from "../../components/atoms/Icons/TxReceivedIcon";
import TxSentIcon from "../../components/atoms/Icons/TxSentIcon";
import { usdFormatter, cryptoFormatter } from "../../util";
import { AddWallet } from "../../components/organisms/Dialog";
import TextButton from "../../components/atoms/Button/TextIcon";
import ContainedButton from "../../components/atoms/Button/Contained";

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
    marginTop: "2em",
  },
  txDetailsButton: {
    marginTop: "1em",
    float: "right",
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: 1,
    fontFamily: '"Cabin", sans-serif',
    color: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: theme.palette.primary.textButtonHover,
    },
    "& .MuiButton-endIcon": {
      margin: 0,
    },
  },
}));

export default function TransactionDetailsCard({
  tx,
  txid,
  timestamp,
  address,
  currency,
  amount,
  symbol,
  to,
  from,
  amountUSD,
  exchangeRate,
  sent,
  received,
  setAuthorizationRecord,
  fetchWallets,
}) {
  const classes = useStyles();
  const txSent = new Date(timestamp);
  const [showAddWalletModal, setShowAddWalletModal] = useState(false);

  return (
    <Fragment>
      <AddWallet
        open={showAddWalletModal}
        setShowAddWalletModal={setShowAddWalletModal}
        afterAddWallet={() => {
          fetchWallets();
        }}
        showMultisig={false}
        isUnicef={false}
        isTracked={false}
        isTrackedOther={true}
        address={to}
      />
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
              {txSent.getUTCHours()}:{txSent.getMinutes() < 10 ? "0" : ""}
              {txSent.getMinutes()} UTC, {txSent.toDateString()}
            </b>
          </span>
        </Grid>
        <Grid item xs={3}>
          {received && (
            <Fragment>
              {/* <div className={classes.txDetailsAddress}>{from}</div> */}
              {
              tx.source ? 
                <div className={classes.txDetailsAddress}>{tx.source}</div>
              :
                <div className={classes.txDetailsAddress}>{from}</div>
              }
              <div className={classes.walletSubtitle}>Source Wallet</div>
            </Fragment>
          )}

          {sent && (
            <Fragment>
              {
              tx.destination ? 
                <div className={classes.txDetailsAddress}>{tx.destination}</div>
              :
                <div className={classes.txDetailsAddress}>{to}</div>
              }
              <div className={classes.walletSubtitle}>Destination Wallet</div>
              {/* <div className={classes.tagDestinationButton}>
                <ContainedButton
                  onClick={() => {
                    setShowAddWalletModal(true);
                  }}
                >
                  Tag Destination Wallet
                </ContainedButton>
              </div> */}
            </Fragment>
          )}
        </Grid>
        <Grid item xs={2}>
          <div className={classes.walletBalance}>
            <span className={classes.currencyBalance}>
              {cryptoFormatter(amount)} {symbol}
            </span>
          </div>
          <div className={classes.walletSubtitle}>{currency} Sent</div>
        </Grid>
        <Grid item xs={2}>
          <div className={classes.walletBalance}>
            {usdFormatter(amountUSD)} USD
          </div>
          <div className={classes.walletSubtitle}>Value at Disbursal</div>
        </Grid>
        <Grid item xs={2}>
          <div className={classes.walletBalance}>
            {usdFormatter(amount * exchangeRate)} USD
          </div>
          <div className={classes.walletSubtitle}>Current Value</div>
        </Grid>
        <Grid item xs={3}>
          <div className={classes.txDetailsButton}>
            <TextButton
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
              float={"right"}
            >
              Transaction Details
            </TextButton>
          </div>
          <div className={classes.txDetailsButton}>
            <TextButton
              startIcon={<FormatListBulletedIcon />}
              onClick={() => {
                setAuthorizationRecord(tx);
              }}
              float={"right"}
            >
              Authorization Record
            </TextButton>
          </div>
        </Grid>
      </Grid>
      <Divider />
    </Fragment>
  );
}
