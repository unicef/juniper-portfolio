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
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import AddIcon from "@material-ui/icons/Add";
import CircularProgress from "@material-ui/core/CircularProgress";

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
}));

export default function TagTransaction(props) {
  const classes = useStyles();

  const handleClose = () => {
    if (props.setShowAddWalletModal) {
      props.setShowAddWalletModal(false);
    }
  };

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
              Donor Name
            </Grid>
            <Grid item xs={9} className={classes.detailTitle}>
              Intermediary Name
            </Grid>
            <Grid item xs={3} className={classes.subtitle}>
              {props.currency} Donated
            </Grid>
            <Grid item xs={9} className={classes.subtitle}>
              Current Value
            </Grid>
          </Grid>
          <form></form>
        </Container>
      </Dialog>
    </div>
  );
}
