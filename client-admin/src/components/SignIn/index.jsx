import React, { useState, useEffect, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import logo from "./logo.png";

const drawerWidth = 392;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: "100%",
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    paddingLeft: 48,
    paddingRight: 65,
    paddingTop: 30,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    width: "100%",
    backgroundColor: "#c2ecfb",
    padding: theme.spacing(3),
  },
  heading: {
    fontFamily: '"Cabin",  sans-serif',
    fontSize: 36,
    fontWeight: 700,
    color: "#00aeef",
    margin: 0,
    marginBottom: 100,
  },
  subtitle: {
    fontFamily: '"Roboto",  sans-serif',
    fontSize: 28,
    fontWeight: 700,
    lineHeight: 1.14,
    marginBottom: 10,
    height: 155,
  },
  textField: {
    marginBottom: 16,
    width: "100%",
  },
  textLabelInput: {
    fontFamily: '"Roboto",  sans-serif',
    color: "#898989",
    height: 40,
    fontSize: 19,
    lineHeight: 1.5,
    "&.MuiInputLabel-shrink": {
      textTransform: "uppercase",
      fontSize: 12,
      fontWeight: 700,
      color: "#000000",
      letterSpacing: 0.83,
    },
  },
  textInput: {
    fontFamily: '"Roboto",  sans-serif',
    color: "#000000",
    height: 40,
    fontSize: 19,
    lineHeight: 1.5,
    letterSpacing: "normal",
  },
  subtext: {
    fontFamily: '"Cabin",  sans-serif',
    fontSize: 12,
    fontWeight: 700,
    color: "#00aeef",
    letterSpacing: 1,
    textTransform: "uppercase",
    cursor: "pointer",
    marginTop: 4,
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
    marginTop: 19,
    paddingLeft: 15,
  },
  logo: {
    marginTop: "auto",
    marginBottom: 30,
    height: 45,
    width: 220,
  },
}));

export default function PermanentDrawerLeft() {
  const classes = useStyles();
  const [signIn, setSignIn] = useState(true);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [resetPasswordSent, setResetPasswordSent] = useState(false);
  const [subtitle, setSubtitle] = useState(
    "Welcome to Juniper! Sign in to your account."
  );

  const resetState = () => {
    setSignIn(false);
    setResetPasswordSent(false);
    setForgotPassword(false);
  };
  const forgotPasswordClick = () => {
    resetState();
    setForgotPassword(true);
    setSubtitle(
      "Please provide us with your registered email and we will send you a password reset link"
    );
  };

  const resetPasswordClick = () => {
    resetState();
    setResetPasswordSent(true);
    setSubtitle(
      "We have sent you a password reset link to the provided email id."
    );
  };

  const goToSignInPageClick = () => {
    resetState();
    setSignIn(true);
    setSubtitle("Welcome to Juniper! Sign in to your account.");
  };

  function SignIn() {
    return (
      <Fragment>
        <TextField
          label="Registered email id"
          className={classes.textField}
          InputLabelProps={{
            className: classes.textLabelInput,
          }}
          InputProps={{
            className: classes.textInput,
          }}
          onChange={(e) => {
            console.log(e.target.value);
          }}
        />

        <TextField
          label="Password"
          type="password"
          className={classes.textField}
          InputLabelProps={{
            className: classes.textLabelInput,
          }}
          InputProps={{
            className: classes.textInput,
          }}
          onChange={(e) => {
            console.log(e.target.value);
          }}
        />
        <p className={classes.subtext} onClick={forgotPasswordClick}>
          Forgot Password?
        </p>
        <Button
          className={classes.filledButton}
          variant="contained"
          color="primary"
        >
          Sign In
        </Button>
      </Fragment>
    );
  }

  function ForgotPassword() {
    return (
      <Fragment>
        <TextField
          label="Registered email id"
          className={classes.textField}
          InputLabelProps={{
            className: classes.textLabelInput,
          }}
          InputProps={{
            className: classes.textInput,
          }}
          onChange={(e) => {
            console.log(e.target.value);
          }}
        />
        <Button
          className={classes.filledButton}
          variant="contained"
          color="primary"
          onClick={resetPasswordClick}
        >
          Reset Password
        </Button>
      </Fragment>
    );
  }

  function ResetPasswordSent() {
    return (
      <Button
        className={classes.filledButton}
        variant="contained"
        color="primary"
        onClick={goToSignInPageClick}
      >
        Go To Sign In Page
      </Button>
    );
  }

  useEffect(() => {
    const params = window.location.search;
    let verification = false;
    if (params.indexOf("verification") >= 0) {
      verification = params.split("verification=")[1].split("&")[0];
    }
    console.log(params);
    console.log(verification);
    // Validate verification Id
  }, []);

  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <h1 className={classes.heading}>Juniper</h1>
        <h2 className={classes.subtitle}>{subtitle}</h2>

        {signIn && <SignIn />}

        {forgotPassword && <ForgotPassword />}

        {resetPasswordSent && <ResetPasswordSent />}
        <img src={logo} className={classes.logo} />
      </Drawer>
      <main className={classes.content}></main>
    </div>
  );
}
