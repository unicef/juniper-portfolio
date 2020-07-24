import React, { useState, useEffect, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
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
import CircularProgress from "@material-ui/core/CircularProgress";
import UploadIcon from "../Icons/UploadIcon";
import AddIcon from "@material-ui/icons/Add";
import FileUpload from "../../components/FileUpload";

import countries from "./countries.jsx";

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
  container: {
    marginBottom: "2em",
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
  addStartupButton: {
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
  walletDetails: {
    marginTop: "2em",
  },
  addMultisigOwnerButton: {
    fontFamily: '"Cabin",  sans-serif',
    padding: 0,
    textTransform: "uppercase",
    fontSize: 12,
    fontWeight: 700,
  },
  addingStartup: {
    marginTop: "1em",
    textAlign: "center",
  },
  image: {
    width: 234,
    height: 133,
    borderRadius: 2,
  },
  imageTitle: {
    fontFamily: '"IBM Plex Sans",  sans-serif',
    fontSize: 22,
    marginTop: 0,
    fontWeight: 400,
    marginBottom: 0,
  },
  imageText: {
    fontFamily: '"IBM Plex Sans",  sans-serif',
    fontSize: 12,
    marginTop: 0,
  },
  imageButton: {
    marginTop: "2em",
    color: "#00aeef",
    fontWeight: 700,
    fontSize: 12,
    "& .MuiButton-startIcon": {
      marginRight: 0,
    },
  },
  addressDetailsTitle: {
    fontFamily: '"Cabin",  sans-serif',
    fontSize: 14,
    color: "#898989",
    fontWeight: 700,
    textTransform: "uppercase",
    lineHeight: 2,
    letterSpacing: 0.78,
  },
}));

