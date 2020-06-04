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

  // useEffect(() => {
  //   getBitcoinPrice();
  //   getEtherPrice();
  // }, []);
  function getBitcoinPrice() {
    // getting price from coinbase pro, bitstamp, and binance
    // return averagePrice(
    //   getExchangePrice('http://api.binance.com/api/v1/ticker/price?symbol=BTCUSDT')
    //   , getExchangePrice('http://api.pro.coinbase.com/products/BTC-USD/ticker')
    //   , getExchangePrice('http://www.bitstamp.net/api/v2/ticker/btcusd')
    // )
    setBitcoinPrice(8739.79);
  }
  async function getEtherPrice() {
    console.log(
      await getExchangePrice("coinmarketcap-nexuist.rhcloud.com", "/api/eth")
    );
    console
      .log
      // parsePrice(await getExchangePrice('http://api.binance.com/api/v1/ticker/price?symbol=ETHUSDT'))
      // , parsePrice(await getExchangePrice('http://api.pro.coinbase.com/products/ETH-USD/ticker'))
      // , parsePrice(await getExchangePrice('http://www.bitstamp.net/api/v2/ticker/ethusd'))
      ();
    setEtherPrice(209.05);

    // return averagePrice(
    //   getExchangePrice('http://api.binance.com/api/v1/ticker/price?symbol=ETHUSDT')
    //   , getExchangePrice('http://api.pro.coinbase.com/products/ETH-USD/ticker')
    //   , getExchangePrice('http://www.bitstamp.net/api/v2/ticker/ethusd')
    // )
  }
  async function getExchangePrice(url: string, path: string) {
    http.get(
      {
        host: url,
        path: path,
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
          console.log(parsed.price.usd);
        });
      }
    );
  }

  // function parsePrice(value: any) {
  //   console.log(value);
  //   return value ? value.price : null;
  // }

  //   function averagePrice(price1: any, price2: any, price3: any) {
  //     console.log(parsePrice(price1), parsePrice(price2), parsePrice(price3))
  //     return 1
  //     // if(isNaN(price1)) {
  //     //     return (price2 + price3) / 2
  //     // } else if(isNaN(price2)) {
  //     //     return (price1 + price3) / 2
  //     // } else if(isNaN(price3)) {
  //     //     return (price1 + price2) / 2
  //     // } else if(isNaN(price1) && isNaN(price2)) {
  //     //     return price3
  //     // } else if(isNaN(price1) && isNaN(price3)) {
  //     //     return price2
  //     // } else if(isNaN(price2) && isNaN(price3)) {
  //     //     return price1
  //     // } else if(isNaN(price1) && isNaN(price2) && isNaN(price3)) {
  //     //     return null
  //     // } else {
  //     //     return (price1 + price2 + price3) / 3
  //     // }
  // }
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
                ${etherPrice.toFixed(2)} (USD)
              </span>
              <span
                style={{ marginLeft: "25px" }}
                className={classes.cryptoText}
              >
                {" "}
                1 Bitcoin{" "}
              </span>{" "}
              <span className={classes.priceText}>
                ${bitcoinPrice.toFixed(2)} (USD)
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
