import React, { useState, useEffect, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";
import { usdFormatter, cryptoFormatter } from "../../util";
import Button from "@material-ui/core/Button";
import CopyIcon from "../Icons/CopyIcon";
import AccountTransactionCard from "../Cards/AccountTransactionCard";
import EditIcon from "../../ui/Icons/EditIcon";
import { CreateAccount } from ".";

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
  account: {
    backgroundColor: "#ffffff",
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
    fontSize: 14,
    lineHeight: 1.33,
    color: "#000000",
  },
  name: {
    marginBottom: 0,
    marginTop: 0,
    fontFamily: '"Roboto", sans-serif',
    fontSize: 24,
    fontWeight: 700,
    lineHeight: 1.17,
  },
  country: {
    fontSize: 18,
    lineHeight: 1.33,
    fontFamily: '"Roboto", sans-serif',
    margin: 0,
  },
  description: {
    fontFamily: '"Roboto", sans-serif',
    fontSize: 19,
    lineHeight: 1.42,
  },
  weblink: {
    fontFamily: '"Roboto", sans-serif',
    fontSize: 20,
    color: "#00aeef",
    textDecoration: "none",
    "&:visited": {
      color: "#00aeef",
    },
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
  image: {
    backgroundSize: "cover",
    backgroundPosition: "bottom",
    height: 227,
  },
  editButton: {
    float: "right",
    fontSize: 12,
    fontWeight: 700,
    fontFamily: '"Cabin", sans-serif',
    color: "#00aeef",
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: 10,
    paddingLeft: 10,
    marginBottom: 8,
    "& .MuiButton-startIcon": {
      marginRight: 0,
      paddingTop: 8,
      "& svg": {
        fontSize: 24,
      },
    },
    "&:hover": {
      backgroundColor: "#ecfaff",
    },
  },
}));

export default function StartupDetails(props) {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [weblink, setWeblink] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const [openEditAccount, setOpenEditAccount] = useState(false);

  const getAccountDetails = async () => {
    let res, accountData;
    try {
      res = await fetch(`/rest/admin/accounts/${props.account}`);
      accountData = await res.json();
    } catch (e) {
      console.log(e);
    }

    const { transactions, account } = accountData;

    setName(account.name);
    setImage(account.image);
    setCountry(account.country);
    setDescription(account.description);

    if (account.weblink.indexOf("http") >= 0) {
      setWeblink(account.weblink);
    } else {
      setWeblink(`http://${account.weblink}`);
    }

    setAddresses(account.addresses);
    setTransactions(transactions);
  };

  useEffect(() => {
    if (props.account) {
      getAccountDetails();
    }
  }, [props.account]);

  return (
    <React.Fragment>
      <CreateAccount
        open={openEditAccount}
        type={"startup"}
        edit={true}
        name={name}
        description={description}
        image={image}
        country={country}
        weblink={weblink}
        addresses={addresses}
        onDialogClose={() => {
          setOpenEditAccount(false);
          getAccountDetails();
        }}
      />
      <Dialog
        fullWidth
        open={props.open}
        onClose={() => {
          props.setOpenDetails(false);
        }}
        classes={{ paper: classes.modal }}
      >
        <Grid container>
          <Grid
            item
            xs={12}
            className={classes.image}
            style={{ backgroundImage: `url(${image}` }}
          ></Grid>
        </Grid>
        <Grid container className={classes.account}>
          <Grid item xs={9}>
            <h1 className={classes.name}>{name}</h1>
          </Grid>
          <Grid item xs={3}>
            <Button
              className={classes.editButton}
              startIcon={<EditIcon fontSize="large" />}
              onClick={() => {
                setOpenEditAccount(true);
              }}
            >
              Edit Profile
            </Button>
          </Grid>
          <Grid item xs={12}>
            <p className={classes.country}>{country}</p>
          </Grid>
          <Grid item xs={12}>
            <p className={classes.description}>{description}</p>
          </Grid>
          <Grid item xs={12}>
            <a className={classes.weblink} href={weblink} target="_blank">
              {weblink}
            </a>
          </Grid>

          {addresses.map((address) => {
            return (
              <Grid container key={address.address}>
                <Grid item xs={8} className={classes.address}>
                  <div className={classes.walletAddress}>{address.address}</div>
                  <div className={classes.walletSubtitle}>Wallet Address</div>
                </Grid>
                <Grid item xs={4} className={classes.address}>
                  <Button
                    className={classes.copyButton}
                    startIcon={<CopyIcon fontSize="large" />}
                    onClick={() => {
                      props.copyToClipboard(address.address);
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
                  copyToClipboard={props.copyToClipboard}
                />
              );
            })}
          </Grid>
        </Grid>
      </Dialog>
    </React.Fragment>
  );
}
