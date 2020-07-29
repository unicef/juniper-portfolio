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
    "&.MuiFormLabel-root.Mui-error": {
      color: "#ef6161",
    },
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

function SignInForm(props) {
  const classes = useStyles();
  return (
    <Fragment>
      <TextField
        value={props.email}
        error={props.signInError}
        label="Registered email id"
        className={classes.textField}
        InputLabelProps={{
          error: props.signInError,
          className: classes.textLabelInput,
        }}
        InputProps={{
          className: classes.textInput,
        }}
        onChange={(e) => {
          props.setSignInError(false);
          props.setEmail(e.target.value);
        }}
      />

      <TextField
        value={props.password}
        error={props.signInError}
        label="Password"
        type="password"
        className={classes.textField}
        InputLabelProps={{
          error: props.signInError,
          className: classes.textLabelInput,
        }}
        InputProps={{
          className: classes.textInput,
        }}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            props.login();
          }
        }}
        onChange={(e) => {
          props.setSignInError(false);
          props.setPassword(e.target.value);
        }}
      />
      <p className={classes.subtext} onClick={props.forgotPasswordClick}>
        Forgot Password?
      </p>
      <Button
        className={classes.filledButton}
        variant="contained"
        color="primary"
        onClick={props.login}
      >
        Sign In
      </Button>
    </Fragment>
  );
}

function ForgotPassword(props) {
  const classes = useStyles();
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
        onClick={props.resetPasswordClick}
      >
        Reset Password
      </Button>
    </Fragment>
  );
}

function ResetPasswordSent(props) {
  const classes = useStyles();
  return (
    <Button
      className={classes.filledButton}
      variant="contained"
      color="primary"
      onClick={props.goToSignInPageClick}
    >
      Go To Sign In Page
    </Button>
  );
}

export default function SignIn(props) {
  const classes = useStyles();
  const [signIn, setSignIn] = useState(true);
  const [signInError, setSignInError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [forgotPassword, setForgotPassword] = useState(false);
  const [resetPasswordSent, setResetPasswordSent] = useState(false);
  const [subtitle, setSubtitle] = useState(
    "Welcome to Juniper! Sign in to your account."
  );

  const login = async () => {
    let res;
    try {
      res = await fetch(`/rest/admin/login`, {
        credentials: "include",
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (e) {
      console.log(e);
      return;
    }

    if (res.status === 403) {
      // set login error
      setSignInError(true);
      setSubtitle("Oops! the provided password or email is incorrect.");
    } else if (res.status === 200) {
      // success
      const user = await res.json();
      props.loginUser(user);
    }
  };

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
        <h2
          className={classes.subtitle}
          style={signInError ? { color: "#ef6161" } : {}}
        >
          {subtitle}
        </h2>

        {signIn && (
          <SignInForm
            email={email}
            setEmail={setEmail}
            setPassword={setPassword}
            forgotPasswordClick={forgotPasswordClick}
            login={login}
            signInError={signInError}
            setSignInError={setSignInError}
          />
        )}

        {forgotPassword && (
          <ForgotPassword resetPasswordClick={resetPasswordClick} />
        )}

        {resetPasswordSent && (
          <ResetPasswordSent goToSignInPageClick={goToSignInPageClick} />
        )}
        <img src={logo} className={classes.logo} />
      </Drawer>
      <main className={classes.content}></main>
    </div>
  );
}
