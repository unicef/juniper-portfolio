import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import CopyIcon from "../icons/CopyIcon";

import { usdFormatter, cryptoFormatter } from "../../util";

const walletStyles = makeStyles((theme) => ({
  wallet: {
    minHeight: 301,
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
  unfollowWalletButton: {
    float: "right",
    height: 35,
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: 1,
    fontFamily: '"Cabin", sans-serif',
    color: "#00aeef",
    borderColor: "#00aeef",
    borderRadius: 5,
    "&:hover": {
      backgroundColor: "#ecfaff",
    },
  },
}));

export default function TrackWalletCard({
  name,
  tags,
  symbol,
  balance,
  address,
  exchangeRate,
  afterUnfollowWallet,
}) {
  const classes = walletStyles();

  const unfollowWallet = async (address) => {
    try {
      await fetch(`/rest/admin/wallet/untrack/${address}`);
    } catch (e) {
      console.log(e);
    }
  };

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
      <div className={classes.walletBalance}>
        <span className={classes.currencyBalance}>
          {cryptoFormatter(balance)} {symbol}
        </span>{" "}
        / {usdFormatter.format(balance * exchangeRate)} USD
      </div>
      <div className={classes.walletSubtitle}>Wallet Balance</div>
      <div className={classes.address}>{address}</div>
      <div className={classes.walletSubtitle}>Wallet Address</div>
      <div className={classes.buttons}>
        <Button
          className={classes.leftButton}
          startIcon={<CopyIcon fontSize="large" />}
          onClick={() => {
            copyToClipboard(address);
          }}
        >
          Copy Address
        </Button>
        <Button
          className={classes.unfollowWalletButton}
          variant="outlined"
          onClick={() => {
            unfollowWallet(address);
            if (afterUnfollowWallet) {
              afterUnfollowWallet();
            }
          }}
        >
          Unfollow
        </Button>
      </div>
    </div>
  );
}
