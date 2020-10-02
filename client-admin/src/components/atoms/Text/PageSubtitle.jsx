import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  atom: {
    fontFamily: '"Roboto", sans-serif',
    fontSize: 24,
    fontWeight: 400,
    lineHeight: 1.42,
    color: "#000000",
    marginTop: 0,
    marginBottom: 0,
  },
}));

export default function ({ children, className }) {
  const classes = useStyles();
  return <h1 className={`${classes.atom} ${className}`}> {children} </h1>;
}
