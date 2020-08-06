import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { gql } from 'apollo-boost'
import { useQuery } from 'react-apollo'
import MainContentContainer from '../../../ui/MainContentContainer'
import PriceBar from '../../PriceBar'


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





export default function BitcoinPriceTracker() {
  const classes = useStyles();
  const today = new Date();
  const yesterday = new Date();
  const amonthago = new Date();
  
  yesterday.setDate(yesterday.getDate() - 1);
  amonthago.setDate(amonthago.getDate() - 30);

  console.log('yesterday', yesterday.toISOString())
  console.log('today', today.toISOString())

  const month = today.toLocaleString('default', { month: 'short' });
  const datestring = today.getUTCDate() + " " + month + " " + today.getUTCFullYear();
  
  const yesterdaystr = yesterday.toISOString();
  const todaystr = today.toISOString();
  const monthagostr = amonthago.toISOString();

  const url = new URL(window.location.origin + '/rest/admin/avgprice');
  const todayparams = {
    symbol: "BTC",
    timeStart: yesterdaystr,
    timeEnd: todaystr,
  }
  
  const monthagoparams = {
    symbol: "BTC",
    timeStart: monthagostr,
    timeEnd: todaystr,
  }



  const [todayprice, setTodayPrice] = useState([]);
  const [monthavgprice, setMonthAvgPrice] = useState([]);


  const getTodayPrice = async () => {
    let res, todayprice;
    url.search = new URLSearchParams(todayparams).toString()
    
    try {
      res = await fetch(url);
      todayprice = await res.json();
      setTodayPrice(todayprice[0].avgPrice);
      console.log('Got todayprice: ', todayprice);
    } catch (e) {
      return console.log(e);
    }

  
  };

  const getMonthAvgPrice = async () => {
    let res, monthavgprice;
    url.search = new URLSearchParams(monthagoparams).toString()
    
    try {
      res = await fetch(url);
      monthavgprice = await res.json();
      setMonthAvgPrice(monthavgprice[0].avgPrice.toFixed(2));
      console.log('Got monthly avg price: ', monthavgprice);
    } catch (e) {
      return console.log(e);
    }

  
  };


  useEffect(() => {
    getTodayPrice();
    getMonthAvgPrice();
  }, []);
    

  return (
    <MainContentContainer className={classes.root}>
      <PriceBar />
      <div className={classes.header}>Bitcoin price overview</div>
      <div className={classes.subheader}>{datestring}</div>
      <div>{todayprice}</div>
      <MainCard todayprice={todayprice} monthavgprice={monthavgprice}/>
      <WeekCard/>
    </MainContentContainer>
  );
}

export function MainCard(params) {
  const classes = useStyles();
  return (
    <div className={classes.card}>
      <Card className={classes.cardinner} variant="outlined">
        <div className={classes.smalltext}>TODAY'S AVERAGE PRICE</div>
        <div className={classes.cardheader}>{params.todayprice} USD</div>
        <div className={classes.smalltext}>MONTHLY AVERAGE PRICE</div>
        <div className={classes.cardsubheader}>{params.monthavgprice} USD</div>
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
