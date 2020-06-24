import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid, useMediaQuery } from "@material-ui/core";

const useStyles = makeStyles((theme: any) => ({
  imgSpecs: {
    paddingTop: "59px",
    width: "236px",
  },
}));

export const MainImage = () => {
  const classes = useStyles();
  return (
    <img
      className={classes.imgSpecs}
      src="/Receive_illustration.svg"
      alt="receive info"
    />
  );
};
