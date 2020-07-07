import React, { Fragment, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import PriceInfoBanner from "../../../ui/PriceInfoBanner";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import { UnpublishedTransactionCard } from "../../../ui/Cards";

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

export default function TransactionDetails() {
  const classes = transactionDetailsStyles();
  const [txs, setTxs] = useState([]);

  const getUnpublishedTransations = async () => {
    let data, txs;
    console.log("test");
    try {
      data = await fetch("/rest/admin/transactions/unpublished");

      txs = await data.json();
    } catch (e) {
      console.log(e);
    }

    setTxs(txs);
  };

  useEffect(() => {
    getUnpublishedTransations();
  }, []);

  return (
    <Fragment>
      <Grid container className={classes.root}>
        <Grid item xs={6}>
          <h3 className={classes.subtitle}> Unpublished Transactions</h3>
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
                <UnpublishedTransactionCard
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
                />
              );
            })}
        </Grid>
      </Grid>
    </Fragment>
  );
}
