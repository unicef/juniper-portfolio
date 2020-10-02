import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  pageTitle: {
    fontFamily: '"Roboto", sans-serif',
    fontSize: 28,
    fontWeight: 700,
    color: "#000000",
    marginTop: "2em",
    marginBottom: 0,
  },
}));

export default function ({ children, className }) {
  const classes = useStyles();
  return <h2 className={`${classes.pageTitle} ${className}`}> {children} </h2>;
}
