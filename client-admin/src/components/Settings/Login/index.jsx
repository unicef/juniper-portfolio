import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  root: {},
  textField: {
    marginBottom: 16,
    width: "100%",
  },
  textLabelInput: {
    height: 40,
    fontSize: 16,
    lineHeight: 1.5,
    "&.MuiInputLabel-shrink": {
      textTransform: "uppercase",
      color: "#000000",
      letterSpacing: 0.83,
    },
  },
  textInput: {
    fontFamily: '"Roboto",  sans-serif',
    height: 40,
    fontSize: 16,
    lineHeight: 1.5,
    letterSpacing: "normal",
    color: "#898989",
  },
  messageBox: {
    paddingLeft: 100,
    paddingRight: 30,
  },
  passwordMessage: {
    width: 320,
    fontFamily: '"Roboto",  sans-serif',
    fontSize: 14,
    color: "#898989",
    lineHeight: 1.57,
  },
  errorMessage: {
    color: "#ffffff",
    fontSize: 14,
    backgroundColor: "#ff8080",
    borderRadius: 5,
    padding: "11px 16px 11px 16px",
  },
  changePasswordButton: {
    width: "100%",
    height: 35,
    fontFamily: '"Cabin", sans-serif',
    letterSpacing: 1,
    fontSize: 12,
    fontWeight: 700,
    textAlign: "center",
    color: "#ffffff",
    boxShadow: "none",
    marginTop: 17,
  },
});

export default function SettingsLogin() {
  const classes = useStyles();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(true);
  const [errorMessage, setErrorMessage] = useState(
    "The new password does not meet the above requirement"
  );

  return (
    <Grid container className={classes.root}>
      <Grid item xs={6}>
        <form>
          <TextField
            label="Current Password"
            className={classes.textField}
            InputLabelProps={{
              className: classes.textLabelInput,
            }}
            InputProps={{
              className: classes.textInput,
            }}
            type="password"
            onChange={(e) => {
              console.log(e.target.value);
              setCurrentPassword(e.target.value);
            }}
          />
          <TextField
            label="New Password"
            className={classes.textField}
            InputLabelProps={{
              className: classes.textLabelInput,
            }}
            InputProps={{
              className: classes.textInput,
            }}
            type="password"
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
          />
          <TextField
            label="Re-Enter New Password"
            className={classes.textField}
            InputLabelProps={{
              className: classes.textLabelInput,
            }}
            InputProps={{
              className: classes.textInput,
            }}
            type="password"
            value={newPassword2}
            onChange={(e) => {
              setNewPassword2(e.target.value);
            }}
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.changePasswordButton}
            disabled={true}
          >
            Change Password
          </Button>
        </form>
      </Grid>
      <Grid item xs={6} className={classes.messageBox}>
        <p className={classes.passwordMessage}>
          Your password has to be at least 8 characters long. Must contain at
          least one lower case letter, one upper case letter, one digit and one
          special character ~!@#$%^&*()_+
        </p>
        {showErrorMessage && (
          <div className={classes.errorMessage}>{errorMessage}</div>
        )}
      </Grid>
    </Grid>
  );
}
