import React, { useState, useEffect, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import Container from "@material-ui/core/Container";
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

const web3Utils = require("web3-utils");

const currencyLookup = {
  BTC: "Bitcoin",
  ETH: "Ethereum",
};

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
  subtitle: {
    fontFamily: '"Roboto", sans-serif',
    fontSize: 19,
    color: "#000000",
    lineHeight: 1.42,
    fontWeight: 400,
    position: "relative",
  },
  subtitleIcon: {
    position: "absolute",
    bottom: 4,
    marginLeft: 6,
  },
  form: {
    marginTop: "5em",
  },
  label: {
    fontFamily: '"Roboto", sans-serif',
    fontSize: 19,
    lineHeight: 1.42,
    "&.MuiInputLabel-shrink": {
      textTransform: "uppercase",
      fontSize: 12,
      letterSpacing: 0.83,
      fontWeight: 500,
      color: "#000000",
    },
  },
  formControl: {
    fontFamily: '"Roboto", sans-serif',
    width: "100%",
    fontSize: 19,
    lineHeight: 1.42,
    marginBottom: ".5em",
  },
  multisigButton: {
    height: 35,
    width: 96,
    borderRadius: 5,
    marginRight: 10,
    textTransform: "uppercase",
    color: "#898989",
  },
  multisigButtonActive: {
    height: 35,
    width: 96,
    borderRadius: 5,
    marginRight: 10,
    textTransform: "uppercase",
    color: "#00aaef",
  },
  addNewWalletButton: {
    height: 35,
    display: "block",
    fontFamily: '"Cabin",  sans-serif',
    fontSize: 12,
    color: "#ffffff",
    fontWeight: 700,
    letterSpacing: 1.2,
    width: "100%",
    marginTop: "3em",
    borderRadius: 5,
    textTransform: "uppercase",
  },
  multisigOwners: {
    marginTop: "2em",
  },
  addMultisigOwnerButton: {
    fontFamily: '"Cabin",  sans-serif',
    padding: 0,
    textTransform: "uppercase",
    fontSize: 12,
    fontWeight: 700,
  },
  addingWallet: {
    marginTop: "1em",
    textAlign: "center",
  },
}));

function MultisigOwner(props) {
  const classes = useStyles();

  return (
    <Fragment>
      <TextField
        required
        className={classes.formControl}
        InputLabelProps={{ className: classes.label }}
        InputProps={{
          className: classes.formControl,
        }}
        label={`Owner ${props.index + 1} wallet address`}
        value={props.multisigOwners[props.index].walletAddress}
        onChange={(e) => {
          const newMultisigOwners = props.multisigOwners.slice();
          newMultisigOwners[props.index].walletAddress = e.target.value;
          props.setMultisigOwners(newMultisigOwners);
        }}
      />
      <TextField
        className={classes.formControl}
        InputLabelProps={{
          className: classes.label,
        }}
        InputProps={{
          className: classes.formControl,
        }}
        label={`Owner ${props.index + 1} name (optional)`}
        style={{ marginBottom: 0 }}
        value={props.multisigOwners[props.index].ownerName}
        onChange={(e) => {
          const newMultisigOwners = props.multisigOwners.slice();
          newMultisigOwners[props.index].ownerName = e.target.value;
          props.setMultisigOwners(newMultisigOwners);
        }}
      />
    </Fragment>
  );
}

