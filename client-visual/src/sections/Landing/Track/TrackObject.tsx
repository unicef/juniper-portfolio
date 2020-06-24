import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  text: {
    fontFamily: "IBM Plex Sans",
    fontSize: "16px",
    fontWeight: "bold",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.44",
    letterSpacing: "normal",
    color: "#fff",
    paddingTop: "20px",
  },
  title: {
    textTransform: "uppercase",
    letterSpacing: "1.5px",
    fontSize: "14px",
    fontWeight: "normal",
  },
  trackText: {
    color: "#fff",
  },
  allinvestments: {
    color: "#fff",
  },

  transparent: {
    color: "#ffd113",
  },
});

export const TrackObject = () => {
  const classes = useStyles();
  const [title] = useState("Tracked");
  const [percenttransparent] = useState(100);
  return (
    <div className={classes.text}>
      <span className={classes.title}>{title}</span>
      <div className={classes.allinvestments}>On blockchain</div>
      <div className={classes.transparent}>
        {percenttransparent}% transparent
      </div>
    </div>
  );
};
