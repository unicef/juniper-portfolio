import React from "react";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import Block from "../../atoms/Block";
import ChartSummary from "../../molecules/Summary/ChartSummary";
import SummarySubtitle from "../../atoms/Text/SummarySubtitle";
import { dayNames, monthNames } from "../../../util";

const useStyles = makeStyles((theme) => ({
  organism: {
    backgroundColor: "#ffffff",
    paddingTop: 40,
    paddingLeft: 40,
  },
  dateTitle: {
    fontFamily: '"Cabin", sans-serif',
    textTransform: "uppercase",
    fontSize: 14,
    fontWeight: 700,
    lineHeight: 2,
    letterSpacing: 0.78,
    color: "#000000",
    marginBottom: 30,
  },
}));

export default function ({
  className,
  currentPrice,
  currentMonthAveragePrice,
  currentQuarter,
  quarterlyAverage,
  yearlyAverage,
  currentMonth,
  currentYear,
  chartData,
  domainMin,
  domainMax,
}) {
  const classes = useStyles();
  const theme = useTheme();
  const shortDate = (date) => {
    return `${dayNames[date.getDay()]}, ${date.getDate()} ${
      monthNames[date.getMonth()]
    } ${date.getFullYear()}`;
  };
  return (
    <Block className={`${classes.organism} ${className}`}>
      <Grid container>
        <Grid item xs={12}>
          <div className={classes.dateTitle}>{shortDate(new Date())}</div>
        </Grid>
        <Grid item xs={4}>
          <Grid container>
            <Grid item xs={12}>
              <ChartSummary
                subtitle={"Today's Average Price"} 
                title={currentPrice + ' USD'}
                isBold={true}
              />
            </Grid>
            <Grid item xs={12}>
              <ChartSummary
                subtitle={"Monthly Average Price"}
                title={`${currentMonthAveragePrice || 0} USD`}
              />
            </Grid>
            <Grid item xs={12}>
              <ChartSummary
                subtitle={`Q${currentQuarter} Average Price`}
                title={`${quarterlyAverage || 0} USD`}
              />
            </Grid>
            <Grid item xs={12}>
              <ChartSummary
                subtitle={`Last 52 Week Average Price`}
                title={`${yearlyAverage || 0} USD`}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={8} className={classes.chart}>
          <Grid container>
            <Grid item>
              <SummarySubtitle>
                Price Graph {currentMonth} {currentYear}
              </SummarySubtitle>
            </Grid>
            <Grid item>
              <LineChart
                width={575}
                height={250}
                data={chartData}
                margin={{ top: 40, right: 40, bottom: 20, left: 20 }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="Date"
                  axisLine={true}
                  tickLine={true}
                  ticks={
                    chartData.length > 0
                      ? [
                          chartData[0].Date,
                          chartData[Math.floor(chartData.length / 2)].Date,
                          chartData[chartData.length - 1].Date,
                        ]
                      : []
                  }
                />
                <YAxis
                  domain={[domainMin, domainMax]}
                  ticks={[
                    domainMin,
                    domainMin + (domainMax - domainMin) / 2,
                    domainMax,
                  ]}
                  axisLine={true}
                  tickLine={true}
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
    </Block>
  );
}
