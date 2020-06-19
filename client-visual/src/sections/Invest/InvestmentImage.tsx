import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid, useMediaQuery } from "@material-ui/core";
import json2mq from "json2mq";

const useStyles = makeStyles((theme: any) => ({
  root: {
    maxWidth: "100%",
    height: "627px",
  },
  rootMobile: {
    maxWidth: "100%",
  },
}));

export const InvestmentImage = (props: any) => {
  const classes = useStyles();
  const matches = useMediaQuery(
    json2mq({
      minWidth: 991,
    })
  );
  return (
    <div>
      <Grid container>
        <Grid item xs={12} sm={12} md={3}></Grid>
        <Grid item xs={12} sm={12} md={9}>
          <img
            className={matches ? classes.root : classes.rootMobile}
            src={props.linkToImage}
            alt={props.altDescription}
          />
        </Grid>
      </Grid>
    </div>
  );
};
