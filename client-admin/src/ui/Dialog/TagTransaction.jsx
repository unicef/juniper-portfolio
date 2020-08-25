import React, { useState, useEffect, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { usdFormatter, cryptoFormatter } from "../../util";
import Checkbox from "@material-ui/core/Checkbox";
import CircleCheckedFilled from "@material-ui/icons/CheckCircle";
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import QuestionMarkIcon from "../Icons/QuestionMarkIcon";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const useStyles = makeStyles((theme) => ({
  closeIcon: {
    position: "absolute",
    right: 5,
    fontFamily: '"Cabin",  sans-serif',
    fontSize: 14,
    letterSpacing: 1.17,
    fontWeight: 700,
    textTransform: "uppercase",
  },
  title: {
    fontFamily: '"Roboto", sans-serif',
    fontSize: 28,
    color: "#000000",
    fontWeight: 400,
  },
  rectangle: {
    backgroundColor: "#daf5ff",
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
  outlineButton: {
    width: "100%",
    height: 35,
    fontFamily: '"Cabin", sans-serif',
    fontSize: 12,
    fontWeight: 700,
    textAlign: "center",
    color: "#00aeef",
    borderRadius: 5,
    boxShadow: "none",
  },
  or: {
    textTransform: "uppercase",
    textAlign: "center",
    fontWeight: 700,
    lineHeight: 1.2,
    fontSize: 12,
    color: "#929292",
    marginTop: 10,
    marginBottom: 10,
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
  const [donors, setDonors] = useState([]);
  const [donor, setDonor] = useState("");
  const [newDonorName, setNewDonorName] = useState("");
  const [newDonorAddress, setNewDonorAddress] = useState("");
  const [newDonorTxid, setNewDonorTxid] = useState("");

  const handleClose = () => {
    if (props.onClose) {
      props.onClose();
    }
  };

  useEffect(() => {
    const getExchangeRate = async () => {
      let rate;
      try {
        rate = await props.getExchangeRate(props.tx.symbol);
      } catch (e) {
        console.log(e);
      }
      setExchangeRate(rate);
    };
    const getDonors = async () => {
      let res, accounts, donors;
      try {
        res = await fetch("/rest/admin/accounts");
        accounts = await res.json();
        donors = accounts.filter((account) => {
          return account.type === "donor";
        });
      } catch (e) {
        console.log(e);
      }

      setDonors(donors);
    };
    getExchangeRate();
    getDonors();
  }, [props.tx]);

  return (
    <div>
      <Dialog fullScreen open={props.open} onClose={handleClose}>
        <Toolbar>
          <IconButton
            color="primary"
            onClick={handleClose}
            aria-label="close"
            className={classes.closeIcon}
          >
            Cancel <CloseIcon fontSize="large" />
          </IconButton>
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
          <form>
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

            <p className={classes.donorMessage}>
              If the donor name does not exist in the above list, please add the
              details below.
            </p>
            <TextField
              className={classes.donorNameTextfield}
              label="Donor Name"
              value={newDonorName}
              onChange={(e) => {
                setNewDonorName(e.target.value);
              }}
              InputProps={{
                classes: {
                  root: classes.donorName,
                },
              }}
              InputLabelProps={{
                classes: {
                  root: classes.donorName,
                },
              }}
            />
            <FormControlLabel
              className={classes.donorCheckbox}
              value="end"
              control={
                <Checkbox
                  color="primary"
                  icon={<CircleUnchecked />}
                  checkedIcon={<CircleCheckedFilled />}
                />
              }
              label="Donor’s identity unknown or cannot be made public"
              labelPlacement="end"
            />
            <TextField
              className={classes.donorWalletTextfield}
              label="Donor's Wallet Address"
              value={newDonorAddress}
              onChange={(e) => {
                setNewDonorAddress(e.target.value);
              }}
              InputProps={{
                classes: {
                  root: classes.donorName,
                },
              }}
              InputLabelProps={{
                classes: {
                  root: classes.donorName,
                },
              }}
            />
            <div className={classes.relativeContainer}>
              <TextField
                className={classes.donorTxidTextfield}
                label="Transaction id"
                value={newDonorTxid}
                onChange={(e) => {
                  setNewDonorTxid(e.target.value);
                }}
                InputProps={{
                  classes: {
                    root: classes.donorName,
                  },
                }}
                InputLabelProps={{
                  classes: {
                    root: classes.donorName,
                  },
                }}
              />
              <QuestionMarkIcon
                className={classes.questionMark}
                style={{ bottom: "50%" }}
              />
            </div>

            <div className={classes.relativeContainer}>
              <Button
                variant="outlined"
                color="primary"
                className={classes.outlineButton}
                onClick={() => {
                  const newDonor = newDonorAddress
                    ? {
                        name: donor || newDonorName,
                        addresses: [
                          {
                            address: newDonorAddress,
                            currency: props.tx.currency,
                            amount: props.tx.amount,
                          },
                        ],
                      }
                    : null;

                  const { tx } = props;

                  tx.donor = donor || newDonorName;
                  tx.donorTxid = newDonorTxid;

                  props.publishTransaction(tx, newDonor, false);
                }}
              >
                Tag and Save Transaction
              </Button>
              <QuestionMarkIcon className={classes.questionMark} />
            </div>
            <p className={classes.or}>Or</p>
            <div className={classes.relativeContainer}>
              <Button
                variant="contained"
                color="primary"
                className={classes.filledButton}
                onClick={() => {
                  const newDonor = newDonorAddress
                    ? {
                        name: donor || newDonorName,
                        addresses: [
                          {
                            address: newDonorAddress,
                            currency: props.tx.currency,
                            amount: props.tx.amount,
                          },
                        ],
                      }
                    : null;

                  const { tx } = props;

                  tx.donor = donor || newDonorName;
                  tx.donorTxid = newDonorTxid;

                  props.publishTransaction(tx, newDonor, true);
                }}
              >
                Tag and Publish Transaction
              </Button>
              <QuestionMarkIcon className={classes.questionMark} />
            </div>
          </form>
        </Container>
      </Dialog>
    </div>
  );
}