export default function CreateStartup(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [addingStartup, setAddingStartup] = useState(false);

  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [description, setDescription] = useState("");
  const [weblink, setWeblink] = useState("");
  const [image, setImage] = useState(
    "/image/1595615783349-imageplaceholder.png"
  );
  const [addresses, setAddresses] = useState([
    {
      walletAddress: "",
      currency: "",
      amount: "",
    },
  ]);

  const addAddress = () => {
    const newAddresses = addresses.slice();
    newAddresses.push({
      walletAddress: "",
      currency: "",
      amount: "",
    });
    setAddresses(newAddresses);
  };

  const handleClose = () => {
    if (props.onDialogClose) {
      props.onDialogClose();
    }
    setOpen(false);
  };

  const createStartup = async () => {
    const account = {
      name,
      type: "startup",
      country,
      description,
      weblink,
      image,
      addresses,
      active: true,
    };
    setAddingStartup(true);

    try {
      await fetch(`/rest/admin/account`, {
        credentials: "include",
        method: "POST",
        body: JSON.stringify({
          account,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (e) {
      return console.log(e);
    }

    setName("");
    setCountry("");
    setDescription("");
    setWeblink("");
    setImage("");
    setAddresses([
      {
        walletAddress: "",
        currency: "",
        amount: "",
      },
    ]);

    if (props.onDialogClose) {
      props.onDialogClose();
    }

    setAddingStartup(false);
    handleClose();
  };

  useEffect(() => {
    setOpen(props.open);
  }, [props.open]);

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
        <Container maxWidth={"sm"} className={classes.container}>
          <h1 className={classes.title}>Create Startup Account</h1>
          <form className={classes.form}>
            <TextField
              disabled={props.editWallet}
              value={name}
              className={classes.formControl}
              InputLabelProps={{ className: classes.label }}
              InputProps={{
                className: classes.formControl,
              }}
              onChange={(e) => {
                setName(e.target.value);
              }}
              label="Startup Name"
            />

            <FormControl className={classes.formControl}>
              <InputLabel className={classes.formControl}>Country</InputLabel>
              <Select
                value={country}
                onChange={(e) => {
                  const country = e.target.value;
                  setCountry(country);
                }}
                className={classes.formControl}
              >
                {countries.map((country) => {
                  return (
                    <MenuItem key={country.code} value={country.name}>
                      {country.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>

            <TextField
              value={description}
              className={classes.formControl}
              InputLabelProps={{ className: classes.label }}
              InputProps={{
                className: classes.formControl,
              }}
              onChange={(e) => {
                setDescription(e.target.value.substring(0, 99));
              }}
              label="Brief description (Up to 100 characters)"
            />

            <TextField
              value={weblink}
              className={classes.formControl}
              InputLabelProps={{ className: classes.label }}
              InputProps={{
                className: classes.formControl,
              }}
              onChange={(e) => {
                setWeblink(e.target.value);
              }}
              label="External Weblink"
            />

            <Grid container>
              <Grid item xs={6}>
                <img src={image} className={classes.image} />
              </Grid>
              <Grid item xs={6}>
                <h2 className={classes.imageTitle}>Upload cover image</h2>
                <p className={classes.imageText}>
                  Minimum image dimensions are 1500x1024 Maximum image size
                  should be 2MB
                </p>
                <FileUpload
                  url={"/upload/image"}
                  afterUpload={(json) => {
                    console.log(json);
                    setImage(json.imageUrl);
                  }}
                >
                  <Button
                    className={classes.imageButton}
                    startIcon={<UploadIcon />}
                    onClick={() => {}}
                  >
                    Upload Image
                  </Button>
                </FileUpload>
              </Grid>
            </Grid>

            <Grid container>
              <Grid item xs={12}>
                <div className={classes.walletDetails}>
                  {addresses.map((address, index) => {
                    return (
                      <AddressDetails
                        key={index}
                        currency={address.currency}
                        addresses={addresses}
                        amount={address.amount}
                        setAddresses={setAddresses}
                        index={index}
                      />
                    );
                  })}
                  <Button
                    color="primary"
                    className={classes.addMultisigOwnerButton}
                    startIcon={<AddIcon />}
                    onClick={addAddress}
                  >
                    Add Another Wallet Wallet
                  </Button>
                </div>
              </Grid>
            </Grid>

            {!addingStartup && (
              <Button
                color="primary"
                variant="contained"
                disabled={false}
                className={classes.addStartupButton}
                onClick={createStartup}
              >
                {props.editWallet ? "Edit" : "Create"} Account
              </Button>
            )}

            {addingStartup && (
              <div className={classes.addingStartup}>
                <CircularProgress />
              </div>
            )}
          </form>
        </Container>
      </Dialog>
    </div>
  );
}

function AddressDetails(props) {
  const classes = useStyles();

  return (
    <Fragment>
      <Grid container>
        <Grid item xs={12}>
          <h3 className={classes.addressDetailsTitle}>
            Wallet {props.index + 1} Details
          </h3>
        </Grid>
        <Grid item xs={12}>
          <TextField
            className={classes.formControl}
            InputLabelProps={{ className: classes.label }}
            InputProps={{
              className: classes.formControl,
            }}
            label={`Wallet address`}
            value={props.address}
            onChange={(e) => {
              const newAddresses = props.addresses.slice();
              newAddresses[props.index].address = e.target.value;
              props.setAddresses(newAddresses);
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <FormControl className={classes.formControl} style={{ width: 230 }}>
            <InputLabel className={classes.formControl}>Currency</InputLabel>
            <Select
              value={props.currency}
              onChange={(e) => {
                const newAddresses = props.addresses.slice();
                newAddresses[props.index].currency = e.target.value;
                props.setAddresses(newAddresses);
              }}
              className={classes.formControl}
            >
              <MenuItem key="Ether" value="Ether">
                Ether
              </MenuItem>
              <MenuItem key="Bitcoin" value="Bitcoin">
                Bitcoin
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <TextField
            className={classes.formControl}
            InputLabelProps={{
              className: classes.label,
            }}
            InputProps={{
              className: classes.formControl,
            }}
            label={`Amount Invested`}
            style={{ marginBottom: 0 }}
            value={props.amount}
            onChange={(e) => {
              const newAddresses = props.addresses.slice();
              newAddresses[props.index].amount = e.target.value;
              props.setAddresses(newAddresses);
            }}
          />
        </Grid>
      </Grid>
    </Fragment>
  );
}
