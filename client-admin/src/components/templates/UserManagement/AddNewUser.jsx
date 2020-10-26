import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import Divider from "@material-ui/core/Divider";
import GenerateLinkIcon from "../../atoms/Icons/GenerateLinkIcon";
import { copyToClipboard } from "../../../actions";
import { addUser } from "../../../actions";
import ContainedButton from "../../atoms/Button/Contained";
import TextButton from "../../atoms/Button/TextIcon";
import ExpansionList from "../../organisms/ExpansionPanel";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#ffffff",
  },
  formControl: {
    width: "100%",
  },
  select: {
    fontFamily: '"Roboto", sans-serif',
    paddingLeft: 10,
    fontSize: 16,
    lineHeight: 1.69,
    width: "100%",
    paddingBottom: 8,
    "& .MuiSelect-root:focus": {
      backgroundColor: "#ffffff",
    },
  },
  menuitem: {
    fontFamily: '"Roboto", sans-serif',
    fontSize: 16,
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
    },
  },
  filledButton: {
    width: 202,
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
  },
  formItem: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  divider: {
    marginTop: "2em",
    backgroundColor: "#4d4d4d",
  },
  or: {
    position: "absolute",
    textTransform: "uppercase",
    color: "#4d4d4d",
    marginLeft: -22,
    marginTop: 16,
  },
  directLink: {
    fontFamily: '"Roboto",  sans-serif',
    fontSize: 19,
    lineHeight: 1.42,
    color: "#000000",
  },

  verificationCode: {
    paddingTop: 22,
    fontSize: 14,
    margin: 0,
  },
}));

export default function AddNewUser({ setUsers, title, heading }) {
  const classes = useStyles();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [department, setDepartment] = useState("");
  const [isAdmin, setIsAdmin] = useState("");
  const [email, setEmail] = useState("");
  const [siteLink, setSiteLink] = useState(
    "https://juniper.unicef.io/admin/signin?verification="
  );
  const [verificationCode, setVerificationCode] = useState("");

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setDepartment("");
    setIsAdmin("");
    setEmail("");
    setSiteLink("");
    setVerificationCode("");
  };

  return (
    <ExpansionList title={title} heading={heading}>
      <Grid container className={classes.root}>
        <Grid item xs={6} className={classes.formItem}>
          <TextField
            label="First Name"
            value={firstName}
            className={classes.textField}
            InputLabelProps={{
              className: classes.textLabelInput,
            }}
            InputProps={{
              className: classes.textInput,
            }}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={6} className={classes.formItem}>
          <TextField
            label="Last Name"
            value={lastName}
            className={classes.textField}
            InputLabelProps={{
              className: classes.textLabelInput,
            }}
            InputProps={{
              className: classes.textInput,
            }}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
        </Grid>

        <Grid item xs={6} className={classes.formItem}>
          <FormControl className={classes.formControl}>
            <InputLabel id="WorkUnit">Department</InputLabel>
            <Select
              labelId="WorkUnit"
              className={classes.select}
              value={department}
              onChange={(e) => {
                setDepartment(e.target.value);
              }}
            >
              <MenuItem className={classes.menuitem} value={"DFAM"}>
                DFAM
              </MenuItem>
              <MenuItem
                className={classes.menuitem}
                value={"Office of Innovation"}
              >
                Office of Innovation
              </MenuItem>
              <MenuItem className={classes.menuitem} value={"ICTD"}>
                ICTD
              </MenuItem>
              <MenuItem className={classes.menuitem} value={"Operations (OOI)"}>
                Operations (OOI)
              </MenuItem>
              <MenuItem className={classes.menuitem} value={"WASH"}>
                WASH
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} className={classes.formItem}>
          <FormControl className={classes.formControl}>
            <InputLabel id="AccessLevel">Access level</InputLabel>
            <Select
              labelId="AccessLevel"
              className={classes.select}
              value={isAdmin}
              onChange={(e) => {
                if (e.target.value) {
                  setIsAdmin(true);
                } else {
                  setIsAdmin(false);
                }
              }}
            >
              <MenuItem className={classes.menuitem} value={true}>
                Administrator (editing permissions)
              </MenuItem>
              <MenuItem className={classes.menuitem} value={false}>
                General (view only permission)
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} className={classes.formItem}>
          <TextField
            label="UNICEF email id"
            value={email}
            className={classes.textField}
            InputLabelProps={{
              className: classes.textLabelInput,
            }}
            InputProps={{
              className: classes.textInput,
            }}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12} className={classes.formItem}>
          <ContainedButton
            onClick={async () => {
              const users = await addUser({
                firstName,
                lastName,
                department,
                isAdmin,
                email,
                notifications: isAdmin,
                userAdded: isAdmin,
                newTransaction: isAdmin,
                transactionTagged: isAdmin,
              });

              setUsers(users);
              resetForm();
            }}
            style={{ width: 202, marginTop: 19, paddingLeft: 15 }}
          >
            Send Invite
          </ContainedButton>
        </Grid>
        <Grid item xs={6} className={classes.formItem}>
          <Divider className={classes.divider} />
        </Grid>
        <Grid item xs={6} className={classes.formItem}>
          <p className={classes.or}>or</p>
          <Divider className={classes.divider} />
        </Grid>
        <Grid item xs={12} className={classes.formItem}>
          <p className={classes.directLink}>
            Send a link to the user directly. Clicking on the link would
            activate their account.
          </p>
        </Grid>
        <Grid item xs={12} className={classes.formItem}>
          <TextButton
            startIcon={<GenerateLinkIcon style={{ marginTop: 6 }} />}
            onClick={async () => {
              if (verificationCode) {
                copyToClipboard(`${siteLink}${verificationCode}`);
              } else {
                const users = await addUser({
                  firstName,
                  lastName,
                  department,
                  isAdmin,
                  email,
                  notifications: isAdmin,
                  userAdded: isAdmin,
                  newTransaction: isAdmin,
                  transactionTagged: isAdmin,
                });
                const u = users.filter((u) => {
                  return u.email === email;
                })[0];

                setVerificationCode(u.verificationCode);
                copyToClipboard(`${siteLink}${u.verificationCode}`);
                setUsers(users);
                resetForm();
              }
            }}
          >
            Generate Invite Link
          </TextButton>
        </Grid>
      </Grid>
    </ExpansionList>
  );
}
