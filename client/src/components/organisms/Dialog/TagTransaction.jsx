import React, { useState, useEffect, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { usdFormatter, cryptoFormatter } from "../../../util";
import QuestionMarkIcon from "../../atoms/Icons/QuestionMarkIcon";
import CreateAccount from "./CreateAccount";
import { getExchangeRate } from "../../../actions";
import TextButton from "../../atoms/Button/TextIcon";
import ContainedButton from "../../atoms/Button/Contained";
import OutlinedButton from "../../atoms/Button/Outlined";

const useStyles = makeStyles((theme) => ({
  closeIcon: {
    position: "absolute",
    right: 5,
  },
  title: {
    fontFamily: '"Roboto", sans-serif',
    fontSize: 28,
    color: "#000000",
    fontWeight: 400,
  },
  rectangle: {
    backgroundColor: theme.palette.primary.light,
    padding: 25,
  },
  detailTitle: {
    fontFamily: '"Roboto", sans-serif',
    color: "#000000",
    fontSize: 18,
    fontWeight: 400,
    margin: 0,
    lineHeight: 1.33,
  },
  subtitle: {
    fontFamily: '"Cabin", sans-serif',
    color: "#000000",
    marginTop: 6,
    letterSpacing: 0.83,
    fontSize: 10,
    fontWeight: 500,
    textTransform: "uppercase",
  },
  donorList: {
    width: "100%",
    marginTop: 26,
  },
  donorListLabel: {
    fontFamily: '"Roboto", sans-serif',
    fontSize: 19,
    lineHeight: 1.42,
  },
  donorListSelect: {
    fontFamily: '"Roboto", sans-serif',
    height: 42,
    fontSize: 19,
    lineHeight: 1.42,
    color: "#898989",
  },
  donorMessage: {
    fontFamily: '"Roboto", sans-serif',
    fontSize: 18,
    fontWeight: 700,
    lineHeight: 1.33,
    color: "#898989",
    marginTop: 35,
  },
  donorNameTextfield: {
    fontFamily: '"Roboto", sans-serif',
    height: 42,
    width: "100%",
  },
  donorWalletTextfield: {
    fontFamily: '"Roboto", sans-serif',
    height: 42,
    width: "100%",
    marginTop: 16,
    marginBottom: 16,
  },
  donorTxidTextfield: {
    fontFamily: '"Roboto", sans-serif',
    height: 42,
    width: "100%",
    marginTop: 16,
    marginBottom: 35,
  },
  donorName: {
    fontFamily: '"Roboto", sans-serif',
    fontSize: 19,
    lineHeight: 1.42,
    color: "#898989",
  },
  donorCheckbox: {
    marginTop: 7,
    fontSize: 14,
    color: "#898989",
    lineHeight: 1.57,
  },
  relativeContainer: {
    position: "relative",
  },
  questionMark: {
    position: "absolute",
    bottom: "22%",
    marginLeft: ".5em",
    width: 20,
    height: 20,
    cursor: "pointer",
  },
  filledButton: {
    width: "100%",
    height: 35,
    fontFamily: '"Cabin", sans-serif',
    fontSize: 12,
    fontWeight: 700,
    textAlign: "center",
    color: "#ffffff",
    boxShadow: "none",
  },

  or: {
    textTransform: "uppercase",
    textAlign: "center",
    fontWeight: 700,
    lineHeight: 1.2,
    fontSize: 12,
    color: "#929292",
    margin: 0,
    paddingTop: "5em",
  },
  form: {
    marginBottom: 80,
  },
  addButton: {
    height: 35,
    fontFamily: '"Cabin", sans-serif',
    fontSize: 12,
    fontWeight: 700,
    textAlign: "center",
    color: "#ffffff",
    boxShadow: "none",
    backgroundColor: theme.palette.primary.main,
    float: "right",
    marginTop: 18,
    marginButtom: 18,
  },
}));

/* 
This form is overloaded with multiple 
responsibilities. Add a donor to the transactions, 
or add a donor and define a new donor
but the new donor info is different from
the new donor form under accounts

txid goes ?somewhere?
*/
export default function TagTransaction(props) {
  const classes = useStyles();
  const [exchangeRate, setExchangeRate] = useState(0);
  const [natcoms, setNatcoms] = useState([]);
  const [natcom, setNatcom] = useState("");

  const [donors, setDonors] = useState([]);
  const [donor, setDonor] = useState("");

  const [openCreateAccount, setOpenCreateAccount] = useState(false);
  const [createAccountType, setCreateAccountType] = useState("");
  const [addresses, setAddresses] = useState([]);

  const handleClose = () => {
    if (props.onClose) {
      props.onClose();
    }
  };

  const getAccounts = async () => {
    let res, accounts, donors, natcoms;
    try {
      res = await fetch("/rest/admin/accounts");
      accounts = await res.json();
      donors = accounts.filter((account) => {
        return account.type === "donor";
      });
      natcoms = accounts.filter((account) => {
        return account.type === "natcom";
      });
    } catch (e) {
      console.log(e);
    }

    setDonors(donors);
    setNatcoms(natcoms);
  };

  const saveTransaction = async (publish) => {
    // Update Natcom if address is new - HOLD
    // Would also require searching all other natcoms to remove this address from list
    //Update tx data
    const { tx } = props;
    tx.source = natcom;
    tx.donor = donor;
    tx.published = publish;

    try {
      await fetch(`/rest/admin/transactions/`, {
        credentials: "include",
        method: "POST",
        body: JSON.stringify({
          tx,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (e) {
      console.log(e);
      return;
    }

    handleClose();
  };

  useEffect(() => {
    const getExchangeRates = async () => {
      let rate;
      try {
        rate = await getExchangeRate(props.tx.symbol);
      } catch (e) {
        console.log(e);
      }
      setExchangeRate(rate);
    };

    getExchangeRates();
    getAccounts();
    setNatcom(props.tx.source || "");
    setDonor(props.tx.donor || "");

    setAddresses([
      {
        address: props.tx.received ? props.tx.from : props.tx.to,
        currency: props.tx.currency === "Ethereum" ? "Ether" : "Bitcoin",
        amount: props.tx.amount,
      },
    ]);
  }, [props.tx]);

  return (
    <div>
      <CreateAccount
        open={openCreateAccount}
        type={createAccountType}
        edit={false}
        addresses={addresses}
        onDialogClose={async (account) => {
          setOpenCreateAccount(false);
          await getAccounts();
          if (account) {
            if (account.type === "natcom") {
              setNatcom(account.name);
            } else {
              setDonor(account.name);
            }
          }
        }}
      />
      <Dialog fullScreen open={props.open} onClose={handleClose}>
        <Toolbar>
          <div className={classes.closeIcon}>
            <TextButton
              onClick={handleClose}
              endIcon={<CloseIcon fontSize="large" style={{ fontSize: 28 }} />}
              style={{ fontSize: 14 }}
            >
              Cancel
            </TextButton>
          </div>
        </Toolbar>
        <Container maxWidth={"sm"}>
          <h1 className={classes.title}>{props.title}</h1>
          <Grid container className={classes.rectangle}>
            <Grid item xs={3} className={classes.detailTitle}>
              {donor}
            </Grid>

            <Grid item xs={9} className={classes.detailTitle}>
              {props.tx.source}
            </Grid>

            <Grid item xs={3} className={classes.subtitle}>
              Donor
            </Grid>

            <Grid item xs={9} className={classes.subtitle}>
              Intermediary
            </Grid>
            <Grid item xs={3} className={classes.detailTitle}>
              {cryptoFormatter(props.tx.amount)} {props.tx.symbol}
            </Grid>
            <Grid item xs={9} className={classes.detailTitle}>
              {usdFormatter.format(props.tx.amount * exchangeRate)} USD
            </Grid>
            <Grid item xs={3} className={classes.subtitle}>
              {props.currency} Donated
            </Grid>
            <Grid item xs={9} className={classes.subtitle}>
              Current Value
            </Grid>
          </Grid>
          <form className={classes.form}>
            <FormControl className={classes.donorList}>
              <InputLabel className={classes.donorListLabel}>
                {" "}
                Select a natcom from existing list
              </InputLabel>
              <Select
                className={classes.donorListSelect}
                value={natcom}
                onChange={(e) => {
                  setNatcom(e.target.value);
                }}
              >
                {natcoms.map((natcom) => {
                  return (
                    <MenuItem
                      key={natcom.name}
                      className={classes.donorName}
                      value={natcom.name}
                    >
                      {natcom.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <div className={classes.relativeContainer}>
              <ContainedButton
                onClick={() => {
                  setCreateAccountType("natcom");
                  setOpenCreateAccount(true);
                }}
                float={"right"}
                style={{ marginTop: "1em" }}
              >
                Add Natcom Account
              </ContainedButton>
            </div>
            <FormControl className={classes.donorList}>
              <InputLabel className={classes.donorListLabel}>
                {" "}
                Select a donor from existing list
              </InputLabel>
              <Select
                className={classes.donorListSelect}
                value={donor}
                onChange={(e) => {
                  setDonor(e.target.value);
                }}
              >
                {donors.map((donor) => {
                  return (
                    <MenuItem
                      key={donor.name}
                      className={classes.donorName}
                      value={donor.name}
                    >
                      {donor.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <div className={classes.relativeContainer}>
              <ContainedButton
                onClick={() => {
                  setAddresses([
                    {
                      address: "",
                      currency:
                        props.tx.currency === "Ethereum" ? "Ether" : "Bitcoin",
                      amount: props.tx.amount,
                    },
                  ]);
                  setCreateAccountType("donor");
                  setOpenCreateAccount(true);
                }}
                float={"right"}
                style={{ marginTop: "1em" }}
              >
                Add Donor Account
              </ContainedButton>
            </div>
          </form>
          {!props.tx.published ? (
            <Fragment>
              <div className={classes.relativeContainer}>
                <OutlinedButton
                  onClick={() => {
                    saveTransaction(false);
                  }}
                  style={{ display: "block", width: "100%", marginTop: "1em" }}
                >
                  Tag and Save Transaction
                </OutlinedButton>
                <QuestionMarkIcon
                  className={classes.questionMark}
                  onClick={() => {
                    console.log("wtf");
                    console.log(props);
                    props.setShowHelp(true);
                  }}
                />
              </div>
              <p className={classes.or}>Or</p>
              <div className={classes.relativeContainer}>
                <ContainedButton
                  onClick={() => {
                    saveTransaction(true);
                  }}
                  style={{ display: "block", width: "100%", marginTop: "1em" }}
                >
                  Tag and Publish Transaction
                </ContainedButton>
                <QuestionMarkIcon
                  className={classes.questionMark}
                  onClick={() => {
                    console.log("wtf");

                    props.setShowHelp(true);
                  }}
                />
              </div>
            </Fragment>
          ) : (
            <Fragment>
              <div className={classes.relativeContainer}>
                <OutlinedButton
                  onClick={() => {
                    saveTransaction(props.tx.published);
                  }}
                  style={{ display: "block", width: "100%", marginTop: "1em" }}
                >
                  Tag and Save Transaction
                </OutlinedButton>
                <QuestionMarkIcon
                  className={classes.questionMark}
                  onClick={() => {
                    console.log("wtf");
                    props.setShowHelp(true);
                  }}
                />
              </div>
              <p className={classes.or}>Or</p>
              <div className={classes.relativeContainer}>
                <ContainedButton
                  onClick={() => {
                    saveTransaction(false);
                  }}
                  style={{ display: "block", width: "100%", marginTop: "1em" }}
                >
                  Tag and Unpublish Transaction
                </ContainedButton>
                <QuestionMarkIcon
                  className={classes.questionMark}
                  onClick={() => {
                    console.log("wtf");
                    props.setShowHelp(true);
                  }}
                />
              </div>
            </Fragment>
          )}
        </Container>
      </Dialog>
    </div>
  );
}
