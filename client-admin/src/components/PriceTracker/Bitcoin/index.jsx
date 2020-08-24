import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo";
import MainContentContainer from "../../../ui/MainContentContainer";
import PriceInfoBanner from "../../../ui/PriceInfoBanner";
import {ArgumentAxis,ValueAxis,Chart,LineSeries,Title} from '@devexpress/dx-react-chart-material-ui';


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

  
  const month = today.toLocaleString("default", { month: "short" });
  const datestring =
    today.getUTCDate() + " " + month + " " + today.getUTCFullYear();

  const yesterdaystr = yesterday.toISOString();
  const todaystr = today.toISOString();
  const monthagostr = amonthago.toISOString();

  console.log("yesterday", yesterdaystr);
  console.log("today", todaystr);


  const url = new URL(window.location.origin + "/rest/admin/avgprice");
  const todayparams = {
    symbol: "BTC",
    timeStart: yesterdaystr,
    timeEnd: todaystr,
  };

  const monthagoparams = {
    symbol: "BTC",
    timeStart: monthagostr,
    timeEnd: todaystr,
  };

  const [todayprice, setTodayPrice] = useState([]);
  const [monthavgprice, setMonthAvgPrice] = useState([]);
  const [weekprices, setWeekPrices] = useState([]);
  const [weekdates, setWeekDates] = useState([]);

  const getTodayPrice = async () => {
    let res, todayprice;
    url.search = new URLSearchParams(todayparams).toString();

    try {
      res = await fetch(url);
      todayprice = await res.json();
      setTodayPrice(todayprice[0].avgPrice.toFixed(2));
      console.log("Got todayprice: ", todayprice);
    } catch (e) {
      return console.log(e);
    }
  };

  const getWeekPrices = async () => {
    let res, dayprice, i;
    

    for (i = 0; i < 7; i++)
    {
      const currentday = new Date();
      const prevday = new Date();
      currentday.setDate(currentday.getDate() - i);
      prevday.setDate(prevday.getDate() - i - 1);
      const currentdaystr = currentday.toISOString();
      const prevdaystr = prevday.toISOString();
      const dayparams = {
        symbol: "BTC",
        timeStart: prevdaystr,
        timeEnd: currentdaystr,
      };

      //Boring date formatting. Very annoying.
      const month = currentday.toLocaleString("default", { month: "short" });
      const currentdatestr = currentday.getUTCDate() + " " + month + " " + currentday.getUTCFullYear();

      setWeekDates(weekdates => [currentdatestr, ...weekdates])



      //Now get the actual prices
      url.search = new URLSearchParams(dayparams).toString();
      try {
        res = await fetch(url);
        dayprice = await res.json();
        setWeekPrices(weekprices => [dayprice[0].avgPrice.toFixed(2), ...weekprices]);
        console.log("Current day price:", dayprice[0].avgPrice);
        console.log("Current price list", weekprices);
      } catch (e) {
        return console.log(e);
      }
    }

    
  }

  const getMonthAvgPrice = async () => {
    let res, monthavgprice;
    url.search = new URLSearchParams(monthagoparams).toString();

    try {
      res = await fetch(url);
      monthavgprice = await res.json();
      setMonthAvgPrice(monthavgprice[0].avgPrice.toFixed(2));
      console.log("Got monthly avg price: ", monthavgprice);
    } catch (e) {
      return console.log(e);
    }
  };

  useEffect(() => {
    getTodayPrice();
    getMonthAvgPrice();
    getWeekPrices();
  }, []);

  return (
    <MainContentContainer className={classes.root}>
      <PriceInfoBanner />
      <div className={classes.header}>Bitcoin price overview</div>
      <div className={classes.subheader}>{datestring}</div>
      <MainCard todayprice={todayprice} monthavgprice={monthavgprice} 
                weekprices={weekprices} weekdates={weekdates}/>
      <WeekCard weekdates={weekdates} weekprices={weekprices}/>
    </MainContentContainer>
  );
}


export function MainCard(params)
{
  const classes = useStyles();
  return (
    <div className={classes.card}>
      <Card className={classes.cardinner} variant="outlined">
        <Grid container spacing={3}>
          <Grid item>
            <PriceSummary todayprice={params.todayprice} monthavgprice={params.monthavgprice} />
          </Grid>
          <Grid item>
            <PriceGraph weekprices={params.weekprices} weekdates={params.weekdates} />
          </Grid>
        </Grid>
      </Card>
    </div>
  );
}

export function PriceSummary(params) {
  const classes = useStyles();
  return (
    <div>
        <div className={classes.smalltext}>TODAY'S AVERAGE PRICE</div>
        <div className={classes.cardheader}>{params.todayprice} USD</div>
        <div className={classes.smalltext}>MONTHLY AVERAGE PRICE</div>
        <div className={classes.cardsubheader}>{params.monthavgprice} USD</div>
        <div className={classes.smalltext}>Q1 AVERAGE PRICE</div>
        <div className={classes.cardsubheader}>8798 USD</div>
    </div>
  );
}

export function WeekCard(params) {
  const classes = useStyles();
  return (
    <div className={classes.card}>
      <Card className={classes.cardinner} variant="outlined">
        <Grid container spacing={3}>
          {params.weekdates.map((date, index) => {
            return (
              <Grid item className={(index==6) ? classes.today : ""}>
                <div className={classes.smalltext}>{date}</div>
                <div className={classes.subheader}>{params.weekprices[index]}</div>
              </Grid>
            )
            
          })}
          
        </Grid>
      </Card>
    </div>
  );
}




export function PriceGraph(params) {
  const classes = useStyles();

  let data = [];
  let i;

  for (i = 0; i < params.weekdates.length; i++) {
    data[i] = { x: params.weekdates[i], y: Number(params.weekprices[i]) }
  }

  
  return (

    <Chart data={data} width={600} height={250}>
      <ArgumentAxis />
      <ValueAxis/>
      <LineSeries valueField="y" argumentField="x" />
      <Title text={"Price Graph " + params.weekdates[6]} />
    </Chart>
  
  )
};