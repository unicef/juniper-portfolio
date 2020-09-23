import React, { useState, useEffect, Fragment } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import PriceInfoBanner from "../../ui/PriceInfoBanner";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import IconButton from "@material-ui/core/IconButton";
import { usdFormatter, monthNames } from "../../util";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

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
  chartLine: {
    stroke: theme.palette.primary.main,
    color: theme.palette.primary.main,
  },
  currentMonth: {
    minWidth: 125,
    color: theme.palette.primary.main,
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
    marginBottom: 15,
  },
  customPagination: {
    color: theme.palette.primary.main,
    margin: 0,
    display: "flex",
    padding: 0,
    flexWrap: "wrap",
    listStyle: "none",
    alignItems: "center",
  },
  chartArea: {
    backgroundColor: "#ffffff",
    paddingTop: 40,
    paddingLeft: 40,
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
  weekdays: {
    backgroundColor: "#ffffff",
    paddingTop: 25,
    paddingBottom: 25,
    paddingLeft: 8,
    paddingRight: 8,
  },
  weekTitle: {
    fontFamily: '"Roboto", sans-serif',
    fontSize: 24,
  },
  weekday: {
    cursor: "pointer",
    maxWidth: 125,
    minWidth: 125,
    display: "inline-block",
    paddingLeft: 10,
    paddingRight: 10,
    "&:hover": {
      backgroundColor: "#ecfaff",
    },
  },
}));

