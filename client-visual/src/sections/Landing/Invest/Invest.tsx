import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { InvestObject } from "./InvestObject";
import { InvestImage } from "./InvestImage";
import { InvestText } from "./InvestText";
import { ArrowImg } from "../Atoms/ArrowImg";
import { HorizontalBar } from "../Atoms/HorizontalBar";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    //height:'183px'
  },

  img: {
    paddingLeft: "30px",
  },

  arrow: {
    marginLeft: "50px",
  },

  hb: {
    marginTop: "-12px",
  },
});

export const Invest = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item md={5}>
          <InvestText />
        </Grid>
        <Grid item md={2}>
          <InvestObject />
        </Grid>
        <Grid item md={3} className={classes.img}>
          <InvestImage />{" "}
        </Grid>
        <Grid item md={1} className={classes.arrow} />
        <a href="/invest">
          {" "}
          <ArrowImg />
        </a>
        <Grid />
      </Grid>
      <div className={classes.hb}>
        {" "}
        <HorizontalBar />
      </div>
    </div>
  );
};

export const InvestMobile = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item md={6}>
          <InvestText />
        </Grid>
        <Grid item md={1} className={classes.arrow} />
        <a href="/receive">
          {" "}
          <ArrowImg />
        </a>
        <Grid />
      </Grid>
      <Grid container>
        <Grid item md={6}>
          <InvestObject />
        </Grid>
        <Grid item md={6} className={classes.img}>
          <InvestImage />{" "}
        </Grid>
      </Grid>
      <div className={classes.hb}>
        {" "}
        <HorizontalBar />
      </div>
    </div>
  );
};
