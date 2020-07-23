import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import PriceInfoBanner from "../PriceInfoBanner";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import AccountBalanceCard from "../Cards/AccountBalanceCard";
import AccountCard from "../Cards/AccountCard";
import Divider from "@material-ui/core/Divider";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

const transactionDetailsStyles = makeStyles((theme) => ({
  root: {
    marginTop: "5em",
  },
  bannerBox: {
    marginTop: "2em",
    minHeight: 330,
  },
  title: {
    fontFamily: '"Roboto",  sans-serif',
    fontSize: 28,
    fontWeight: 700,
    lineHeight: 1,
    color: "000000",
    marginTop: 50,
  },
  messageBox: {
    minHeight: 160,
  },
  message: {
    fontFamily: '"Roboto",  sans-serif',
    fontSize: 19,
    lineHeight: 1.42,
    marginTop: 0,
    minHeight: 110,
  },
  messageButton: {
    fontSize: 12,
    fontWeight: 700,
    fontFamily: '"Cabin", sans-serif',
    color: "#00aeef",
    "&:hover": {
      backgroundColor: "#ecfaff",
    },
    "& .MuiButton-endIcon": { marginLeft: 0 },
  },
  walletSubheading: {
    fontSize: 14,
    fontWeight: 700,
    letterSpacing: 0.78,
    color: "#898989",
    textTransform: "uppercase",
    marginBottom: "2em",
  },
  addButton: {
    height: 35,
    fontFamily: '"Cabin", sans-serif',
    fontSize: 12,
    fontWeight: 700,
    textAlign: "center",
    color: "#ffffff",
    boxShadow: "none",
  },
}));

export default function AccountLayout({
  title,
  type,
  message,
  totalEther,
  totalETHUSD,
  totalBitcoin,
  totalBTCUSD,
  accounts,
  addButtonText,
}) {
  const classes = transactionDetailsStyles();

  return (
    <Fragment>
      <Grid container className={classes.bannerBox}>
        <Grid item xs={12}>
          <PriceInfoBanner />
        </Grid>
        <Grid item xs={12}>
          <h1 className={classes.title}>{title}</h1>
        </Grid>
        <Grid item xs={3}>
          <AccountBalanceCard
            amountInvested={totalEther}
            amountInvestedUSD={totalETHUSD}
            currency={"Ethereum"}
            symbol={"ETH"}
          />
        </Grid>
        <Grid item xs={3}>
          <AccountBalanceCard
            amountInvested={totalBitcoin}
            amountInvestedUSD={totalBTCUSD}
            currency={"Bitcoin"}
            symbol={"BTC"}
          />
        </Grid>
        <Grid item xs={6} className={classes.messageBox}>
          <p className={classes.message}>{message}</p>
          <Button
            className={classes.messageButton}
            endIcon={<ChevronRightIcon />}
            onClick={() => {}}
          >
            Learn more about Cryptofund
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            className={classes.addButton}
            onClick={() => {}}
          >
            {addButtonText}
          </Button>
        </Grid>
      </Grid>

      <Grid item xs={12} style={{ marginTop: "4em" }}>
        <h3 className={classes.walletSubheading}>
          {accounts.length} {type} account{accounts.length === 1 ? "" : "s"}
        </h3>
      </Grid>
      <Grid container spacing={2} style={{ position: "relative" }}>
        {accounts &&
          accounts.map((account, index) => {
            return (
              <Grid item xs={6} key={`${index}-${account.name}`}>
                <AccountCard
                  name={account.name}
                  image={account.image}
                  location={account.location}
                  totalETHInvested={account.totalETHInvested}
                  totalETHUSD={account.totalETHUSD}
                  totalBTCInvested={account.totalBTCInvested}
                  totalBTCUSD={account.totalBTCUSD}
                />
              </Grid>
            );
          })}
      </Grid>
    </Fragment>
  );
}
