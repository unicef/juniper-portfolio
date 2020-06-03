import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TransactionDetailsCard } from "./WalletDetailsCards";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";

const transactionDetailsStyles = makeStyles((theme) => ({
  root: {
    marginTop: "5em",
  },
  subtitle: {
    fontSize: 14,
    fontWeight: 700,
    letterSpacing: 0.78,
    color: "#898989",
    textTransform: "uppercase",
    marginBottom: "1em",
  },
  allTransactionsButton: {
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

export default function TransactionDetails() {
  const classes = transactionDetailsStyles();
  return (
    <Fragment>
      <Grid container className={classes.root}>
        <Grid xs={6}>
          <h3 className={classes.subtitle}> Wallet Transactions</h3>
        </Grid>
        <Grid xs={6}>
          <Button
            className={classes.allTransactionsButton}
            endIcon={<KeyboardArrowDownIcon />}
            onClick={() => {
              console.log("all transaction clicked");
            }}
          >
            All Transactions
          </Button>
        </Grid>
      </Grid>
      <Divider />
      <Grid container>
        <Grid xs={12}>
          <TransactionDetailsCard />
        </Grid>
      </Grid>
    </Fragment>
  );
}
