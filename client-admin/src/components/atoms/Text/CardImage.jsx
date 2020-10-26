import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  cardImage: {
    width: 125,
    height: 71,
  },
}));

export default function ({ src, alt }) {
  const classes = useStyles();

  return <img className={classes.cardImage} src={src} alt={alt || "logo"} />;
}
