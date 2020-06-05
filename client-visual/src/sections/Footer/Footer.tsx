import React, { useEffect, useState } from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import {
  IconButton,
  Toolbar,
  CssBaseline,
  AppBar,
  useMediaQuery,
} from "@material-ui/core";
import { Twitter as TwitterIcon, Mail as MailIcon } from "@material-ui/icons";
import http from "http";
import json2mq from "json2mq";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    text: {
      padding: theme.spacing(2, 2, 0),
    },
    paper: {
      paddingBottom: 50,
    },
    list: {
      marginBottom: theme.spacing(2),
    },
    subheader: {
      backgroundColor: theme.palette.background.paper,
    },
    appBar: {
      top: "auto",
      bottom: 0,
    },
    grow: {
      flexGrow: 1,
    },
    cryptoText: {
      fontFamily: '"IBM Plex Sans", sans-serif',
      fontSize: "16px",
      fontWeight: "bold",
      fontStretch: "normal",
      fontStyle: "normal",
      lineHeight: "1.44",
      letterSpacing: "normal",
      color: "#ffffff",
    },
    priceText: {
      fontFamily: '"IBM Plex Sans", sans-serif',
      fontSize: "16px",
      fontWeight: "normal",
      fontStretch: "normal",
      fontStyle: "normal",
      lineHeight: "1.44",
      letterSpacing: "normal",
      color: "#ffffff",
    },
  })
);

export default function Footer() {
  const classes = useStyles();
  const matches = useMediaQuery(
    json2mq({
      minWidth: 800,
    })
  );
  const [bitcoinPrice, setBitcoinPrice] = useState(0);
  const [etherPrice, setEtherPrice] = useState(0);

  useEffect(() => {
    async function fetchBtc() {
      http.get(
        {
          host: "api.coinbase.com",
          path: "/v2/prices/spot?currency=USD",
        },
        function (response) {
          // Continuously update stream with data
          var body = "";
          response.on("data", function (d) {
            body += d;
          });
          response.on("end", function () {
            // Data reception is done, do whatever with it!
            var parsed = JSON.parse(body);
            setBitcoinPrice(parsed.data.amount);
          });
        }
      );
    }
    fetchBtc();
  });
  useEffect(() => {
    async function fetchEth() {
      http.get(
        {
          host: "api.coinbase.com",
          path: "/v2/exchange-rates?currency=ETH",
        },
        function (response) {
          // Continuously update stream with data
          var body = "";
          response.on("data", function (d) {
            body += d;
          });
          response.on("end", function () {
            // Data reception is done, do whatever with it!
            var parsed = JSON.parse(body);
            // console.log(parsed);
            setEtherPrice(parsed.data.rates.USD);
          });
        }
      );
    }
    fetchEth();
  });

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        style={{ marginTop: "500px" }}
        position="fixed"
        color="primary"
        className={classes.appBar}
      >
        <Toolbar variant="dense">
          {matches ? (
            <div>
              <span className={classes.cryptoText}>1 Ether </span>{" "}
              <span className={classes.priceText}>
                ${etherPrice ? etherPrice : 0} (USD)
              </span>
              <span
                style={{ marginLeft: "25px" }}
                className={classes.cryptoText}
              >
                {" "}
                1 Bitcoin{" "}
              </span>{" "}
              <span className={classes.priceText}>
                ${bitcoinPrice ? bitcoinPrice : 0} (USD)
              </span>
            </div>
          ) : null}
          <div className={classes.grow} />
          <IconButton href="https://twitter.com/unicefinnovate" color="inherit">
            <TwitterIcon />
          </IconButton>
          <IconButton
            href="mailto:blockchain@unicef.org"
            edge="end"
            color="inherit"
          >
            <MailIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
