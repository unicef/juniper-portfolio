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
}) {
  const classes = useStyles();
  const [totalEthInvested, setEthInvested] = useState(0);
  const [totalBtcInvested, setBtcInvested] = useState(0);

  const { name, type, image, country } = account;

  useEffect(() => {
    setEthInvested(account.etherBalance);
    setBtcInvested(account.bitcoinBalance);
  }, [account]);

  return (
    <Card>
      <Grid container>
        {image && type === "startup" ? (
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
              {cryptoFormatter(totalEthInvested)} ETH
            </CardBalance>
            <SummarySubtitle>Ether Balance</SummarySubtitle>
          </div>
          <div className={classes.walletBalance}>
            <CardBalance isBold={true}>
              {usdFormatter(totalEthInvested * ethRate)} USD
            </CardBalance>
            <SummarySubtitle>Current Value</SummarySubtitle>
          </div>
        </Grid>

        <Grid item xs={6}>
          <div className={classes.walletBalance}>
            <CardBalance isBold={true}>
              {cryptoFormatter(totalBtcInvested)} BTC
            </CardBalance>
            <SummarySubtitle>Bitcoin Balance</SummarySubtitle>
          </div>
          <div className={classes.walletBalance}>
            <CardBalance isBold={true}>
              {usdFormatter(totalBtcInvested * btcRate)} USD
            </CardBalance>
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
