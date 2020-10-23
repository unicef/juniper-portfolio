import React, { useState, useEffect, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import { usdFormatter, monthNames } from "../../util";

import PriceInfo from "../molecules/Info/PriceInfo";
import PageTitle from "../atoms/Text/PageTitle";
import PageSubtitle from "../atoms/Text/PageSubtitle";
import LeftRightButton from "../molecules/Button/LeftRight";
import ChartArea from "../organisms/Chart";

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
    marginBottom: 15,
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
      backgroundColor: theme.palette.primary.textButtonHover,
    },
  },
}));

export default function (props) {
  const classes = useStyles();
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

  // TODO make all of these utilities/constants
  const shortDate = (date) => {
    return `${date.getDate()} ${
      monthNames[date.getMonth()]
    } ${date.getFullYear()}`;
  };

  const daysInMonth = (month, year) => {
    if (thisMonth === month) {
      return new Date(thisYear, thisMonth, thisDay).getDate();
    } else {
      return new Date(year, month, 0).getDate();
    }
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

  const yearlyAverage = () => {
    console.log(
      prices.reduce((a, b) => {
        return a + b.Price;
      }, 0) / prices.length
    );
    return (
      prices.reduce((a, b) => {
        return a + b.Price;
      }, 0) / prices.length
    );
  };

  const quarterlyAverage = () => {
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
      const prices = props.prices.filter((price) => {
        return (
          price.year === currentYear &&
          (price.month === 0 || price.month === 1 || price.month === 2)
        );
      });
      return Math.round(
        prices.reduce((a, b) => {
          return a + b.average;
        }, 0) / prices.length
      );
    } else if (quarter === 2) {
      const prices = props.prices.filter((price) => {
        return (
          price.year === currentYear &&
          (price.month === 3 || price.month === 4 || price.month === 5)
        );
      });
      return Math.round(
        prices.reduce((a, b) => {
          return a + b.average;
        }, 0) / prices.length
      );
    } else if (quarter === 3) {
      const prices = props.prices.filter((price) => {
        return (
          price.year === currentYear &&
          (price.month === 6 || price.month === 7 || price.month === 8)
        );
      });
      return Math.round(
        prices.reduce((a, b) => {
          return a + b.average;
        }, 0) / prices.length
      );
    } else if (quarter === 4) {
      const prices = props.prices.filter((price) => {
        return (
          price.year === currentYear &&
          (price.month === 9 || price.month === 10 || price.month === 11)
        );
      });
      return Math.round(
        prices.reduce((a, b) => {
          return a + b.average;
        }, 0) / prices.length
      );
    }
  };

  const updateMonthlyAverage = (month = currentMonth, year = currentYear) => {
    const days = props.prices.filter((price) => {
      return price.month === month && price.year === year;
    });
    setCurrentMonthAveragePrice(
      days.reduce((a, b) => {
        return a + b.average;
      }, 0) / days.length
    );
  };

  const decrementMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
      updateMonthlyAverage(11, currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
      updateMonthlyAverage(currentMonth - 1);
    }
  };

  const incrementMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
      updateMonthlyAverage(0, currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
      updateMonthlyAverage(currentMonth + 1);
    }
  };

  const decrementWeek = () => {
    if (currentWeek !== 1) {
      setCurrentWeek(currentWeek - 1);
    }
  };

  const incrementWeek = () => {
    if (currentWeek * 7 < daysInMonth(currentMonth, currentYear)) {
      setCurrentWeek(currentWeek + 1);
    }
  };

  useEffect(() => {
    if (props.prices && props.prices.length > 0) {
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
      setPrices(
        props.prices
          .filter((price) => {
            return new Date(price.timestamp) > oneYearAgo;
          })
          .map((price) => {
            return {
              day: price.day,
              month: price.month,
              year: price.year,
              Date: `${price.day}/${price.month}/${price.year}`,
              Price: price.average,
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
          return a + b ? b.average : 0;
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
                return a + b ? b.average : 0;
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
      <PriceInfo />
      <Grid container>
        <Grid item xs={12}>
          <PageTitle>{props.currency} price overview</PageTitle>
          <PageSubtitle>{shortDate(new Date())}</PageSubtitle>
        </Grid>
        <Grid item xs={12}>
          <LeftRightButton
            text={`${monthNames[currentMonth]} ${currentYear}`}
            clickLeft={decrementMonth}
            disabledRight={
              thisMonth === currentMonth && thisYear === currentYear
            }
            clickRight={incrementMonth}
          />
        </Grid>
        <Grid item xs={12}>
          <ChartArea
            currentPrice={usdFormatter.format(props.currentPrice)}
            currentMonth={monthNames[currentMonth]}
            currentYear={currentYear}
            chartData={prices.filter((price) => {
              return price.month === currentMonth && price.year === currentYear;
            })}
            domainMin={
              Math.floor(
                prices.reduce(
                  (a, b) => {
                    return a.Price < b.Price ? a : b;
                  },
                  { Price: 1e18 }
                ).Price / 1000
              ) * 1000
            }
            domainMax={
              Math.ceil(
                prices.reduce(
                  (a, b) => {
                    return a.Price > b.Price ? a : b;
                  },
                  { Price: -1e18 }
                ).Price / 1000
              ) * 1000
            }
            currentMonthAveragePrice={usdFormatter.format(
              currentMonthAveragePrice || 0
            )}
            currentQuarter={currentQuarter()}
            quarterlyAverage={usdFormatter.format(quarterlyAverage() || 0)}
            yearlyAverage={usdFormatter.format(yearlyAverage() || 0)}
          />
        </Grid>

        <Grid item xs={12}>
          <LeftRightButton
            text={`Week ${currentWeek}`}
            clickLeft={decrementWeek}
            disabledLeft={currentWeek === 1}
            disabledRight={
              currentWeek * 7 >= daysInMonth(currentMonth, currentYear)
            }
            clickRight={incrementWeek}
          />
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
