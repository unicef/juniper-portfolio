import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  summaryTitle: {
    fontFamily: '"Roboto", sans-serif',
    fontSize: 28,
    fontWeight: 400,
    margin: 0,
  },
}));

export default function ({ children, className }) {
  const classes = useStyles();
  return (
    <h3 className={`${classes.summaryTitle} ${className}`}> {children} </h3>
  );
}
