import React, { Fragment, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TransactionDetailsCard } from "../../../../ui/Cards";
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
  transactionDetails: {
    marginTop: "2em",
  },
}));

export default function TransactionDetails({
  address,
  setAuthorizationRecord,
  transactionDetailsData,
  exchangeRate,
}) {
  const classes = transactionDetailsStyles();
  const [txDetails, setTxDetails] = useState([]);
  useEffect(() => {
    setTxDetails(transactionDetailsData);
  }, [transactionDetailsData]);

  return (
    <Fragment>
      <Grid container className={classes.root}>
        <Grid item xs={6}>
          <h3 className={classes.subtitle}> Wallet Transactions</h3>
        </Grid>
        <Grid item xs={6}>
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
      <Grid container className={classes.transactionDetails}>
        <Grid item xs={12}>
          {txDetails &&
            txDetails.map((txDetails, index) => {
              return (
                <TransactionDetailsCard
                  key={`txDetails.txid-${index}`}
                  txid={txDetails.txid}
                  timestamp={txDetails.timestamp}
                  address={address}
                  currency={txDetails.currency}
                  amount={txDetails.amount}
                  symbol={txDetails.symbol}
                  amountUSD={txDetails.amountUSD}
                  sent={txDetails.sent}
                  received={txDetails.received}
                  to={txDetails.to || address}
                  from={txDetails.from || address}
                  setAuthorizationRecord={setAuthorizationRecord}
                  currentValue={
                    Math.round(txDetails.amount * exchangeRate * 100) / 100
                  }
                />
              );
            })}
        </Grid>
      </Grid>
    </Fragment>
  );
}
