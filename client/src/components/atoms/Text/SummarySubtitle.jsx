import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  summarySubtitle: {
    fontFamily: '"Cabin", sans-serif',
    color: "#000000",
    marginTop: 6,
    marginBottom: 0,
    letterSpacing: 0.83,
    fontSize: 10,
    fontWeight: 500,
    textTransform: "uppercase",
  },
}));

export default function ({ children, className }) {
  const classes = useStyles();
  return (
    <h4 className={`${classes.summarySubtitle} ${className}`}> {children} </h4>
  );
}
