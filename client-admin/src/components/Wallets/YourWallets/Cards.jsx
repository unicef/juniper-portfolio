import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import CopyIcon from "./CopyIcon";

// TODO, consider breaking up per card but a lot of styling is shared
const cardStyles = makeStyles((theme) => ({
  balances: {
    fontFamily: "Roboto",
  },
  fees: {
    fontFamily: "Roboto",
  },
  totals: {
    fontFamily: "Roboto",
  },
  feeSummary: {
    opacity: 0.5,
    minHeight: 110,
  },
  balanceSummary: {
    minHeight: 110,
  },
  totalsSummary: {
    display: "flex",
    direction: "columns",
  },
  balance: {
    color: "#000000",
    fontSize: 24,
    fontWeight: 700,
    margin: 0,
  },
  balanceUSD: {
    color: "#000000",
    fontSize: 24,
    fontWeight: 400,
    margin: 0,
  },
  currency: {
    fontSize: 10,
    fontWeight: 500,
    textTransform: "uppercase",
    color: "#000000",
  },
  divider: {
    color: "#000000",
    marginRight: "3em",

    marginBottom: "1em",
    height: 2,
  },
  balanceTotals: {},
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
    fontSize: 10,
    fontWeight: 500,
    marginTop: 0,
    textTransform: "uppercase",
  },
  totalInvested: {
    fontSize: 18,
    color: "#374ea2",
    textTransform: "uppercase",
    marginBottom: 0,
  },
  totalFees: {
    fontSize: 18,
    textTransform: "uppercase",
    marginBottom: 0,
  },
  invested: {
    fontSize: 10,
    fontWeight: 500,
    marginTop: 0,
    textTransform: "uppercase",
  },
  bigDot: {
    borderRadius: "50%",
    width: 108,
    height: 108,
    backgroundColor: "#00aeef",
  },
  littleDot: {
    borderRadius: "50%",
    width: 74,
    height: 74,
    backgroundColor: "#374ea2",
    marginLeft: 15,
  },
}));

function BalanceCard({ received, invested, balanceUSD, currency, symbol }) {
  const classes = cardStyles();
  return (
    <div className={classes.balances}>
      <div className={classes.balanceSummary}>
        <h2 className={classes.balance}>
          {received - invested} {symbol}
        </h2>
        <h2 className={classes.balanceUSD}>{balanceUSD} USD</h2>
        <p className={classes.currency}>Current {currency} balance</p>
      </div>
      <Divider className={classes.divider} />
      <div className={classes.balanceTotals}>
        <p className={classes.totalReceived}>
          {received} {symbol}
        </p>
        <p className={classes.received}>Received</p>
        <p className={classes.totalInvested}>
          {invested} {symbol}
        </p>
        <p className={classes.invested}>Invested</p>
      </div>
    </div>
  );
}

function TxFeeCard({ amountUSD, amountETH, amountBTC }) {
  const classes = cardStyles();
  return (
    <div className={classes.fees}>
      <div className={classes.feeSummary}>
        <h2 className={classes.balance}>{amountUSD} USD</h2>
        <p className={classes.currency}>Total transaction fee</p>
      </div>
      <Divider className={classes.divider} />
      <div className={classes.feeTotals}>
        <p className={classes.totalFees}>{amountBTC} BTC</p>
        <p className={classes.received}>Total BTC Transaction Fee</p>
        <p className={classes.totalFees}>{amountETH} ETH</p>
        <p className={classes.invested}>Total ETH Transaction Fee</p>
      </div>
    </div>
  );
}

function TotalCard({ received, invested }) {
  const classes = cardStyles();
  return (
    <div className={classes.totals}>
      <div className={classes.totalsSummary}>
        <div className={classes.bigDot}></div>
        <div className={classes.littleDot}></div>
      </div>
      <div className={classes.balanceTotals}>
        <p className={classes.totalReceived}>{received} USD</p>
        <p className={classes.received}>Total Crypto Received</p>
        <p className={classes.totalInvested}>{invested} USD</p>
        <p className={classes.invested}>Total Crypto Invested</p>
      </div>
    </div>
  );
}

const walletStyles = makeStyles((theme) => ({
  wallet: {
    backgroundColor: "#ffffff",
    fontFamily: "Roboto",
    paddingTop: 10,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 25,
    "& .MuiButton-endIcon": {
      margin: 0,
    },
    "& .MuiButton-startIcon": {
      margin: 0,
    },
  },
  name: {
    fontSize: 24,
    fontWeight: 700,
    lineHeight: 1.17,
    color: "#000000",
    marginBottom: 10,
  },
  chip: {
    borderRadius: 5,
    fontFamily: "Cabin",
    fontSize: 10,
    fontWeight: 500,
    letterSpacing: 0.83,
    color: "#898989",
    textTransform: "uppercase",
    marginRight: "1em",
  },
  walletBalance: {
    fontSize: 18,
    marginTop: 18,
    lineHeight: 1.33,
  },
  currencyBalance: {
    fontWeight: 700,
  },
  walletSubtitle: {
    fontFamily: "Cabin",
    color: "#000000",
    marginTop: 6,
    letterSpacing: 0.83,
    fontSize: 10,
    fontWeight: 500,
    textTransform: "uppercase",
  },
  address: {
    marginTop: 20,
    fontFamily: "Roboto",
    fontSize: 14,
    fontWeight: 700,
    lineHeight: 1.57,
    color: "#000000",
  },
  buttons: {
    marginTop: 30,
    clear: "both",
  },
  leftButton: {
    fontSize: 12,
    fontWeight: 700,
    fontFamily: "Cabin",
    color: "#00aeef",
  },
  rightButton: {
    float: "right",
    fontSize: 12,
    fontWeight: 700,
    fontFamily: "Cabin",
    color: "#00aeef",
  },
}));

function WalletCard({
  name,
  currency,
  tags,
  symbol,
  amount,
  amountUSD,
  address,
}) {
  const classes = walletStyles();

  const copyToClipboard = (text) => {
    const el = document.createElement("textarea");
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  };

  return (
    <div className={classes.wallet}>
      <h2 className={classes.name}>{name}</h2>
      {tags.map((tag) => {
        return (
          <Chip
            key={tag}
            variant="outlined"
            size="small"
            label={tag}
            className={classes.chip}
          />
        );
      })}
      <div className={classes.walletBalance}>
        <span className={classes.currencyBalance}>
          {amount} {symbol}
        </span>{" "}
        / {amountUSD} USD
      </div>
      <div className={classes.walletSubtitle}>Wallet Balance</div>
      <div className={classes.address}>{address}</div>
      <div className={classes.walletSubtitle}>Wallet Address</div>
      <div className={classes.buttons}>
        <Button
          className={classes.leftButton}
          startIcon={<CopyIcon />}
          onClick={() => {
            copyToClipboard(address);
          }}
        >
          Copy Address
        </Button>
        <Button className={classes.rightButton} endIcon={<ChevronRightIcon />}>
          View Transaction
        </Button>
      </div>
    </div>
  );
}

export { BalanceCard, TxFeeCard, TotalCard, WalletCard };
