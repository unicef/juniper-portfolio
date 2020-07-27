import React, { useEffect, useState } from "react";
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
    paddingLeft: 15,
  },
});

export default function UserActivity() {
  const classes = useStyles();
  const [activities, setActivities] = useState(mockUserActivity);

  useEffect(() => {
    const diffMinutes = (dt2, dt1) => {
      var diff = (dt2.getTime() - dt1.getTime()) / 1000;
      diff /= 60;
      return Math.abs(Math.round(diff));
    };

    const getActivities = async () => {
      let activity = [];
      try {
        activity = await fetch("/rest/admin/activities");
      } catch (e) {
        console.log(e);
      }
      activity = await activity.json();
      activity = activity.reverse();
      activity.forEach((activity) => {
        // calc time
        const timestamp = activity._id.toString().substring(0, 8);
        const date = new Date(parseInt(timestamp, 16) * 1000);
        const now = new Date();
        const timeDiffInMinutes = diffMinutes(date, now);

        if (timeDiffInMinutes > 60 * 24) {
          // days
          activity.timestamp = `${Math.round(
            timeDiffInMinutes / (60 * 24)
          )} days ago`;
        } else if (timeDiffInMinutes > 60) {
          // hours
          activity.timestamp = `${Math.round(
            timeDiffInMinutes / 60
          )} hours ago`;
        } else {
          // minutes
          activity.timestamp = `${Math.round(timeDiffInMinutes)} minutes ago`;
        }
      });
      setActivities(activity);
    };

    getActivities();
  }, []);

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <h5 className={classes.heading}>
          Below is an activity log of all the user actions on Juniper
        </h5>
        <ActivityList data={activities} />
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
