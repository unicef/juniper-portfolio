import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#ffffff",
    paddingTop: 19,
    paddingBottom: 19,
  },
  avatarbox: {
    textAlign: "right",
    paddingLeft: 15,
  },
  avatar: {
    height: 47,
    width: 47,
  },
  message: {
    fontFamily: '"Cabin", sans-serif',
    fontSize: 14,
    fontWeight: 700,
    letterSpacing: 1,
    color: "#00aeef",
    boxShadow: "none",
    textTransform: "uppercase",
    marginTop: 12,
  },
  chevron: {
    textAlign: "right",
    color: "#00aeef",
    marginTop: 12,
    paddingRight: 15,
  },
});

export default function SettingsProfile() {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid item xs={1} className={classes.avatarbox}>
        <Avatar src={null} className={classes.avatar}>
          MH
        </Avatar>
      </Grid>
      <Grid item xs={10} className={classes.message}>
        Change Profile Picture
      </Grid>
      <Grid item xs={1} className={classes.chevron}>
        <ChevronRightIcon />
      </Grid>
    </Grid>
  );
}
