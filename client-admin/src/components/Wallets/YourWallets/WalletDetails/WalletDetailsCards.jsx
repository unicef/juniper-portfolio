import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import CopyIcon from "../CopyIcon";

const WalletDetailsCardStyles = makeStyles((theme) => ({
  wallet: {
    position: "relative",
    minHeight: 341,
    backgroundColor: "#ffffff",
    fontFamily: '"Roboto", sans-serif',
    paddingTop: 10,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 25,
    "& .MuiButton-endIcon": {
      margin: 0,
    },
    "& .MuiButton-startIcon": {
      margin: 0,
    },
  },
  name: {
    fontSize: 24,
    fontWeight: 700,
    lineHeight: 1.17,
    color: "#000000",
    marginBottom: 10,
  },
  chip: {
    borderRadius: 5,
    fontFamily: '"Cabin", sans-serif',
    fontSize: 10,
    fontWeight: 500,
    letterSpacing: 0.83,
    color: "#898989",
    textTransform: "uppercase",
    marginRight: "1em",
  },
  walletBalance: {
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
  address: {
    marginTop: 20,
    fontFamily: '"Roboto", sans-serif',
    fontSize: 14,
    fontWeight: 700,
    lineHeight: 1.57,
    color: "#000000",
  },
  buttons: {
    marginTop: 30,
    clear: "both",
  },
  leftButton: {
    fontSize: 12,
    fontWeight: 700,
    fontFamily: '"Cabin", sans-serif',
    color: "#00aeef",
    "&:hover": {
      backgroundColor: "#ecfaff",
    },
  },
  editWalletButton: {
    position: "absolute",
    marginTop: "1em",
    marginRight: "1em",
    right: 6,
    fontSize: 12,
    fontWeight: 700,
    fontFamily: '"Cabin", sans-serif',
    color: "#00aeef",
    "&:hover": {
      backgroundColor: "#ecfaff",
    },
  },
  owners: {
    color: "#00aaef",
    fontSize: 18,
    lineHeight: 1.33,
    marginTop: "2.5em",
  },
}));

function WalletDetailsCard({
  name,
  currency,
  tags,
  symbol,
  amount,
  amountUSD,
  feesUSD,
  address,
  viewTransactionOnClick,
}) {
  const classes = WalletDetailsCardStyles();

  const copyToClipboard = (text) => {
    const el = document.createElement("textarea");
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  };

  return (
    <div className={classes.wallet}>
      <Button
        className={classes.editWalletButton}
        startIcon={<EditIcon />}
        onClick={() => {
          console.log("edit wallet click");
        }}
      >
        Edit Wallet
      </Button>
      <h2 className={classes.name}>{name}</h2>
      {tags &&
        tags.map((tag) => {
          return (
            <Chip
              key={tag}
              variant="outlined"
              size="small"
              label={tag}
              className={classes.chip}
            />
          );
        })}
      <Grid container>
        <Grid item md={2}>
          <div className={classes.walletBalance}>
            <span className={classes.currencyBalance}>
              {amount} {symbol}
            </span>
          </div>
          <div className={classes.walletSubtitle}>Wallet Balance</div>
        </Grid>
        <Grid item md={2}>
          <div className={classes.walletBalance}>{amountUSD} USD</div>
          <div className={classes.walletSubtitle}>Current Value</div>
        </Grid>
        <Grid item md={2}>
          <div className={classes.walletBalance}>{feesUSD} USD</div>
          <div className={classes.walletSubtitle}>Transaction Fees</div>
        </Grid>
      </Grid>

      <div className={classes.address}>
        {address}{" "}
        <Button
          className={classes.leftButton}
          startIcon={<CopyIcon />}
          onClick={() => {
            copyToClipboard(address);
          }}
        >
          Copy
        </Button>
      </div>
      <div className={classes.walletSubtitle}>Wallet Address</div>
      <div className={classes.owners}>You + 2 users</div>
      <div className={classes.walletSubtitle}>Wallet Owners</div>
    </div>
  );
}

const TransactionDetailsCardStyles = makeStyles((theme) => ({
  transaction: {},
}));

function TransactionDetailsCard({}) {
  const classes = TransactionDetailsCardStyles();

  return <div className={classes.transaction}>tx details</div>;
}

export { WalletDetailsCard, TransactionDetailsCard };
