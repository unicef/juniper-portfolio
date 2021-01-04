import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Modal from "../../atoms/Modal";
import Block from "../../atoms/Block";
import CancelIcon from "../../atoms/Icons/CancelIcons";
import PriceIcon from "../../atoms/Icons/PriceIcon";
import CardBalance from "../../atoms/Text/CardBalance";
import SummarySubtitle from "../../atoms/Text/SummarySubtitle";
import PriceContext from "../../../context/PriceContext";
import { usdFormatter, cryptoFormatter } from "../../../util";

const useStyles = makeStyles((theme) => ({
  closeIcon: {
    position: "absolute",
    right: 8,
    top: 8,
    cursor: "pointer",
  },
  modal: {
    fontFamily: '"Roboto", sans-serif',
  },
  infoBox: {
    backgroundColor: "#daf5ff",
    padding: "30px 44px 40px 44px",
  },
  box: {
    padding: "30px 44px 40px 44px",
  },
  title: {
    margin: 0,
    fontSize: 19,
    fontWeight: 700,
    lineHeight: 1.72,
    display: "flex",
    flexDirection: "rows",
    alignItems: "center",
    justifyContent: "left",
  },
  priceIcon: {
    marginLeft: 4,
    marginRight: 4,
  },
  info: {
    fontSize: 19,
    lineHeight: 1.42,
    marginBottom: 0,
  },
  card: {
    marginRight: "3em",
  },
  balance: {
    fontWeight: 700,
  },
  divider: {
    marginTop: 24,
    marginBottom: 24,
    color: "#adadad",
  },
}));

export default function PriceModal({ open, setOpen, children }) {
  const classes = useStyles();
  const { prices } = useContext(PriceContext);

  if (!prices.bitcoin || !prices.ethereum) {
    return null;
  }

  const { bitcoin, ethereum } = prices;

  const btc = bitcoin[bitcoin.length - 1];
  const eth = ethereum[ethereum.length - 1];

  return (
    <div>
      {children}
      <Modal
        className={classes.modal}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <CancelIcon
          className={classes.closeIcon}
          onClick={() => {
            setOpen(false);
          }}
        />
        <Block className={classes.infoBox}>
          <h3 className={classes.title}>
            Cryptocurrency <PriceIcon className={classes.priceIcon} /> USD price
          </h3>
          <p className={classes.info}>
            Average USD price being dislayed on Juniper is a simple average of
            Bitcoin and Ether prices across three cryotoexchanges. The price is
            calculated each day at 12:01 pm (UTC)
          </p>
        </Block>
        <Block className={classes.box}>
          <Grid container>
            <Grid item xs={4} className={classes.card}>
              <CardBalance className={classes.balance}>
                {usdFormatter(eth.average)} USD
              </CardBalance>
              <SummarySubtitle>Today's Ether Price</SummarySubtitle>
              <Divider className={classes.divider} />
              <CardBalance>{usdFormatter(eth.binance)} USD</CardBalance>
              <SummarySubtitle>Binance Price</SummarySubtitle>
              <CardBalance>{usdFormatter(eth.coinbase)} USD</CardBalance>
              <SummarySubtitle>Coinbase Pro Price</SummarySubtitle>
              <CardBalance>{usdFormatter(eth.bitstamp)} USD</CardBalance>
              <SummarySubtitle>Bitstamp Pro Price</SummarySubtitle>
            </Grid>
            <Grid item xs={4} className={classes.card}>
              <CardBalance className={classes.balance}>
                {usdFormatter(btc.average)} USD
              </CardBalance>
              <SummarySubtitle>Today's Bitcoin Price</SummarySubtitle>
              <Divider className={classes.divider} />
              <CardBalance>{usdFormatter(btc.binance)} USD</CardBalance>
              <SummarySubtitle>Binance Price</SummarySubtitle>
              <CardBalance>{usdFormatter(btc.coinbase)} USD</CardBalance>
              <SummarySubtitle>Coinbase Pro Price</SummarySubtitle>
              <CardBalance>{usdFormatter(btc.bitstamp)} USD</CardBalance>
              <SummarySubtitle>Bitstamp Pro Price</SummarySubtitle>
            </Grid>
          </Grid>
        </Block>
      </Modal>
    </div>
  );
}
