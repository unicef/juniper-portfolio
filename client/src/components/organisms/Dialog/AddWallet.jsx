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
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import AddIcon from "@material-ui/icons/Add";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextButton from "../../atoms/Button/TextIcon";
import ContainedButton from "../../atoms/Button/Contained";
import validate from "bitcoin-address-validation";

const web3Utils = require("web3-utils");

const currencyLookup = {
  BTC: "Bitcoin",
  ETH: "Ethereum",
};

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
    color: theme.palette.primary.main,
  },
  addNewWalletButton: {
    marginTop: "3em",
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
  const [formErrors, setFormErrors] = useState({});
  const [address, setAddress] = useState("");
  const [tags, setTags] = useState([]);
  const [name, setName] = useState(null);
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
    if (multisigOwners[multisigOwners.length - 1].walletAddress === "") return;

    const newOwners = multisigOwners.slice();

    newOwners.push({
      walletAddress: "",
      ownerName: "",
    });
    setMultisigOwners(newOwners);
  };

  const disableSubmit = () => {
    switch (currency) {
      case "Ethereum":
        // Validate wallet address
        if (!web3Utils.isAddress(address)) {
          return true;
        }
        if (isMultisig) {
          for (const index in multisigOwners) {
            const owner = multisigOwners[index];

            if (!web3Utils.isAddress(owner.walletAddress)) {
              return true;
            }
          }
        }
        break;
      case "Bitcoin":
        // Validate wallet address
        if (!validate(address)) {
          return true;
        }
        if (isMultisig) {
          for (const index in multisigOwners) {
            const owner = multisigOwners[index];

            if (!validate(owner.walletAddress)) {
              return true;
            }
          }
        }
        break;
      default:
    }
    if (name === null || name.length === 0) {
      return true;
    }
    return false;
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

    let url;
    if (isTracked) {
      url = `/rest/admin/wallets/track`;
    } else {
      url = `/rest/admin/wallets`;
    }

    try {
      await fetch(url, {
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
    setName(null);
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
    setName(props.name || null);
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
          <h1 className={classes.title}>
            {props.editWallet ? "Edit" : "Add new"} wallet
          </h1>
          <form className={classes.form}>
            <TextField
              disabled={props.editWallet}
              value={address}
              error={
                (currency === "Ethereum"
                  ? !web3Utils.isAddress(address)
                  : !validate(address)) && address.length > 0
              }
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
              error={name !== null && name.length === 0}
              className={classes.formControl}
              InputLabelProps={{ className: classes.label }}
              InputProps={{
                className: classes.formControl,
              }}
              onChange={(e) => {
                setName(e.target.value.slice(0, 34));
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
                  <Tooltip
                    placement="right-start"
                    title="Multisignature wallets (or multisig, for short), are cryptocurrency wallets that require two or more wallets to sign and send a transaction."
                  >
                    <HelpOutlineIcon
                      color="primary"
                      className={classes.subtitleIcon}
                    />
                  </Tooltip>
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
                    <TextButton
                      disabled={
                        multisigOwners[multisigOwners.length - 1]
                          .walletAddress === ""
                      }
                      startIcon={<AddIcon />}
                      onClick={addMultisigOwner}
                    >
                      Add Another Wallet Owner
                    </TextButton>
                  </div>
                )}
              </Fragment>
            )}

            {!addingWallet && (
              <div className={classes.addNewWalletButton}>
                <ContainedButton
                  disabled={disableSubmit()}
                  onClick={addWallet}
                  style={{ display: "block", width: "100%" }}
                >
                  {props.editWallet ? "Edit" : "Add new"} wallet
                </ContainedButton>
              </div>
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
