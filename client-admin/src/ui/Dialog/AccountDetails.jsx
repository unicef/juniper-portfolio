import React, { useState, useEffect, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";
import { usdFormatter, cryptoFormatter } from "../../util";
import Button from "@material-ui/core/Button";
import CopyIcon from "../Icons/CopyIcon";

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
    minHeight: 370,
    backgroundColor: "#daf5ff",
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
  copyButton: {
    fontSize: 12,
    fontWeight: 700,
    fontFamily: '"Cabin", sans-serif',
    color: "#00aeef",
    "&:hover": {
      backgroundColor: "#ecfaff",
    },
  },
}));

export default function AccountDetails(props) {
  const classes = useStyles();
  const [addresses, setAddresses] = useState([]);

  const [ethReceived, setEthReceived] = useState(0);
  const [ethCurrentValue, setEthCurrentValue] = useState(0);
  const [ethReceivedValue, setEthReceivedValue] = useState(0);

  const [ethSent, setEthSent] = useState(0);
  const [ethSentCurrentValue, setEthSentCurrentValue] = useState(0);
  const [ethSentReceivedValue, setEthSentReceivedValue] = useState(0);

  const [btcReceived, setBtcReceived] = useState(0);
  const [btcCurrentValue, setBtcCurrentValue] = useState(0);
  const [btcReceivedValue, setBtcReceivedValue] = useState(0);

  const [btcSent, setBtcSent] = useState(0);
  const [btcSentCurrentValue, setBtcSentCurrentValue] = useState(0);
  const [btcSentReceivedValue, setBtcSentReceivedValue] = useState(0);

  useEffect(() => {
    const getAccountDetails = async () => {
      let res, accountData;
      try {
        res = await fetch(`/rest/admin/accounts/${props.account}`);
        accountData = await res.json();
      } catch (e) {
        console.log(e);
      }

      const { transactions, account } = accountData;
      const totalEthSent = transactions
        .filter((tx) => {
          return tx.currency === "Ethereum";
        })
        .filter((tx) => {
          return tx.received === true;
        })
        .reduce((total, tx) => {
          return total + tx.amount;
        }, 0);

      const totalEthRecVal = transactions
        .filter((tx) => {
          return tx.currency === "Ethereum";
        })
        .filter((tx) => {
          return tx.received === true;
        })
        .reduce((total, tx) => {
          return total + tx.amountUSD;
        }, 0);

      setEthSent(totalEthSent);
      setEthSentCurrentValue(totalEthSent * props.ethRate);
      setEthSentReceivedValue(totalEthRecVal);

      const totalBtcSent = transactions
        .filter((tx) => {
          return tx.currency === "Bitcoin";
        })
        .filter((tx) => {
          return tx.received === true;
        })
        .reduce((total, tx) => {
          return total + tx.amount;
        }, 0);

      const totalBtcRecVal = transactions
        .filter((tx) => {
          return tx.currency === "Bitcoin";
        })
        .filter((tx) => {
          return tx.received === true;
        })
        .reduce((total, tx) => {
          return total + tx.amountUSD;
        }, 0);

      setBtcSent(totalBtcSent);
      setBtcSentCurrentValue(totalBtcSent * props.btcRate);
      setBtcSentReceivedValue(totalBtcRecVal);

      console.log("accountData");
      console.log(accountData);
      console.log(accountData.account);
      console.log(accountData.account.addresses);
      console.log(accountData.transactions);
      setAddresses(account.addresses);
    };

    console.log("Account Details");
    if (props.account) {
      getAccountDetails();
    }
  }, [props.account]);

  const copyToClipboard = (text) => {
    const el = document.createElement("textarea");
    el.value = text;
    document.body.appendChild(el);
    console.log(document.body);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  };

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
        <Grid container className={classes.authorization}>
          <Grid item xs={12}>
            <h1 className={classes.walletName}>Account Name</h1>
          </Grid>
          {props.type === "natcom" && (
            <Fragment>
              <Grid item xs={3}>
                <div className={classes.walletBalance}>
                  <span className={classes.currencyBalance}>
                    {cryptoFormatter(ethReceived || 0)} {props.symbol}
                  </span>
                </div>
                <div className={classes.walletSubtitle}>Eth Received</div>
              </Grid>
              <Grid item xs={3}>
                <div className={classes.walletBalance}>
                  {usdFormatter.format(ethCurrentValue || 0)} USD
                </div>
                <div className={classes.walletSubtitle}>Current Value</div>
              </Grid>
              <Grid item xs={6}>
                <div className={classes.walletBalance}>
                  {usdFormatter.format(ethReceivedValue || 0)} USD
                </div>
                <div className={classes.walletSubtitle}>Value at Receipt</div>
              </Grid>
              <Grid item xs={3}>
                <div className={classes.walletBalance}>
                  <span className={classes.currencyBalance}>
                    {cryptoFormatter(btcReceived || 0)} {props.symbol}
                  </span>
                </div>
                <div className={classes.walletSubtitle}>Btc Received</div>
              </Grid>
              <Grid item xs={3}>
                <div className={classes.walletBalance}>
                  {usdFormatter.format(btcCurrentValue || 0)} USD
                </div>
                <div className={classes.walletSubtitle}>Current Value</div>
              </Grid>
              <Grid item xs={6}>
                <div className={classes.walletBalance}>
                  {usdFormatter.format(btcReceivedValue || 0)} USD
                </div>
                <div className={classes.walletSubtitle}>Value at Receipt</div>
              </Grid>
            </Fragment>
          )}
          {props.type === "donor" && (
            <Fragment>
              <Grid item xs={3}>
                <div className={classes.walletBalance}>
                  <span className={classes.currencyBalance}>
                    {cryptoFormatter(ethSent || 0)} {props.symbol}
                  </span>
                </div>
                <div className={classes.walletSubtitle}>Eth Donated</div>
              </Grid>
              <Grid item xs={3}>
                <div className={classes.walletBalance}>
                  {usdFormatter.format(ethSentCurrentValue || 0)} USD
                </div>
                <div className={classes.walletSubtitle}>Current Value</div>
              </Grid>
              <Grid item xs={6}>
                <div className={classes.walletBalance}>
                  {usdFormatter.format(ethSentReceivedValue || 0)} USD
                </div>
                <div className={classes.walletSubtitle}>Value at Receipt</div>
              </Grid>
              <Grid item xs={3}>
                <div className={classes.walletBalance}>
                  <span className={classes.currencyBalance}>
                    {cryptoFormatter(btcSent || 0)} {props.symbol}
                  </span>
                </div>
                <div className={classes.walletSubtitle}>Btc Donated</div>
              </Grid>
              <Grid item xs={3}>
                <div className={classes.walletBalance}>
                  {usdFormatter.format(btcSentCurrentValue || 0)} USD
                </div>
                <div className={classes.walletSubtitle}>Current Value</div>
              </Grid>
              <Grid item xs={6}>
                <div className={classes.walletBalance}>
                  {usdFormatter.format(btcSentReceivedValue || 0)} USD
                </div>
                <div className={classes.walletSubtitle}>Value at Receipt</div>
              </Grid>
            </Fragment>
          )}
          {addresses.map((address) => {
            return (
              <Grid container key={address.address}>
                <Grid item xs={9} className={classes.address}>
                  <div className={classes.walletAddress}>{address.address}</div>
                  <div className={classes.walletSubtitle}>Wallet Address</div>
                </Grid>
                <Grid item xs={3} className={classes.address}>
                  <Button
                    className={classes.copyButton}
                    startIcon={<CopyIcon fontSize="large" />}
                    onClick={() => {
                      console.log(address.address);
                      copyToClipboard(address.address);
                    }}
                  >
                    Copy
                  </Button>
                </Grid>
              </Grid>
            );
          })}

          <Grid item xs={12} className={classes.walletInfo}>
            <p className={classes.subText}>
              <b>Current value</b> = USD average across three cryotoexchanges,
              calculated at 12:01 pm (EST)
            </p>
            <p className={classes.subText}>
              <b>Value at receipt</b> = USD average across three cryotexchanges,
              calculated at 12:01 pm (EST) on the day of the disbursal
            </p>
          </Grid>
        </Grid>
      </Dialog>
    </React.Fragment>
  );
}

const authorizationDetailsData = {
  address: "0x89205A3A3b26Dty66hxIief5hjdd8e0wk0KK58fj",
  amount: 25,
  symbol: "ETH",
  currency: "Ethereum",
  valueSent: "3300.12",
  currentValue: "8300.21",
  signers: [
    {
      address: "0xxIief5hjdd8e0wk0KK58fj89205A3A3b26Dty66h",
      owner: "Christopher Waltz",
      timestamp: "Mar 24 2020 at 11:04",
    },
    {
      address: "0x0KK58fj89205A3A3b26Dty66xIief5hjdd8e0wkh",
      owner: "Khalija Ali",
      timestamp: "Mar 24 2020 at 11:51",
    },
    /*
    {
      address: "0x0KK58fj89205A3A3b26Dty66xIief5hjdd8e0wkh",
      owner: "ScrollY Check",
      timestamp: "Mar 24 2020 at 11:51",
    },
    */
  ],
};
