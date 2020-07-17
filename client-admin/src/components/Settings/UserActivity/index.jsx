import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ActivityList from "../../../ui/ActivityList";

const useStyles = makeStyles({
  root: {},
  heading: {
    fontFamily: '"Roboto", sans-serif',
    fontSize: 19,
    lineHeight: 1.42,
    color: "#000000",
    fontWeight: 400,
    margin: 0,
  },
});

export default function UserActivity() {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <h5 className={classes.heading}>
          Below is an activity log of all the user actions on Juniper
        </h5>
        <ActivityList data={mockUserActivity} />
      </Grid>
    </Grid>
  );
}

const mockUserActivity = [
  {
    text:
      "<a class='link'>Christ Fabian</a> added a new wallet <a class='link'>UNICEF HQ Test</a>",
    timestamp: "6 hours ago",
  },
  {
    text:
      "<a class='link'>Christ Fabian</a> added a new wallet <a class='link'>UNICEF HQ Test</a>",
    timestamp: "6 hours ago",
  },
  {
    text:
      "<a class='link'>Christ Fabian</a> added a new wallet <a class='link'>UNICEF HQ Test</a>",
    timestamp: "6 hours ago",
  },
  {
    text:
      "<a class='link'>Christ Fabian</a> added a new wallet <a class='link'>UNICEF HQ Test</a>",
    timestamp: "6 hours ago",
  },
];
