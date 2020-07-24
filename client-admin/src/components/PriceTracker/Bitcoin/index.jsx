import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo";
import MainContentContainer from "../../../ui/MainContentContainer";
import PriceBar from "../../../ui/PriceInfoBanner";

const useStyles = makeStyles({
  root: {
    marginTop: "20px",
    backgroundColor: "#f8f8f8",
  },
  header: {
    fontFamily: '"Roboto", sans-serif',
    fontSize: "24px",
    fontWeight: "bold",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.17,
    letterSpacing: "normal",
    color: "#000000",
    padding: "40px 0px 10px 0px",
  },

  subheader: {
    fontFamily: '"Roboto", sans-serif',
    fontSize: "24px",
    lineHeight: 1.17,
    letterSpacing: "normal",
  },

  card: {
    paddingTop: "40px",
  },

  cardinner: {
    padding: "40px",
  },

  cardheader: {
    fontFamily: '"Roboto", sans-serif',
    fontSize: "28px",
    lineHeight: "28px",
    fontWeight: "bold",
    color: "#000000",
    paddingBottom: "30px",
  },

  cardsubheader: {
    fontFamily: '"Roboto", sans-serif',
    fontSize: "28px",
    lineHeight: "28px",
    fontWeight: "normal",
    color: "#000000",
    paddingBottom: "30px",
  },

  smalltext: {
    fontFamily: '"Cabin", sans-serif',
    fontSize: "10px",
    letterSpacing: "0.83px",
    paddingBottom: "5px",
  },

  today: {
    color: "#00aeef",
    fontWeight: "Bold",
  },
});

const DAILY_PRICES = gql`
  query DailyPrices {
    dailyPrices {
      id
      currency
      priceBinance
      priceCoinbasePro
      priceBitstamp
      averagePrice
      date
    }
  }
`;

export default function BitcoinPriceTracker() {
  const classes = useStyles();
  const date = new Date();
  const month = date.toLocaleString("default", { month: "short" });
  const datestring =
    date.getUTCDate() + " " + month + " " + date.getUTCFullYear();

  const { loading, error, prices } = useQuery(DAILY_PRICES);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  console.log(prices);

  return (
    <MainContentContainer className={classes.root}>
      <PriceBar />
      <div className={classes.header}>Bitcoin price overview</div>
      <div className={classes.subheader}>{datestring}</div>
      <div>{prices}</div>
      <MainCard />
      <WeekCard />
    </MainContentContainer>
  );
}

export function MainCard() {
  const classes = useStyles();
  return (
    <div className={classes.card}>
      <Card className={classes.cardinner} variant="outlined">
        <div className={classes.smalltext}>TODAY'S AVERAGE PRICE</div>
        <div className={classes.cardheader}>8798 USD</div>
        <div className={classes.smalltext}>MONTHLY AVERAGE PRICE</div>
        <div className={classes.cardsubheader}>8798 USD</div>
        <div className={classes.smalltext}>Q1 AVERAGE PRICE</div>
        <div className={classes.cardsubheader}>8798 USD</div>
      </Card>
    </div>
  );
}

export function WeekCard() {
  const classes = useStyles();
  return (
    <div className={classes.card}>
      <Card className={classes.cardinner} variant="outlined">
        <Grid container spacing={3}>
          <Grid item>
            <div className={classes.smalltext}>19 Dec 2020</div>
            <div className={classes.subheader}>8798 USD</div>
          </Grid>
          <Grid item>
            <div className={classes.smalltext}>19 Dec 2020</div>
            <div className={classes.subheader}>8798 USD</div>
          </Grid>
          <Grid item>
            <div className={classes.smalltext}>19 Dec 2020</div>
            <div className={classes.subheader}>8798 USD</div>
          </Grid>
          <Grid item>
            <div className={classes.smalltext}>19 Dec 2020</div>
            <div className={classes.subheader}>8798 USD</div>
          </Grid>
          <Grid item>
            <div className={classes.smalltext}>19 Dec 2020</div>
            <div className={classes.subheader}>8798 USD</div>
          </Grid>
          <Grid item>
            <div className={classes.smalltext}>19 Dec 2020</div>
            <div className={classes.subheader}>8798 USD</div>
          </Grid>
          <Grid item className={classes.today}>
            <div className={classes.smalltext}>19 Dec 2020</div>
            <div className={classes.subheader}>8798 USD</div>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
}
