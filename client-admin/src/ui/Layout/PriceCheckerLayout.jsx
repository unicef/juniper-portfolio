import React, { useState, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import PriceInfoBanner from "../../ui/PriceInfoBanner";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import IconButton from "@material-ui/core/IconButton";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ReferenceLine,
  ReferenceArea,
  ReferenceDot,
  Tooltip,
  CartesianGrid,
  Legend,
  Brush,
  ErrorBar,
  AreaChart,
  Area,
  Label,
  LabelList,
} from "recharts";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const useStyles = makeStyles((theme) => ({
  heading: {
    fontFamily: '"Roboto", sans-serif',
    fontSize: 24,
    fontWeight: 700,
    lineHeight: 1.42,
    color: "#000000",
    marginTop: 52,
    marginBottom: 0,
  },
  subheading: {
    fontFamily: '"Roboto", sans-serif',
    fontSize: 24,
    fontWeight: 400,
    lineHeight: 1.42,
    color: "#000000",
    marginTop: 0,
    marginBottom: 0,
  },
  currentMonth: {
    minWidth: 125,
    color: "#00aaef",
    fontSize: 14,
    fontWeight: 700,
    lineHeight: 2,
    letterSpacing: 0.78,
    textTransform: "uppercase",
    textAlign: "center",
  },
  customPaginationNav: {
    marginTop: 38,
    display: "block",
    marginBottom: 20,
  },
  customPagination: {
    color: "#00aaef",
    margin: 0,
    display: "flex",
    padding: 0,
    flexWrap: "wrap",
    listStyle: "none",
    alignItems: "center",
  },
  chartArea: {
    backgroundColor: "#ffffff",
    padding: 40,
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
  chartTitle: {
    fontFamily: '"Roboto", sans-serif',
    fontSize: 28,
  },
  chartPrices: {
    paddingBottom: 30,
  },
  chart: {
    textAlign: "right",
  },
}));

export default function PriceCheckerLayout(props) {
  const classes = useStyles();
  const thisMonth = new Date().getMonth();
  const thisYear = new Date().getFullYear();

  const [currentWeek, setCurrentWeek] = useState(
    Math.round(new Date().getDate() / 7)
  );
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const shortDate = (date) => {
    return `${date.getDate()} ${
      monthNames[date.getMonth()]
    } ${date.getFullYear()}`;
  };

  const daysInMonth = (month, year) => {
    console.log(`daysInMonth: ${new Date(year, month, 0).getDate()}`);
    return new Date(year, month, 0).getDate();
  };

  return (
    <Fragment>
      <PriceInfoBanner />
      <Grid container>
        <Grid item xs={12}>
          <h1 className={classes.heading}>{props.currency} price overview</h1>
          <h2 className={classes.subheading}>{shortDate(new Date())}</h2>
        </Grid>
        <Grid item xs={12}>
          <nav className={classes.customPaginationNav}>
            <ul className={classes.customPagination}>
              <li>
                <IconButton
                  color="inherit"
                  onClick={() => {
                    if (currentMonth === 0) {
                      setCurrentMonth(11);
                      setCurrentYear(currentYear - 1);
                    } else {
                      setCurrentMonth(currentMonth - 1);
                    }
                  }}
                >
                  <ChevronLeftIcon />
                </IconButton>
              </li>
              <li className={classes.currentMonth}>
                {monthNames[currentMonth]} {currentYear}
              </li>
              <li>
                <IconButton
                  color="inherit"
                  disabled={
                    thisMonth === currentMonth && thisYear === currentYear
                  }
                  onClick={() => {
                    if (currentMonth === 11) {
                      setCurrentMonth(0);
                      setCurrentYear(currentYear + 1);
                    } else {
                      setCurrentMonth(currentMonth + 1);
                    }
                  }}
                >
                  <ChevronRightIcon />
                </IconButton>
              </li>
            </ul>
          </nav>
        </Grid>

        <Grid item xs={12} className={classes.chartArea}>
          <Grid container>
            <Grid item xs={3}>
              <Grid container>
                <Grid item className={classes.chartPrices}>
                  <div className={classes.subtitle}>Today's Average Price</div>
                  <div className={classes.chartTitle}>
                    <b>$8999.12 USD</b>
                  </div>
                </Grid>
                <Grid item className={classes.chartPrices}>
                  <div className={classes.subtitle}>Monthly Average Price</div>
                  <div className={classes.chartTitle}>$8999.12 USD</div>
                </Grid>
                <Grid item className={classes.chartPrices}>
                  <div className={classes.subtitle}>Q Average Price</div>
                  <div className={classes.chartTitle}>$8999.12 USD</div>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={9} className={classes.chart}>
              <Grid container>
                <Grid item>
                  <div
                    className={classes.subtitle}
                    style={{ marginLeft: "4em" }}
                  >
                    Price Graph {monthNames[currentMonth]}
                  </div>
                </Grid>
                <Grid item>
                  <LineChart
                    width={650}
                    height={250}
                    data={data03}
                    margin={{ top: 40, right: 40, bottom: 20, left: 20 }}
                  >
                    <XAxis dataKey="Date" />
                    <YAxis domain={["auto", "auto"]} />
                    <Tooltip
                      wrapperStyle={{
                        borderColor: "white",
                        boxShadow: "2px 2px 3px 0px rgb(204, 204, 204)",
                      }}
                      labelStyle={{ fontWeight: "bold", color: "#666666" }}
                    />
                    <Line
                      dataKey="Price"
                      stroke="#00aeef"
                      strokeWidth={4}
                      dot={false}
                    />
                  </LineChart>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <nav className={classes.customPaginationNav}>
            <ul className={classes.customPagination}>
              <li>
                <IconButton
                  disabled={currentWeek === 0}
                  color="inherit"
                  onClick={() => {
                    if (currentWeek !== 0) {
                      setCurrentWeek(currentWeek - 1);
                    }
                  }}
                >
                  <ChevronLeftIcon />
                </IconButton>
              </li>
              <li className={classes.currentMonth} style={{ minWidth: 55 }}>
                Week {currentWeek}
              </li>
              <li>
                <IconButton
                  color="inherit"
                  disabled={
                    currentWeek * 7 >= daysInMonth(currentMonth, currentYear)
                  }
                  onClick={() => {
                    if (
                      currentWeek * 7 <
                      daysInMonth(currentMonth, currentYear)
                    ) {
                      setCurrentWeek(currentWeek + 1);
                    }
                  }}
                >
                  <ChevronRightIcon />
                </IconButton>
              </li>
            </ul>
          </nav>
        </Grid>
        <Grid item xs={12}>
          Days
        </Grid>
      </Grid>
    </Fragment>
  );
}

const data03 = [
  { Date: "Dec 01 2016", Price: 109.49 },
  { Date: "Dec 02 2016", Price: 109.9 },
  { Date: "Dec 05 2016", Price: 109.11 },
  { Date: "Dec 06 2016", Price: 109.95 },
  { Date: "Dec 07 2016", Price: 111.03 },
  { Date: "Dec 08 2016", Price: 112.12 },
  { Date: "Dec 09 2016", Price: 113.95 },
  { Date: "Dec 12 2016", Price: 113.3 },
  { Date: "Dec 13 2016", Price: 115.19 },
  { Date: "Dec 14 2016", Price: 115.19 },
  { Date: "Dec 15 2016", Price: 115.82 },
  { Date: "Dec 16 2016", Price: 115.97 },
  { Date: "Dec 19 2016", Price: 116.64 },
  { Date: "Dec 20 2016", Price: 116.95 },
  { Date: "Dec 21 2016", Price: 117.06 },
  { Date: "Dec 22 2016", Price: 116.29 },
  { Date: "Dec 23 2016", Price: 116.52 },
  { Date: "Dec 27 2016", Price: 117.26 },
  { Date: "Dec 28 2016", Price: 116.76 },
  { Date: "Dec 29 2016", Price: 116.73 },
  { Date: "Dec 30 2016", Price: 115.82 },
];
