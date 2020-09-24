import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import { usdFormatter } from "../../util";

const useStyles = makeStyles((theme) => ({
  totals: {
    fontFamily: '"Roboto", sans-serif',
  },
  totalsSummary: {
    display: "flex",
    direction: "columns",
  },
  totalTooltip: {
    cursor: "pointer",
  },
  btcDot: {
    borderRadius: "50%",
    backgroundColor: "#00aeef",
  },
  ethDot: {
    borderRadius: "50%",
    backgroundColor: "#374ea2",
    marginLeft: 15,
  },
  feeTotals: {
    opacity: 0.5,
  },
  totalReceived: {
    fontSize: 18,
    color: "#00aaef",
    textTransform: "uppercase",
    marginBottom: 0,
  },
  received: {
    fontFamily: '"Cabin", sans-serif',
    color: "#000000",
    marginTop: 6,
    letterSpacing: 0.83,
    fontSize: 10,
    fontWeight: 500,
    textTransform: "uppercase",
  },
  totalInvested: {
    fontSize: 18,
    color: "#374ea2",
    textTransform: "uppercase",
    marginBottom: 0,
  },
  invested: {
    fontFamily: '"Cabin", sans-serif',
    color: "#000000",
    marginTop: 6,
    letterSpacing: 0.83,
    fontSize: 10,
    fontWeight: 500,
    textTransform: "uppercase",
  },
}));

export default function TotalCard({
  received,
  invested,
  ethReceivedUSD,
  btcReceivedUSD,
  ethSentUSD,
  btcSentUSD,
}) {
  const classes = useStyles();
  const totalSentUSD = ethSentUSD + btcSentUSD;

  let ethPercentage;
  let btcPercentage;

  if (totalSentUSD === 0) {
    ethPercentage = 0.5;
    btcPercentage = 0.5;
  } else {
    ethPercentage = Math.round((ethSentUSD / totalSentUSD) * 100) / 100;
    btcPercentage = Math.round((btcSentUSD / totalSentUSD) * 100) / 100;
  }
  return (
    <div className={classes.totals}>
      <div className={classes.totalsSummary}>
        <Tooltip
          className={classes.totalTooltip}
          title={`Bitcoin: ${usdFormatter.format(
            btcSentUSD
          )}: ${btcPercentage.toFixed(2)}%`}
        >
          <div
            className={classes.btcDot}
            style={{
              height: Math.max(100 * btcPercentage || 0, 20),
              width: Math.max(100 * btcPercentage || 0, 20),
            }}
          ></div>
        </Tooltip>
        <Tooltip
          className={classes.totalTooltip}
          title={`Ethereum: ${usdFormatter.format(
            ethSentUSD
          )}: ${ethPercentage.toFixed(2)}%`}
        >
          <div
            className={classes.ethDot}
            style={{
              height: Math.max(100 * ethPercentage || 0, 20),
              width: Math.max(100 * ethPercentage || 0, 20),
            }}
          ></div>
        </Tooltip>
      </div>
      <div className={classes.balanceTotals}>
        <p className={classes.totalReceived}>
          {usdFormatter.format(received)} USD
        </p>
        <p className={classes.received}>Total Crypto Received</p>
        <p className={classes.totalInvested}>
          {usdFormatter.format(invested)} USD
        </p>
        <p className={classes.invested}>Total Crypto Invested</p>
      </div>
    </div>
  );
}
