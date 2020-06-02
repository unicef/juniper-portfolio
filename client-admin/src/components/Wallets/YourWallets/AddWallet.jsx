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
        label={`Owner ${props.index || 0 + 1} wallet address`}
      />
      <TextField
        className={classes.formControl}
        InputLabelProps={{
          className: classes.label,
        }}
        InputProps={{
          className: classes.formControl,
        }}
        label={`Owner ${props.index || 0 + 1} name (optional)`}
        style={{ marginBottom: 0 }}
      />
    </Fragment>
  );
}

export default function AddWallet(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [isMultisig, setIsMultisig] = useState(false);
  const [multisigOwners, setMultisigOwners] = useState([
    {
      walletAddress: null,
      ownerName: null,
    },
  ]);
  const handleClose = () => {
    if (props.setShowAddWalletModal) {
      props.setShowAddWalletModal(false);
    }
    setOpen(false);
  };

  const addMultisigOwner = () => {
    const newOwners = multisigOwners.slice();
    newOwners.push({
      walletAddress: null,
      ownerName: null,
    });
    setMultisigOwners(newOwners);
    console.log(multisigOwners);
  };

  useEffect(() => {
    setOpen(props.open);
  }, [props.open, multisigOwners]);

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
          <h1 className={classes.title}>Add new wallet</h1>
          <form className={classes.form}>
            <TextField
              required
              className={classes.formControl}
              InputLabelProps={{ className: classes.label }}
              InputProps={{
                className: classes.formControl,
              }}
              label="Wallet address"
            />

            <TextField
              required
              className={classes.formControl}
              InputLabelProps={{ className: classes.label }}
              InputProps={{
                className: classes.formControl,
              }}
              label="Wallet name"
            />

            <FormControl className={classes.formControl}>
              <InputLabel className={classes.formControl}>
                Wallet currency
              </InputLabel>
              <Select onChange={() => {}} className={classes.formControl}>
                <MenuItem value={"BTC"}>Bitcoin</MenuItem>
                <MenuItem value={"ETH"}>Ether</MenuItem>
              </Select>
            </FormControl>
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
                      owner={owner}
                      index={index}
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

            <Button
              color="primary"
              variant="contained"
              disabled={false}
              className={classes.addNewWalletButton}
            >
              Add New Wallet
            </Button>
          </form>
        </Container>
      </Dialog>
    </div>
  );
}
