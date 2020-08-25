import React, { useState, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import PriceInfoBanner from "../../ui/PriceInfoBanner";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Pagination from "@material-ui/lab/Pagination";
import IconButton from "@material-ui/core/IconButton";

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
    marginBottom: 38,
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
    display: "block",
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
}));

export default function PriceCheckerLayout(props) {
  const classes = useStyles();
  const thisMonth = new Date().getMonth();
  const thisYear = new Date().getFullYear();

  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const shortDate = (date) => {
    return `${date.getDate()} ${
      monthNames[date.getMonth()]
    } ${date.getFullYear()}`;
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

        <Grid item xs={12}>
          Chart
        </Grid>
        <Grid item xs={12}>
          Week selector
        </Grid>
        <Grid item xs={12}>
          Days
        </Grid>
      </Grid>
    </Fragment>
  );
}
