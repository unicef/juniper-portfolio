import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  bigBlueCircle: {
    width: 18,
    height: 18,
    border: "solid 2px #f8f8f8",
    backgroundColor: "#00aeef",
    borderRadius: "50%",
    display: "inline-block",
  },
  littleBlueCircle: {
    width: 14,
    height: 14,
    border: "solid 2px #f8f8f8",
    backgroundColor: "#00aeef",
    borderRadius: "50%",
    display: "inline-block",
    marginTop: 2,
    marginBottom: 2,
    marginRight: 1,
  },
  blueLine: {
    border: "solid 1px #00aeef",
    marginBottom: 8,
  },
  line: {
    width: "93%",
    display: "inline-block",
  },
  title: {
    marginTop: "auto",
  },
  donorTitle: {
    fontFamily: '"Roboto", sans-serif',
    fontSize: 24,
    marginTop: 18,
    lineHeight: 1.17,
    fontWeight: 700,
  },
  intermediaryTitle: {
    fontFamily: '"Roboto", sans-serif',
    fontSize: 18,
    marginTop: 18,
    lineHeight: 1.17,
    fontWeight: 400,
  },
  recipientTitle: {
    fontFamily: '"Roboto", sans-serif',
    fontSize: 18,
    marginTop: 25,
    lineHeight: 1.17,
    fontWeight: 400,
  },
  subtitle: {
    fontFamily: '"Cabin", sans-serif',
    color: "#000000",
    marginTop: 6,
    letterSpacing: 0.83,
    fontSize: 10,
    fontWeight: 500,
    textTransform: "uppercase",
  },
}));

export default function ({
  sent,
  received,
  source,
  destination,
  donor,
  to,
  from,
}) {
  const classes = useStyles();

  // Mocked for three steps
  if (sent) {
    return (
      <Fragment>
        <Grid container>
          <Grid item xs={6}>
            <div className={classes.recipientTitle}>UNICEF HQ</div>
            <div className={classes.subtitle}>Source</div>
          </Grid>
          <Grid item xs={6}>
            <div className={classes.donorTitle}>
              {destination ? destination : "Unidentified"}
            </div>
            <div className={classes.subtitle}>Recipient</div>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={6}>
            <div className={classes.bigBlueCircle}></div>
            <div className={classes.line}>
              <hr className={classes.blueLine} />
            </div>
          </Grid>

          <Grid item xs={6}>
            <div className={classes.bigBlueCircle}></div>
          </Grid>
        </Grid>
      </Fragment>
    );
  } else {
    if (donor) {
      return (
        <Fragment>
          <Grid container>
            <Grid item xs={4} className={classes.title}>
              <div className={classes.donorTitle}>{donor}</div>
            </Grid>
            <Grid item xs={4} className={classes.title}>
              <div className={classes.intermediaryTitle}>{source}</div>
            </Grid>
            <Grid item xs={4} className={classes.title}>
              <div className={classes.recipientTitle}>UNICEF HQ</div>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={4}>
              <div className={classes.subtitle}>Donor</div>
            </Grid>
            <Grid item xs={4}>
              <div className={classes.subtitle}>Intermediary</div>
            </Grid>
            <Grid item xs={4}>
              <div className={classes.subtitle}>Recipient</div>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={4}>
              <div className={classes.bigBlueCircle}></div>
              <div className={classes.line}>
                <hr className={classes.blueLine} />
              </div>
            </Grid>
            <Grid item xs={4}>
              <div className={classes.littleBlueCircle}></div>
              <div className={classes.line}>
                <hr className={classes.blueLine} />
              </div>
            </Grid>
            <Grid item xs={4}>
              <div className={classes.bigBlueCircle}></div>
            </Grid>
          </Grid>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <Grid container>
            <Grid item xs={6}>
              <div className={classes.donorTitle}>
                {source ? source : "Unidentified"}
              </div>
              <div className={classes.subtitle}>Source</div>
            </Grid>
            <Grid item xs={6}>
              <div className={classes.recipientTitle}>UNICEF HQ</div>
              <div className={classes.subtitle}>Recipient</div>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6}>
              <div className={classes.bigBlueCircle}></div>
              <div className={classes.line}>
                <hr className={classes.blueLine} />
              </div>
            </Grid>

            <Grid item xs={6}>
              <div className={classes.bigBlueCircle}></div>
            </Grid>
          </Grid>
        </Fragment>
      );
    }
  }
}
