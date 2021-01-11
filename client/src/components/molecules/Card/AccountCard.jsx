import React, { Fragment, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { usdFormatter, cryptoFormatter } from "../../../util";
import { calculateAccountTotal } from "../../../actions";
import TextButton from "../../atoms/Button/TextIcon";

import Card from "../../atoms/Card";
import CardTitle from "../../atoms/Text/CardTitle";
import CardCountry from "../../atoms/Text/CardCountry";
import CardImage from "../../atoms/Text/CardImage";

import SummarySubtitle from "../../atoms/Text/SummarySubtitle";
import CardBalance from "../../atoms/Text/CardBalance";
import CardAddress from "../../atoms/Text/CardAddress";

const useStyles = makeStyles((theme) => ({
  accountTitle: {
    marginTop: 0,
  },
  imageTitle: {
    paddingLeft: 12,
  },
  walletBalance: {
    marginTop: 18,
  },

  viewTxButton: {
    marginTop: 25,
  },
}));

export default function AccountCard({
  account,
  ethRate,
  btcRate,
  setOpenDetails,
  setDetailsAccount,
  accountTransactions,
}) {
  const classes = useStyles();

  const { name, type, image, country } = account;

  const addresses = account.addresses
    .map((addr) => {
      return addr.address;
    })
    .reduce((start = [], addrArray) => {
      return start.concat(addrArray);
    }, []);

  let txs = [];

  switch (type) {
    case "payee":
      txs = accountTransactions.filter((tx) => {
        return addresses.indexOf(tx.to) >= 0;
      });
      break;
    case "donor":
      txs = accountTransactions.filter((tx) => {
        return tx.donor === name;
      });
      break;
    case "natcom":
      txs = accountTransactions.filter((tx) => {
        return addresses.indexOf(tx.from) >= 0;
      });
      break;
    default:
      break;
  }

  let totalEth = 0;
  let ethUSD = 0;
  let totalBtc = 0;
  let btcUSD = 0;

  totalEth = txs
    .filter((tx) => {
      return tx.currency === "Ethereum";
    })
    .reduce((total = 0, tx) => {
      return +total + +tx.amount;
    }, []);
  ethUSD = txs
    .filter((tx) => {
      return tx.currency === "Ethereum";
    })
    .reduce((total = 0, tx) => {
      return +total + +tx.amountUSD;
    }, []);

  totalBtc = txs
    .filter((tx) => {
      return tx.currency === "Bitcoin";
    })
    .reduce((total = 0, tx) => {
      return +total + +tx.amount;
    }, []);
  btcUSD = txs
    .filter((tx) => {
      return tx.currency === "Bitcoin";
    })
    .reduce((total = 0, tx) => {
      return +total + +tx.amountUSD;
    }, []);

  return (
    <Card>
      <Grid container>
        {image && type === "payee" ? (
          <Fragment>
            <Grid item xs={4}>
              <CardImage src={image} />
            </Grid>

            <Grid item xs={8} className={classes.imageTitle}>
              <CardTitle className={classes.accountTitle}>{name}</CardTitle>
              <CardCountry>{country}</CardCountry>
            </Grid>
          </Fragment>
        ) : (
          <Grid item xs={12}>
            <CardTitle>{name}</CardTitle>
            <CardCountry>{country}</CardCountry>
          </Grid>
        )}
      </Grid>

      <Grid container>
        <Grid item xs={6}>
          <div className={classes.walletBalance}>
            <CardBalance isBold={true}>
              {cryptoFormatter(totalEth)} ETH
            </CardBalance>
            <SummarySubtitle>
              Ether {type === "payee" ? "Received" : "Sent"}
            </SummarySubtitle>
          </div>
          <div className={classes.walletBalance}>
            <CardBalance isBold={true}>{usdFormatter(ethUSD)} USD</CardBalance>
            <SummarySubtitle>Current Value</SummarySubtitle>
          </div>
        </Grid>

        <Grid item xs={6}>
          <div className={classes.walletBalance}>
            <CardBalance isBold={true}>
              {cryptoFormatter(totalBtc)} BTC
            </CardBalance>
            <SummarySubtitle>
              Bitcoin {type === "payee" ? "Received" : "Sent"}
            </SummarySubtitle>
          </div>
          <div className={classes.walletBalance}>
            <CardBalance isBold={true}>{usdFormatter(btcUSD)} USD</CardBalance>
            <SummarySubtitle>Current Value</SummarySubtitle>
          </div>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12} className={classes.viewTxButton}>
          <TextButton
            endIcon={<ChevronRightIcon />}
            onClick={() => {
              setDetailsAccount(name);
              setOpenDetails(true);
            }}
          >
            View Account Details
          </TextButton>
        </Grid>
      </Grid>
    </Card>
  );
}
