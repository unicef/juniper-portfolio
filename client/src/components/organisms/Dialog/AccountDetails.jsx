import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";
import { usdFormatter, cryptoFormatter } from "../../../util";
import AccountTransactionCard from "../../../ui/Cards/AccountTransactionCard";
import CopyAddressButton from "../../molecules/Button/CopyAddress";
import CancelIcon from "../../atoms/Icons/CancelIcons";

import web3 from "web3";

const useStyles = makeStyles((theme) => ({
  modal: {
    height: "100vh",
    margin: 0,
    maxHeight: "100vh",
    borderRadius: 0,
    maxWidth: 642,
  },
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
  authorization: {
    backgroundColor: theme.palette.primary.light,
    padding: "20px 40px 40px 40px",
  },
  authorizationTitle: {
    fontFamily: '"Roboto", sans-serif',
    fontSize: 24,
    fontWeight: 400,
    lineHeight: 1.17,
    color: "#000000",
  },
  walletInfo: {
    marginTop: "2em",
    padding: "20px 40px 40px 40px",
  },
  subText: {
    marginTop: 0,
    marginBottom: 0,
    fontSize: 14,
    lineHeight: 1.57,
    color: "#898989",
    fontFamily: '"Roboto", sans-serif',
    letterSpacing: "normal",
  },
  address: {
    marginTop: "2em",
  },
  walletAddress: {
    fontFamily: '"Roboto", sans-serif',
    fontSize: 18,
    lineHeight: 1.33,
    color: "#000000",
  },
  walletName: {
    marginBottom: 0,
    marginTop: "1.5em",
    fontFamily: '"Roboto", sans-serif',
    fontSize: 24,
    fontWeight: 700,
    lineHeight: 1.17,
  },
}));

export default function AccountDetails(props) {
  const classes = useStyles();

  const [ethDonated, setEthDonated] = useState(0);
  const [ethDonatedCurrentValue, setEthDonatedCurrentValue] = useState(0);
  const [ethDonatedReceivedValue, setEthDonatedReceivedValue] = useState(0);

  const [btcDonated, setBtcDonated] = useState(0);
  const [btcDonatedCurrentValue, setBtcDonatedCurrentValue] = useState(0);
  const [btcDonatedReceivedValue, setBtcDonatedReceivedValue] = useState(0);

  if (!props.account) {
    return null;
  }

  const {
    name,
    country,
    image,
    description,
    weblink,
    addresses,
    txs,
    totalEth,
    ethUSD,
    totalBtc,
    btcUSD,
  } = props.account;
  return (
    <React.Fragment>
      <Dialog
        fullWidth
        open={props.open}
        onClose={() => {
          props.setOpenDetails(false);
        }}
        classes={{ paper: classes.modal }}
      >
        <CancelIcon
          style={{ position: "absolute", right: 8, top: 8, cursor: "pointer" }}
          onClick={() => {
            props.setOpenDetails(false);
          }}
        />
        <Grid container className={classes.authorization}>
          <Grid item xs={12}>
            <h1 className={classes.walletName}>{name}</h1>
          </Grid>

          <Grid item xs={3}>
            <div className={classes.walletBalance}>
              <span className={classes.currencyBalance}>
                {cryptoFormatter(totalEth || 0)} {props.symbol}
              </span>
            </div>
            <div className={classes.walletSubtitle}>Eth Donated</div>
          </Grid>
          <Grid item xs={3}>
            <div className={classes.walletBalance}>
              {usdFormatter(totalEth * props.ethRate || 0)} USD
            </div>
            <div className={classes.walletSubtitle}>Current Value</div>
          </Grid>
          <Grid item xs={6}>
            <div className={classes.walletBalance}>
              {usdFormatter(ethUSD || 0)} USD
            </div>
            <div className={classes.walletSubtitle}>Value at Receipt</div>
          </Grid>
          <Grid item xs={3}>
            <div className={classes.walletBalance}>
              <span className={classes.currencyBalance}>
                {cryptoFormatter(totalBtc || 0)} {props.symbol}
              </span>
            </div>
            <div className={classes.walletSubtitle}>Btc Donated</div>
          </Grid>
          <Grid item xs={3}>
            <div className={classes.walletBalance}>
              {usdFormatter(totalBtc * props.btcRate || 0)} USD
            </div>
            <div className={classes.walletSubtitle}>Current Value</div>
          </Grid>
          <Grid item xs={6}>
            <div className={classes.walletBalance}>
              {usdFormatter(btcUSD || 0)} USD
            </div>
            <div className={classes.walletSubtitle}>Value at Receipt</div>
          </Grid>

          {addresses.map((address) => {
            return (
              <Grid container key={address.address}>
                <Grid item xs={10} className={classes.address}>
                  <div className={classes.walletAddress}>{address.address}</div>
                  {web3.utils.isAddress(address.address) ? (
                    <div className={classes.walletSubtitle}>
                      Ethereum Wallet Address
                    </div>
                  ) : (
                    <div className={classes.walletSubtitle}>
                      Bitcoin Wallet Address
                    </div>
                  )}
                </Grid>
                <Grid item xs={2} className={classes.address}>
                  <CopyAddressButton address={address.address}>
                    Copy
                  </CopyAddressButton>
                </Grid>
              </Grid>
            );
          })}
        </Grid>
        <Grid container>
          <Grid item xs={12}>
            {txs.map((tx, index) => {
              return (
                <AccountTransactionCard
                  key={index}
                  title={props.title}
                  received={tx.amount}
                  currency={tx.currency}
                  symbol={tx.symbol}
                  ethRate={props.ethRate}
                  btcRate={props.btcRate}
                  amountUSD={tx.amountUSD}
                  address={tx.address}
                  timestamp={tx.timestamp}
                />
              );
            })}
          </Grid>
          <Grid item xs={12} className={classes.walletInfo}>
            <p className={classes.subText}>
              <b>Current value</b> = The average price of crypto in USD. Price
              is calculated 12:01 pm (UTC), prices are read from three
              diffferent cryptoexchanges.
            </p>
            <p className={classes.subText}>
              <b>Value at receipt</b> = The average price of crypto in USD on
              the day of disbursal. Price is calculated at 12:01 pm (UTC) on the
              day of disbursal and prices are read from three different
              cryptoexchanges.
            </p>
          </Grid>
        </Grid>
      </Dialog>
    </React.Fragment>
  );
}
