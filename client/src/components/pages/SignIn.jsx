import React, { useState, useEffect, Fragment } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import logo from "./logo.png";
import { ChevronRight } from "@material-ui/icons";
import ContainedButton from "../atoms/Button/Contained";
import TextButton from "../atoms/Button/TextIcon";
import image from "./Signin.svg";

const PasswordTooltip = withStyles((theme) => ({
  tooltip: {
    fontFamily: '"Roboto",  sans-serif',
    fontSize: 14,
    lineHeight: 1.64,
    padding: 15,
    maxWidth: 330,
    backgroundColor: "#898989",
  },
}))(Tooltip);

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
    backgroundImage: `url("${image}")`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
  heading: {
    fontFamily: '"Cabin",  sans-serif',
    fontSize: 36,
    fontWeight: 700,
    color: theme.palette.primary.main,
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
    color: theme.palette.primary.main,
    letterSpacing: 1,
    textTransform: "uppercase",
    cursor: "pointer",
    marginTop: 4,
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
      <p className={classes.subtext}>
        <TextButton onClick={props.forgotPasswordClick}>
          Forgot Password?
        </TextButton>
      </p>
      <ContainedButton onClick={props.login}>Sign In</ContainedButton>
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
      <ContainedButton onClick={props.resetPasswordClick}>
        Reset Password
      </ContainedButton>
    </Fragment>
  );
}

function Verification(props) {
  const classes = useStyles();
  return (
    <Fragment>
      <TextField
        value={props.newPassword}
        error={props.signInError}
        label="Create password"
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
          }
        }}
        onChange={(e) => {
          props.setSignInError(false);
          props.setNewPassword(e.target.value);
        }}
      />
      <TextField
        value={props.newPassword2}
        error={props.signInError}
        label="Re-enter password"
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
          }
        }}
        onChange={(e) => {
          props.setSignInError(false);
          props.setNewPassword2(e.target.value);
        }}
      />
      <PasswordTooltip
        arrow
        placement="right"
        title="Your password has to be at least 8 characters long. Must contain at least one lower case letter, one upper case letter, one digit and one special character ~!@#$%^&*()_+"
      >
        <div
          className={classes.subtext}
          onClick={props.forgotPasswordClick}
          style={{ position: "relative" }}
        >
          <span>View Password Requirements</span>
          <ChevronRight
            size="small"
            style={{ position: "absolute", top: -1 }}
          />
        </div>
      </PasswordTooltip>
      <ContainedButton
        style={{ marginTop: 42 }}
        onClick={props.createAccountClick}
      >
        Create Account
      </ContainedButton>
    </Fragment>
  );
}

function ResetPasswordSent(props) {
  const classes = useStyles();
  return (
    <ContainedButton onClick={props.goToSignInPageClick}>
      Go To Sign In Page
    </ContainedButton>
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
  const [verification, setVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [newPassword2, setNewPassword2] = useState("");

  const [subtitle, setSubtitle] = useState(
    "Welcome to Juniper! Sign in to your account."
  );

  const login = async () => {
    let res;
    try {
      res = await fetch(`/rest/admin/auth/login`, {
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

    if (res.status === 400 || res.status === 401) {
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
    setVerification(false);
  };

  const validatePassword = () => {
    let newPWMatch = false;
    let hasUpper = /[A-Z]/.test(newPassword);
    let hasLower = /[a-z]/.test(newPassword);
    let hasNumbers = /\d/.test(newPassword);
    let hasSpecial = /\W/.test(newPassword);
    let hwPWLength = newPassword.length >= 8;

    //hasNumbers = /\d/.test(password);
    if (newPassword === newPassword2) {
      newPWMatch = true;
    } else {
      setSignInError(true);
      setSubtitle("Oops! the entered passwords do not match. ");
      return false;
    }

    if (
      newPWMatch &&
      hasUpper &&
      hasLower &&
      hasNumbers &&
      hasSpecial &&
      hwPWLength
    ) {
      setSignInError(false);
      return true;
    }

    setSubtitle("Oops! the password does not match the security requirement.");
    setSignInError(true);

    return false;
  };

  const createAccountClick = async () => {
    if (validatePassword()) {
      try {
        await fetch(`/rest/verification`, {
          credentials: "include",
          method: "POST",
          body: JSON.stringify({
            verificationCode,
            newPassword,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
      } catch (e) {
        console.log(e);
      }
      setVerification("");
      setSignIn(true);
      setSubtitle(
        "Welcome to Juniper! Your account has been successfully created."
      );
    }
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

  const showVerification = () => {
    resetState();
    setVerification(true);
    setSubtitle("To complete Sign up, please create an account password.");
  };

  useEffect(() => {
    const checkVerification = async (code) => {
      let res;
      try {
        res = await fetch(`/rest/verification/${code}`);
      } catch (e) {
        console.log(e);
      }
      if (res.status === 200) {
        setVerificationCode(verificationCode);
        showVerification();
      }
    };

    const params = window.location.search;
    let verificationCode = false;
    if (params.indexOf("verification") >= 0) {
      verificationCode = params.split("verification=")[1].split("&")[0];

      checkVerification(verificationCode);
    }
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

        {verification && (
          <Verification
            newPassword={newPassword}
            newPassword2={newPassword2}
            signInError={signInError}
            setNewPassword={setNewPassword}
            setNewPassword2={setNewPassword2}
            setSignInError={setSignInError}
            createAccountClick={createAccountClick}
          />
        )}
        <img src={logo} className={classes.logo} alt={"logo"} />
      </Drawer>
      <main className={classes.content}></main>
    </div>
  );
}
