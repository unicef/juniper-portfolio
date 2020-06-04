import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    padding: "20px 30px 40px 30px",
  },

  mainText: {
    fontFamily: "Cabin",
    fontSize: "12px",
    fontWeight: "bold",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "1px",
    textTransform: "uppercase",
  },

  numberText: {
    fontFamily: "IBM Plex Sans",
    fontSize: "30px",
    fontWeight: "bold",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.76",
    letterSpacing: "normal",
    textTransform: "uppercase",
  },

  labelText: {
    fontFamily: "Cabin",
    fontSize: "15px",
    fontWeight: "bold",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "1.13px",
    textTransform: "uppercase",
  },
}));

export const TrackMobileSummary = () => {
  const classes = useStyles();

  return (
    <div>
      <Grid
        style={{ paddingTop: "50px", paddingBottom: "100px" }}
        container
        className={classes.root}
      >
        <Grid item xs={6} sm={6}>
          <div style={{ paddingBottom: "0px" }}>
            <span className={classes.mainText}>Received</span>
          </div>
          <br />
          <span className={classes.numberText}>01</span>
          <br />
          <span className={classes.labelText}>Our Donors</span>
          <br />
          <span className={classes.numberText}>100</span>
          <br />
          <span className={classes.labelText}>Ether Received</span>
          <br />
          <span className={classes.numberText}>01</span>
          <br />
          <span className={classes.labelText}>Bitcoin Received</span>
          <br />
        </Grid>

        <Grid item xs={6} sm={6}>
          <div style={{ paddingBottom: "0px" }}>
            <span className={classes.mainText}>Invested</span>
          </div>
          <br />
          <span className={classes.numberText}>03</span>
          <br />
          <span className={classes.labelText}>Our Investments</span>
          <br />
          <span className={classes.numberText}>100</span>
          <br />
          <span className={classes.labelText}>Ether Invested</span>
          <br />
          <span className={classes.numberText}>01</span>
          <br />
          <span className={classes.labelText}>Bitcoin Invested</span>
          <br />
        </Grid>
      </Grid>
    </div>
  );
};
