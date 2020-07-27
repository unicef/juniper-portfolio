import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";

const useStyles = makeStyles({
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
      backgroundColor: "#daf5ff",
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
  formitem: {
    paddingLeft: 15,
    paddingRight: 15,
  },
});

export default function AddNewUser() {
  const classes = useStyles();
  const [workUnit, setWorkUnit] = useState("");
  const [accessLevel, setAccessLevel] = useState("");

  return (
    <Grid container className={classes.root}>
      <Grid item xs={6} className={classes.formitem}>
        <TextField
          label="First Name"
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
      </Grid>
      <Grid item xs={6} className={classes.formitem}>
        <TextField
          label="Last Name"
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
      </Grid>

      <Grid item xs={6} className={classes.formitem}>
        <FormControl className={classes.formControl}>
          <InputLabel id="WorkUnit">Department</InputLabel>
          <Select
            labelId="WorkUnit"
            className={classes.select}
            value={workUnit}
            onChange={(e) => {
              setWorkUnit(e.target.value);
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
      <Grid item xs={6} className={classes.formitem}>
        <FormControl className={classes.formControl}>
          <InputLabel id="AccessLevel">Access level</InputLabel>
          <Select
            labelId="AccessLevel"
            className={classes.select}
            value={accessLevel}
            onChange={(e) => {
              setAccessLevel(e.target.value);
            }}
          >
            <MenuItem className={classes.menuitem} value={"Administrator"}>
              Administrator (editing permissions)
            </MenuItem>
            <MenuItem className={classes.menuitem} value={"General"}>
              General (view only permission)
            </MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6} className={classes.formitem}>
        <TextField
          label="UNICEF email id"
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
      </Grid>
      <Grid item xs={12}>
        <Button
          className={classes.filledButton}
          variant="contained"
          color="primary"
        >
          Send Invite
        </Button>
      </Grid>
    </Grid>
  );
}
