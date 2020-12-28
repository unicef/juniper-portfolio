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
import UploadIcon from "../../atoms/Icons/UploadIcon";
import AddIcon from "@material-ui/icons/Add";
import FileUpload from "../../atoms/FileUpload";
import TextButton from "../../atoms/Button/TextIcon";
import ContainedButton from "../../atoms/Button/Contained";
import countries from "./countries.jsx";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { createFilterOptions } from "@material-ui/lab/Autocomplete";

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
    color: theme.palette.primary.main,
  },
  addPayeeButton: {
    marginTop: "3em",
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
  addingPayee: {
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
    color: theme.palette.primary.main,
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

export default function CreatePayee(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [addingPayee, setAddingPayee] = useState(false);

  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [country, setCountry] = useState("");
  const [description, setDescription] = useState("");
  const [weblink, setWeblink] = useState("");
  const [image, setImage] = useState(
    "/image/1595615783349-imageplaceholder.png"
  );
  const [addresses, setAddresses] = useState([
    {
      address: "",
      currency: "",
      amount: 0,
    },
  ]);

  const addAddress = () => {
    const newAddresses = addresses.slice();
    newAddresses.push({
      address: "",
      currency: "",
      amount: 0,
    });
    setAddresses(newAddresses);
  };

  const handleClose = () => {
    if (props.onDialogClose) {
      props.onDialogClose();
    }
    setOpen(false);
  };

  const createPayee = async () => {
    const account = {
      name,
      type,
      country,
      description,
      weblink,
      image,
      addresses,
      active: true,
    };
    setAddingPayee(true);

    try {
      await fetch(`/rest/admin/accounts`, {
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
    setImage("/image/1595615783349-imageplaceholder.png");
    setAddresses([
      {
        address: "",
        currency: "",
        amount: 0,
      },
    ]);

    if (props.onDialogClose) {
      console.log(props.onDialogClose);
      props.onDialogClose(account);
    }

    setAddingPayee(false);
    handleClose();
  };

  useEffect(() => {
    setOpen(props.open);
    setType(props.type);

    setName(props.name || "");
    setCountry(props.country || "");
    setDescription(props.description || "");
    setWeblink(props.weblink || "");
    setImage(props.image || "/image/1595615783349-imageplaceholder.png");
    setAddresses(
      props.addresses || [
        {
          address: "",
          currency: "",
          amount: 0,
        },
      ]
    );
  }, [props.open]);

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
        <Container maxWidth={"sm"} className={classes.container}>
          <h1 className={classes.title}>
            {props.edit ? "Edit" : "Create"} {type} account
          </h1>
          <form className={classes.form}>
            <TextField
              disabled={props.edit}
              value={name}
              className={classes.formControl}
              InputLabelProps={{ className: classes.label }}
              InputProps={{
                className: classes.formControl,
              }}
              onChange={(e) => {
                setName(e.target.value);
              }}
              label={`${type.charAt(0).toUpperCase() + type.slice(1)} name`}
            />
            {type === "payee" && (
              <Fragment>
                <FormControl className={classes.formControl}>
                  <Autocomplete
                    autoHighlight
                    options={countries}
                    getOptionLabel={(option) => option.name}
                    filterOptions={createFilterOptions({
                      matchFrom: "start",
                      stringify: (option) => option.name,
                    })}
                    onChange={(e, value) => {
                      if (value) {
                        setCountry(value.name);
                      }
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Country"
                        InputLabelProps={{ className: classes.label }}
                        inputProps={{
                          ...params.inputProps,
                          className: classes.formControl,
                          style: { marginBottom: 0 },
                        }}
                      />
                    )}
                  />
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
                  label="Public website"
                />

                <Grid container>
                  <Grid item xs={6}>
                    <img src={image} className={classes.image} alt="Account" />
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
                        setImage(json.imageUrl);
                      }}
                    >
                      <TextButton startIcon={<UploadIcon />}>
                        Upload Image
                      </TextButton>
                    </FileUpload>
                  </Grid>
                </Grid>
              </Fragment>
            )}
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
                        address={address.address}
                      />
                    );
                  })}
                  <TextButton
                    disabled={
                      addresses.length > 0 &&
                      addresses[addresses.length - 1].address === ""
                    }
                    startIcon={<AddIcon />}
                    onClick={addAddress}
                  >
                    Add Another Wallet
                  </TextButton>
                </div>
              </Grid>
            </Grid>

            {!addingPayee && (
              <div className={classes.addPayeeButton}>
                <ContainedButton
                  onClick={createPayee}
                  style={{ display: "block", width: "100%" }}
                >
                  {props.edit ? "Edit" : "Create"} Account
                </ContainedButton>
              </div>
            )}

            {addingPayee && (
              <div className={classes.addingPayee}>
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
            defaultValue={props.address}
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
      </Grid>
    </Fragment>
  );
}
