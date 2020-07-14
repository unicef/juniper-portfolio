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
import CircleChecked from "@material-ui/icons/CheckCircleOutline";
import CircleCheckedFilled from "@material-ui/icons/CheckCircle";
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";

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
  },
  donorListLabel: {
    fontFamily: '"Roboto", sans-serif',
    fontSize: 19,
    lineHeight: 1.42,
  },
  donorListSelect: {
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
  },
  donorNameTextfield: {
    height: 42,
    width: "100%",
  },
  donorName: {
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
}));

export default function TagTransaction(props) {
  const classes = useStyles();
  const [exchangeRate, setExchangeRate] = useState(0);
  const [donor, setDonor] = useState("");

  const handleClose = () => {
    if (props.onClose) {
      props.onClose();
    }
  };

  useEffect(() => {
    const getExchangeRate = async () => {
      const rate = await props.getExchangeRate(props.tx.symbol);
      setExchangeRate(rate);
    };
    getExchangeRate();
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
              Donor Name
            </Grid>
            <Grid item xs={9} className={classes.detailTitle}>
              Intermediary Name
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
                <MenuItem className={classes.donorName} value={10}>
                  Donor1
                </MenuItem>
                <MenuItem className={classes.donorName} value={20}>
                  Donor2
                </MenuItem>
                <MenuItem className={classes.donorName} value={30}>
                  Donor3
                </MenuItem>
              </Select>
            </FormControl>
            <p className={classes.donorMessage}>
              If the donor name does not exist in the above list, please add the
              details below.
            </p>
            <TextField
              className={classes.donorNameTextfield}
              label="Donor Name"
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
          </form>
        </Container>
      </Dialog>
    </div>
  );
}