export default function PriceCheckerLayout(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [prices, setPrices] = useState([]);
  const thisDay = new Date().getDate();
  const thisMonth = new Date().getMonth();
  const thisYear = new Date().getFullYear();

  const [currentWeek, setCurrentWeek] = useState(
    Math.ceil(new Date().getDate() / 7)
  );
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const [currentMonthAveragePrice, setCurrentMonthAveragePrice] = useState(0);

  const shortDate = (date) => {
    return `${date.getDate()} ${
      monthNames[date.getMonth()]
    } ${date.getFullYear()}`;
  };

  const daysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
  };

  const getQuarterOfYear = (month) => {
    return Math.floor((month + 3) / 3);
  };

  const currentQuarter = () => {
    return getQuarterOfYear(currentMonth);
  };

  const daysInQuarter = (quarter, year) => {
    switch (quarter) {
      case 1:
        return (
          daysInMonth(0, year) + daysInMonth(1, year) + daysInMonth(2, year)
        );
      case 2:
        return (
          daysInMonth(3, year) + daysInMonth(4, year) + daysInMonth(5, year)
        );
      case 3:
        return (
          daysInMonth(6, year) + daysInMonth(7, year) + daysInMonth(8, year)
        );
      case 4:
        return (
          daysInMonth(9, year) + daysInMonth(10, year) + daysInMonth(11, year)
        );
      default:
    }
  };

  const daysPastInThisQuarter = () => {
    let month = 0;
    let days = 0;
    switch (currentQuarter()) {
      case 1:
        month = 0;
        while (month < thisMonth) {
          days += daysInMonth(month, thisYear);
          month++;
        }
        days += new Date().getDate();

        break;
      case 2:
        month = 3;
        while (month < thisMonth) {
          days += daysInMonth(month, thisYear);
          month++;
        }
        days += new Date().getDate();

        break;
      case 3:
        month = 6;
        while (month < thisMonth) {
          days += daysInMonth(month, thisYear);
          month++;
        }
        days += new Date().getDate();

        break;
      case 4:
        month = 9;
        while (month < thisMonth) {
          days += daysInMonth(month, thisYear);
          month++;
        }
        days += new Date().getDate();

        break;
      default:
    }

    return days;
  };

  const getQuarterlyAverage = () => {
    const thisQuarter = getQuarterOfYear(thisMonth, thisYear);
    const daysInThisQuarter = daysPastInThisQuarter(); // calc
    const quarter = currentQuarter();

    let days = 0;

    if (currentYear === thisYear && quarter === thisQuarter) {
      days = daysInThisQuarter;
    } else {
      days = daysInQuarter(quarter, currentYear);
    }

    if (quarter === 1) {
      return Math.round(
        props.prices
          .filter((price) => {
            return (
              price.year === currentYear &&
              (price.month === 0 || price.month === 1 || price.month === 2)
            );
          })
          .reduce((a, b) => {
            return a + b.price;
          }, 0) / days
      );
    } else if (quarter === 2) {
      return Math.round(
        props.prices
          .filter((price) => {
            return (
              price.year === currentYear &&
              (price.month === 3 || price.month === 4 || price.month === 5)
            );
          })
          .reduce((a, b) => {
            return a + b.price;
          }, 0) / days
      );
    } else if (quarter === 3) {
      return Math.round(
        props.prices
          .filter((price) => {
            return (
              price.year === currentYear &&
              (price.month === 6 || price.month === 7 || price.month === 8)
            );
          })
          .reduce((a, b) => {
            return a + b.price;
          }, 0) / days
      );
    } else if (quarter === 4) {
      return Math.round(
        props.prices
          .filter((price) => {
            return (
              price.year === currentYear &&
              (price.month === 9 || price.month === 10 || price.month === 11)
            );
          })
          .reduce((a, b) => {
            return a + b.price;
          }, 0) / days
      );
    }
  };

  const updateMonthlyAverage = (month = currentMonth, year = currentYear) => {
    setCurrentMonthAveragePrice(
      props.prices
        .filter((price) => {
          return price.month === month && price.year === year;
        })
        .reduce((a, b) => {
          return a + b.price;
        }, 0) / daysInMonth(month, year)
    );
  };

  useEffect(() => {
    if (props.prices && props.prices.length > 0) {
      setPrices(
        props.prices.map((price) => {
          return {
            day: price.day,
            month: price.month,
            year: price.year,
            Date: `${price.day}/${price.month}/${price.year}`,
            Price: price.price,
          };
        })
      );

      updateMonthlyAverage();
    }
  }, [props.prices]);

  function Weekday({ offset }) {
    const totalDaysInMonth = daysInMonth(currentMonth, currentYear);

    const day = currentWeek * 7 - offset;

    if (day > totalDaysInMonth) {
      return null;
    }

    if (
      props.prices
        .filter((price) => {
          return (
            price.day === day &&
            price.month === currentMonth &&
            price.year === currentYear
          );
        })
        .reduce((a, b) => {
          return a + b ? b.price : 0;
        }, 0) === 0
    ) {
      return null;
    }

    return (
      <div className={classes.weekday}>
        <div className={classes.subtitle}>
          {day} {monthNames[currentMonth].slice(0, 3)} {currentYear}
        </div>

        <div className={classes.weekTitle}>
          {usdFormatter.format(
            props.prices
              .filter((price) => {
                return (
                  price.day === day &&
                  price.month === currentMonth &&
                  price.year === currentYear
                );
              })
              .reduce((a, b) => {
                return a + b ? b.price : 0;
              }, 0)
          )}
        </div>
      </div>
    );
  }

  if (!props.prices) {
    return null;
  }

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
                      updateMonthlyAverage(11, currentYear - 1);
                    } else {
                      setCurrentMonth(currentMonth - 1);
                      updateMonthlyAverage(currentMonth - 1);
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
                      updateMonthlyAverage(0, currentYear + 1);
                    } else {
                      setCurrentMonth(currentMonth + 1);
                      updateMonthlyAverage(currentMonth + 1);
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
            <Grid item xs={4}>
              <Grid container>
                <Grid item className={classes.chartPrices}>
                  <div className={classes.subtitle}>Today's Current Price</div>
                  <div className={classes.chartTitle}>
                    <b>{usdFormatter.format(props.currentPrice)}</b>
                  </div>
                </Grid>
                <Grid item className={classes.chartPrices}>
                  <div className={classes.subtitle}>Monthly Average Price</div>
                  <div className={classes.chartTitle}>
                    {usdFormatter.format(currentMonthAveragePrice)} USD
                  </div>
                </Grid>
                <Grid item className={classes.chartPrices}>
                  <div className={classes.subtitle}>
                    Q{currentQuarter()} Average Price
                  </div>
                  <div className={classes.chartTitle}>
                    {usdFormatter.format(getQuarterlyAverage())} USD
                  </div>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={8} className={classes.chart}>
              <Grid container>
                <Grid item>
                  <div
                    className={classes.subtitle}
                    style={{ marginLeft: "4em" }}
                  >
                    Price Graph {monthNames[currentMonth]} {currentYear}
                  </div>
                </Grid>
                <Grid item>
                  <LineChart
                    width={575}
                    height={250}
                    data={prices.filter((price) => {
                      return (
                        price.month === currentMonth &&
                        price.year === currentYear
                      );
                    })}
                    margin={{ top: 40, right: 40, bottom: 20, left: 20 }}
                  >
                    <XAxis dataKey="Date" />
                    <YAxis
                      domain={["auto", "auto"]}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      wrapperStyle={{
                        borderColor: "white",
                        boxShadow: "2px 2px 3px 0px rgb(204, 204, 204)",
                      }}
                      labelStyle={{ fontWeight: "bold", color: "#666666" }}
                    />
                    <Line
                      dataKey="Price"
                      stroke={theme.palette.primary.main}
                      strokeWidth={3}
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
                  disabled={currentWeek === 1}
                  color="inherit"
                  onClick={() => {
                    if (currentWeek !== 1) {
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
        <Grid item xs={12} className={classes.weekdays}>
          <Weekday offset={6} />
          <Weekday offset={5} />
          <Weekday offset={4} />
          <Weekday offset={3} />
          <Weekday offset={2} />
          <Weekday offset={1} />
          <Weekday offset={0} />
        </Grid>
      </Grid>
    </Fragment>
  );
}
