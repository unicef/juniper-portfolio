import React, { Fragment, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { usdFormatter, cryptoFormatter } from "../../util";
import { calculateAccountTotal } from "../../actions";

const useStyles = makeStyles((theme) => ({
  wallet: {
    minHeight: 290,
    backgroundColor: "#ffffff",
    fontFamily: '"Roboto", sans-serif',
    paddingTop: 30,
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
  image: {
    width: 125,
    height: 71,
  },
  imageTitle: {
    paddingLeft: 12,
  },
  name: {
    fontSize: 24,
    fontWeight: 700,
    lineHeight: 1.17,
    color: "#000000",
    marginTop: 0,
    marginBottom: 0,
  },
  country: {
    fontSize: 18,
    lineHeight: 1.33,
    fontWeight: 400,
    marginTop: 0,
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
  viewTxButton: {
    fontSize: 12,
    fontWeight: 700,
    fontFamily: '"Cabin", sans-serif',
    marginTop: 25,
    color: "#00aeef",
    "&:hover": {
      backgroundColor: "#ecfaff",
    },
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
    setEthInvested(calculateAccountTotal(account, "Ether"));
    setBtcInvested(calculateAccountTotal(account, "Bitcoin"));
  }, [account]);

  return (
    <div className={classes.wallet}>
      <Grid container>
        {image && type === "startup" ? (
          <Fragment>
            <Grid item xs={4}>
              <img className={classes.image} src={image} alt={"logo"} />
            </Grid>

            <Grid item xs={8} className={classes.imageTitle}>
              <h2 className={classes.name}>{name}</h2>
              <h3 className={classes.country}>{country}</h3>
            </Grid>
          </Fragment>
        ) : (
          <Grid item xs={12}>
            <h2 className={classes.name}>{name}</h2>
            <h3 className={classes.country}>{country}</h3>
          </Grid>
        )}
      </Grid>

      <Grid container>
        <Grid item xs={6}>
          <div className={classes.walletBalance}>
            <span className={classes.currencyBalance}>
              {cryptoFormatter(totalEthInvested)} ETH
            </span>
          </div>
          <div className={classes.walletSubtitle}>Ether Balance</div>
          <div className={classes.walletBalance}>
            <span className={classes.currencyBalance}>
              {usdFormatter.format(totalEthInvested * ethRate)} USD
            </span>
          </div>
          <div className={classes.walletSubtitle}>Current Value</div>
        </Grid>

        <Grid item xs={6}>
          <div className={classes.walletBalance}>
            <span className={classes.currencyBalance}>
              {cryptoFormatter(totalBtcInvested)} BTC
            </span>
          </div>
          <div className={classes.walletSubtitle}>Bitcoin Balance</div>
          <div className={classes.walletBalance}>
            <span className={classes.currencyBalance}>
              {usdFormatter.format(totalBtcInvested * btcRate)} USD
            </span>
          </div>
          <div className={classes.walletSubtitle}>Current Value</div>
        </Grid>
      </Grid>
      <Button
        className={classes.viewTxButton}
        endIcon={<ChevronRightIcon />}
        onClick={() => {
          setDetailsAccount(name);
          setOpenDetails(true);
        }}
      >
        View Account Details
      </Button>
    </div>
  );
}
