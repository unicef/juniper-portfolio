import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";
import { usdFormatter, cryptoFormatter } from "../../util";
import Button from "@material-ui/core/Button";
import CopyIcon from "../Icons/CopyIcon";
import AccountTransactionCard from "../Cards/AccountTransactionCard";
import { copyToClipboard } from "../../actions";

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
  const [transactions, setTransactions] = useState([]);

  const [ethDonated, setEthDonated] = useState(0);
  const [ethDonatedCurrentValue, setEthDonatedCurrentValue] = useState(0);
  const [ethDonatedReceivedValue, setEthDonatedReceivedValue] = useState(0);

  const [btcDonated, setBtcDonated] = useState(0);
  const [btcDonatedCurrentValue, setBtcDonatedCurrentValue] = useState(0);
  const [btcDonatedReceivedValue, setBtcDonatedReceivedValue] = useState(0);

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

      const totalEthDonated = transactions
        .filter((tx) => {
          return tx.currency === "Ethereum";
        })
        .filter((tx) => {
          return tx.received === true;
        })
        .reduce((total, tx) => {
          return total + tx.amount;
        }, 0);

      const totalEthDonVal = transactions
        .filter((tx) => {
          return tx.currency === "Ethereum";
        })
        .filter((tx) => {
          return tx.received === true;
        })
        .reduce((total, tx) => {
          return total + tx.amountUSD;
        }, 0);

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

      setAddresses(account.addresses);
      setTransactions(
        transactions.filter((tx) => {
          return tx.received === true;
        })
      );
      setEthDonated(totalEthDonated);
      setEthDonatedCurrentValue(totalEthDonated * props.ethRate);
      setEthDonatedReceivedValue(totalEthDonVal);

      setBtcDonated(totalBtcSent);
      setBtcDonatedCurrentValue(totalBtcSent * props.btcRate);
      setBtcDonatedReceivedValue(totalBtcRecVal);
    };

    if (props.account) {
      getAccountDetails();
    }
  }, [props.account]);

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

          <Grid item xs={3}>
            <div className={classes.walletBalance}>
              <span className={classes.currencyBalance}>
                {cryptoFormatter(ethDonated || 0)} {props.symbol}
              </span>
            </div>
            <div className={classes.walletSubtitle}>Eth Donated</div>
          </Grid>
          <Grid item xs={3}>
            <div className={classes.walletBalance}>
              {usdFormatter.format(ethDonatedCurrentValue || 0)} USD
            </div>
            <div className={classes.walletSubtitle}>Current Value</div>
          </Grid>
          <Grid item xs={6}>
            <div className={classes.walletBalance}>
              {usdFormatter.format(ethDonatedReceivedValue || 0)} USD
            </div>
            <div className={classes.walletSubtitle}>Value at Receipt</div>
          </Grid>
          <Grid item xs={3}>
            <div className={classes.walletBalance}>
              <span className={classes.currencyBalance}>
                {cryptoFormatter(btcDonated || 0)} {props.symbol}
              </span>
            </div>
            <div className={classes.walletSubtitle}>Btc Donated</div>
          </Grid>
          <Grid item xs={3}>
            <div className={classes.walletBalance}>
              {usdFormatter.format(btcDonatedCurrentValue || 0)} USD
            </div>
            <div className={classes.walletSubtitle}>Current Value</div>
          </Grid>
          <Grid item xs={6}>
            <div className={classes.walletBalance}>
              {usdFormatter.format(btcDonatedReceivedValue || 0)} USD
            </div>
            <div className={classes.walletSubtitle}>Value at Receipt</div>
          </Grid>

          {addresses.map((address) => {
            return (
              <Grid container key={address.address}>
                <Grid item xs={10} className={classes.address}>
                  <div className={classes.walletAddress}>{address.address}</div>
                  <div className={classes.walletSubtitle}>Wallet Address</div>
                </Grid>
                <Grid item xs={2} className={classes.address}>
                  <Button
                    className={classes.copyButton}
                    startIcon={<CopyIcon fontSize="large" />}
                    onClick={() => {
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
        <Grid container>
          <Grid item xs={12}>
            {transactions.map((tx, index) => {
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
        </Grid>
      </Dialog>
    </React.Fragment>
  );
}