export default function AddWallet(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState("");
  const [tags, setTags] = useState([]);
  const [name, setName] = useState("");
  const [currency, setCurrency] = useState("Ethereum");
  const [symbol, setSymbol] = useState("ETH");
  const [isMultisig, setIsMultisig] = useState(false);
  const [isUnicef, setIsUnicef] = useState(false);
  const [isTracked, setIsTracked] = useState(false);
  const [isTrackedOther, setIsTrackedOther] = useState(false);
  const [addingWallet, setAddingWallet] = useState(false);
  const [multisigOwners, setMultisigOwners] = useState([
    {
      walletAddress: "",
      ownerName: "",
    },
  ]);
  const handleClose = () => {
    if (props.setShowAddWalletModal) {
      props.setShowAddWalletModal(false);
    }
    setOpen(false);
  };

  const addTag = (tag) => {
    const newTags = tags.slice();
    newTags.push(tag);
    setTags(newTags);
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const addMultisigOwner = () => {
    const newOwners = multisigOwners.slice();
    newOwners.push({
      walletAddress: "",
      ownerName: "",
    });
    setMultisigOwners(newOwners);
  };

  const addWallet = async () => {
    const wallet = {
      address,
      name,
      tags,
      currency,
      symbol,
      isMultisig,
      multisigOwners,
      isUnicef,
      isTracked,
      isTrackedOther,
    };
    setAddingWallet(true);

    try {
      await fetch(`/rest/admin/wallets`, {
        credentials: "include",
        method: "POST",
        body: JSON.stringify({
          wallet,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (e) {
      return console.log(e);
    }

    setAddress("");
    setTags([]);
    setName("");
    setCurrency("Ether");
    setSymbol("ETH");
    setIsMultisig(false);
    setMultisigOwners([
      {
        walletAddress: "",
        ownerName: "",
      },
    ]);

    if (props.afterAddWallet) {
      props.afterAddWallet();
    }

    setAddingWallet(false);
    handleClose();
  };

  useEffect(() => {
    setName(props.name || "");
    setTags(props.tags || []);
    setAddress(props.address || "");
    setSymbol(props.symbol || "ETH");
    setIsMultisig(props.isMultisig || false);
    setMultisigOwners(
      props.multisigOwners || [
        {
          walletAddress: "",
          ownerName: "",
        },
      ]
    );
    setCurrency(props.currency || "Ethereum");
    setIsUnicef(props.isUnicef || false);
    setIsTracked(props.isTracked || false);
    setIsTrackedOther(props.isTrackedOther || false);
    setOpen(props.open);
  }, [
    props.open,
    props.isUnicef,
    props.address,
    props.currency,
    props.isMultisig,
    props.isTracked,
    props.isTrackedOther,
    props.multisigOwners,
    props.name,
    props.symbol,
    props.tags,
  ]);

  return (
    <div>
      <Dialog fullScreen open={open} onClose={handleClose}>
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
          <h1 className={classes.title}>
            {props.editWallet ? "Edit" : "Add new"} wallet
          </h1>
          <form className={classes.form}>
            <TextField
              disabled={props.editWallet}
              value={address}
              required
              className={classes.formControl}
              InputLabelProps={{ className: classes.label }}
              InputProps={{
                className: classes.formControl,
              }}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              label="Wallet address"
            />

            <TextField
              required
              value={name}
              className={classes.formControl}
              InputLabelProps={{ className: classes.label }}
              InputProps={{
                className: classes.formControl,
              }}
              onChange={(e) => {
                setName(e.target.value);
              }}
              label="Wallet name"
            />

            <FormControl className={classes.formControl}>
              <InputLabel className={classes.formControl}>
                Wallet currency
              </InputLabel>
              <Select
                value={symbol}
                onChange={(e) => {
                  const symbol = e.target.value;
                  setSymbol(symbol);
                  setCurrency(currencyLookup[symbol]);
                }}
                className={classes.formControl}
              >
                <MenuItem value={"BTC"}>Bitcoin</MenuItem>
                <MenuItem value={"ETH"}>Ether</MenuItem>
              </Select>
            </FormControl>
            {props.showMultisig && (
              <Fragment>
                <h2 className={classes.subtitle}>
                  Is this a multisig wallet?{" "}
                  <HelpOutlineIcon
                    color="primary"
                    className={classes.subtitleIcon}
                  />
                </h2>
                <Button
                  color={isMultisig ? "primary" : "default"}
                  variant={isMultisig ? "contained" : "outlined"}
                  className={classes.multisigButton}
                  style={{
                    color: isMultisig ? "#000000" : "#898989",
                  }}
                  onClick={() => {
                    addTag("multisig");
                    setIsMultisig(true);
                  }}
                >
                  Yes
                </Button>
                <Button
                  color={isMultisig ? "default" : "primary"}
                  variant={isMultisig ? "outlined" : "contained"}
                  className={classes.multisigButton}
                  style={{
                    color: isMultisig ? "#898989" : "#000000",
                  }}
                  onClick={() => {
                    removeTag("multisig");
                    setIsMultisig(false);
                  }}
                >
                  No
                </Button>

                {isMultisig && (
                  <div className={classes.multisigOwners}>
                    {multisigOwners.map((owner, index) => {
                      return (
                        <MultisigOwner
                          key={index}
                          owner={owner}
                          index={index}
                          multisigOwners={multisigOwners}
                          setMultisigOwners={setMultisigOwners}
                          addMultisigOwner={addMultisigOwner}
                        />
                      );
                    })}
                    <Button
                      color="primary"
                      className={classes.addMultisigOwnerButton}
                      startIcon={<AddIcon />}
                      onClick={addMultisigOwner}
                    >
                      Add Another Wallet Owner
                    </Button>
                  </div>
                )}
              </Fragment>
            )}

            {!addingWallet && (
              <Button
                color="primary"
                variant="contained"
                disabled={false}
                className={classes.addNewWalletButton}
                onClick={addWallet}
              >
                {props.editWallet ? "Edit" : "Add new"} wallet
              </Button>
            )}

            {addingWallet && (
              <div className={classes.addingWallet}>
                <CircularProgress />
              </div>
            )}
          </form>
        </Container>
      </Dialog>
    </div>
  );
}
