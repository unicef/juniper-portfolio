import React from "react";
import { TrackMainText } from "./TrackMainText";
import { TrackMainImage } from "./TrackMainImage";
import { CryptoTracker } from "./CryptoTracker";
import { DonationTable } from "./DonationTable";
import { makeStyles } from "@material-ui/core";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme: any) => ({
  top: {
    backgroundColor: "#0068ea",
    paddingTop: "100px",
    height: "90vh",
  },
}));

export const TrackDesktop = () => {
  const classes = useStyles();

  return (
    <div>
      <div
        className={classes.top}
        style={{
          paddingLeft: "14px",
          paddingRight: "14px",
          paddingBottom: "14px",
        }}
      >
        <TrackMainText />
        <div style={{ position: "absolute", left: 57, bottom: 48 }}>
          <TrackMainImage />
        </div>
        <Grid
          container
          style={{ position: "absolute", bottom: 96 }}
          alignContent="center"
          alignItems="center"
          justify="center"
        >
          <CryptoTracker />
        </Grid>
      </div>
      <div>
        <DonationTable />
      </div>
    </div>
  );
};
