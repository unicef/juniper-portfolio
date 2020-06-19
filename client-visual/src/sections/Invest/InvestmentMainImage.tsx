import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid, useMediaQuery } from "@material-ui/core";

const useStyles = makeStyles((theme: any) => ({
  desktop: {
    paddingTop: "59px",
  },
  mobile: {
    paddingTop: "59px",
    width: "236px",
  },
}));

export const InvestmentMainImage = () => {
  const classes = useStyles();
  return (
    <img
      className={classes.mobile}
      src="Invest_illustration.svg"
      alt="receive info"
    />
  );
};
