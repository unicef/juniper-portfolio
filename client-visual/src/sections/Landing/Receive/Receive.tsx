import React from "react";
import { Grid } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import { ReceiveObject } from "./ReceiveObject";
import { ReceiveText } from "./ReceiveText";
import { ReceiveImage } from "./ReceiveImage";
import { ArrowImg } from "../Atoms/ArrowImg";
import { HorizontalBar } from "../Atoms/HorizontalBar";

const useStyles = makeStyles({
  root: {
    paddingTop: "64px",
    height: "183px",
  },
  container: {
    width: "100%",
  },
  img: {
    paddingLeft: "30px",
  },
  arrow: {
    marginLeft: "50px",
  },
  hb: {
    marginTop: "-12.5px",
  },
});

export const Receive = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item md={5}>
          <ReceiveText />
        </Grid>
        <Grid item md={2}>
          <ReceiveObject />
        </Grid>
        <Grid item md={3} className={classes.img}>
          <ReceiveImage />{" "}
        </Grid>
        <Grid item md={1} className={classes.arrow} />
        <a href="/receive">
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

export const ReceiveMobile = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item md={6}>
          <ReceiveText />
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
          <ReceiveObject />
        </Grid>
        <Grid item md={6} className={classes.img}>
          <ReceiveImage />{" "}
        </Grid>
      </Grid>
      <div className={classes.hb}>
        {" "}
        <HorizontalBar />
      </div>
    </div>
  );
};
