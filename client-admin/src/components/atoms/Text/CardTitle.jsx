import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  cardTitle: {
    fontSize: 24,
    fontWeight: 700,
    lineHeight: 1.17,
    color: "#000000",
    marginBottom: 10,
    wordBreak: "break-word",
  },
}));

export default function ({ children, className }) {
  const classes = useStyles();

  return <h2 className={`${classes.cardTitle} ${className}`}>{children}</h2>;
}
