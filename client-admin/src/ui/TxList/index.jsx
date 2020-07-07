import React, { Fragment, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import PriceInfoBanner from "../PriceInfoBanner";
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

export default function TxList({
  title,
  txs,
  TxCard,
  afterArchiveTransaction,
}) {
  const classes = transactionDetailsStyles();

  return (
    <Fragment>
      <Grid container className={classes.root}>
        <Grid item xs={6}>
          <h3 className={classes.subtitle}> {title}</h3>
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
          <PriceInfoBanner />
        </Grid>
        <Grid item xs={12}>
          {txs &&
            txs.map((tx, index) => {
              return (
                <TxCard
                  key={tx.txid}
                  txid={tx.txid}
                  timestamp={tx.timestamp}
                  address={null}
                  currency={tx.currency}
                  amount={tx.amount}
                  symbol={tx.symbol}
                  amountUSD={tx.amountUSD}
                  sent={tx.sent}
                  received={tx.received}
                  to={tx.to}
                  from={tx.from}
                  afterArchiveTransaction={afterArchiveTransaction}
                />
              );
            })}
        </Grid>
      </Grid>
    </Fragment>
  );
}
