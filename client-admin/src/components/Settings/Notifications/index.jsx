import React, { Fragment } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontFamily: '"Roboto", sans-serif',
    fontSize: 19,
    lineHeight: 1.42,
    color: "#000000",
    fontWeight: 400,
    margin: 0,
  },
  checkbox: {
    textAlign: "right",
  },
  blueHeading: {
    fontFamily: '"Roboto", sans-serif',
    fontSize: 19,
    lineHeight: 1.42,
    color: "#00aeef",
    fontWeight: 400,
    margin: 0,
  },
  listItem: {
    fontFamily: '"Roboto", sans-serif',
    fontSize: 16,
    lineHeight: 1.6,
    marginTop: 12,
    marginBottom: 12,
  },
  toggle: {
    fontFamily: '"Cabin",  sans-serif',
    textTransform: "uppercase",
    fontWeight: 700,
    fontSize: 14,
    color: "#00aaef",
    textAlign: "right",
  },
  toggleLabel: { fontWeight: 700 },
  changePasswordButton: {
    width: 208,
    height: 35,
    fontFamily: '"Cabin", sans-serif',
    letterSpacing: 1,
    fontSize: 12,
    fontWeight: 700,
    textAlign: "center",
    color: "#ffffff",
    boxShadow: "none",
    marginLeft: 18,
  },
}));

const BlueSwitch = withStyles((theme) => ({
  root: {
    width: 42,
    height: 26,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    padding: 1,
    "&$checked": {
      transform: "translateX(16px)",
      color: "#00aaef",
      "& + $track": {
        backgroundColor: "#daf5ff",
        opacity: 1,
        border: "none",
      },
    },
    "&$focusVisible $thumb": {
      color: "#00aaef",
      border: "6px solid #fff",
    },
  },
  thumb: {
    width: 24,
    height: 24,
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(["background-color", "border"]),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});

const BlueCheckbox = withStyles({
  root: {
    color: "#00aeef",
    "&$checked": {
      color: "#00aeef",
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

export default function ActivityList(props) {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs={12}>
        <List component="nav" className={classes.root}>
          <ListItem className={classes.listItem}>
            <Grid container>
              <Grid item xs={10}>
                <h5 className={classes.heading}>
                  Notify me via email if any of the below actions are made on
                  Juniper
                </h5>
              </Grid>
              <Grid item xs={2} className={classes.toggle}>
                <FormControlLabel
                  control={<BlueSwitch />}
                  label="On"
                  labelPlacement="start"
                  className={classes.toggleLabel}
                />
              </Grid>
            </Grid>
          </ListItem>
          <Divider />
          <ListItem className={classes.listItem}>
            <Grid container>
              <Grid item xs={10}>
                <h5 className={classes.blueHeading}>
                  A new user is added to the platform
                </h5>
              </Grid>
              <Grid item xs={2} className={classes.checkbox}>
                <BlueCheckbox />
              </Grid>
            </Grid>
          </ListItem>
          <ListItem className={classes.listItem}>
            <Grid container>
              <Grid item xs={10}>
                <h5 className={classes.blueHeading}>
                  A new transaction happens in any of My Wallets
                </h5>
              </Grid>
              <Grid item xs={2} className={classes.checkbox}>
                <BlueCheckbox />
              </Grid>
            </Grid>
          </ListItem>
          <ListItem className={classes.listItem}>
            <Grid container>
              <Grid item xs={10}>
                <h5 className={classes.blueHeading}>
                  A new transactions needs to be tagged
                </h5>
              </Grid>
              <Grid item xs={2} className={classes.checkbox}>
                <BlueCheckbox />
              </Grid>
            </Grid>
          </ListItem>
        </List>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            className={classes.changePasswordButton}
          >
            Change Password
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
