import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ActivityList from "../../organisms/ActivityList";
import { getUserActivities } from "../../../actions";
import ExpansionList from "../../organisms/ExpansionPanel";

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

export default function UserActivity({ title, heading }) {
  const classes = useStyles();
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const diffMinutes = (dt2, dt1) => {
      var diff = (dt2.getTime() - dt1.getTime()) / 1000;
      diff /= 60;
      return Math.abs(Math.round(diff));
    };

    async function init() {
      const activities = await getUserActivities();
      activities.forEach((activity) => {
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
        setActivities(activities);
      });
    }

    init();
  }, []);

  return (
    <ExpansionList title={title} heading={heading}>
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <h5 className={classes.heading}>
            Below is an activity log of all the user actions on Juniper
          </h5>
          <ActivityList data={activities} />
        </Grid>
      </Grid>
    </ExpansionList>
  );
}
