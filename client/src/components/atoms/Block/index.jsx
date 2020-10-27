import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  atom: {},
}));

export default function ({ children, className }) {
  const classes = useStyles();
  return <div className={`${classes.atom} ${className}`}>{children}</div>;
}
