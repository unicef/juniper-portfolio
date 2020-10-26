import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  cardCountry: {
    fontSize: 18,
    lineHeight: 1.33,
    fontWeight: 400,
    marginTop: 0,
  },
}));

export default function ({ children }) {
  const classes = useStyles();

  return <h2 className={classes.cardCountry}>{children}</h2>;
}
