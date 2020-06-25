import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Tooltip from "@material-ui/core/Tooltip";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import EditIcon from "@material-ui/icons/Edit";
import TxArrowIcon from "./icons/TxArrowIcon";
import CopyIcon from "./icons/CopyIcon";

// TODO These are the obvious WET components in the Wallets section.
// Common components can be refactored out of these + requirements from
// other sections.

const usdFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
});
const cryptoFormatter = new Intl.NumberFormat({ maximumSignificantDigits: 5 });

const cardStyles = makeStyles((theme) => ({
  balances: {
    fontFamily: '"Roboto", sans-serif',
  },
  fees: {
    fontFamily: '"Roboto", sans-serif',
  },
  totals: {
    fontFamily: '"Roboto", sans-serif',
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
  totalTooltip: {
    cursor: "pointer",
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
  btcDot: {
    borderRadius: "50%",
    backgroundColor: "#00aeef",
  },
  ethDot: {
    borderRadius: "50%",

    backgroundColor: "#374ea2",
    marginLeft: 15,
  },
}));

function BalanceCard({
  received,
  invested,
  balance,
  balanceUSD,
  currency,
  symbol,
}) {
  const classes = cardStyles();
  return (
    <div className={classes.balances}>
      <div className={classes.balanceSummary}>
        <h2 className={classes.balance}>
          {balance} {symbol}
        </h2>
        <h2 className={classes.balanceUSD}>{balanceUSD} USD</h2>
        <p className={classes.currency}>Current {currency} balance</p>
      </div>
      <Divider className={classes.divider} />
      <div className={classes.balanceTotals}>
        <p className={classes.totalReceived}>
          {Math.round(received * 1e8) / 1e8} {symbol}
        </p>
        <p className={classes.received}>Received</p>
        <p className={classes.totalInvested}>
          {Math.round(invested * 1e8) / 1e8} {symbol}
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
        <h2 className={classes.balance}>
          {usdFormatter.format(amountUSD)} USD
        </h2>
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

function TotalCard({
  received,
  invested,
  ethReceivedUSD,
  btcReceivedUSD,
  ethSentUSD,
  btcSentUSD,
}) {
  const classes = cardStyles();
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
              height: Math.max(100 * btcPercentage, 5),
              width: Math.max(100 * btcPercentage, 5),
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
              height: Math.max(100 * ethPercentage, 5),
              width: Math.max(100 * ethPercentage, 5),
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

const walletStyles = makeStyles((theme) => ({
  wallet: {
    minHeight: 301,
    backgroundColor: "#ffffff",
    fontFamily: '"Roboto", sans-serif',
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
    fontFamily: '"Cabin", sans-serif',
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
    fontFamily: '"Cabin", sans-serif',
    color: "#000000",
    marginTop: 6,
    letterSpacing: 0.83,
    fontSize: 10,
    fontWeight: 500,
    textTransform: "uppercase",
  },
  address: {
    marginTop: 20,
    fontFamily: '"Roboto", sans-serif',
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
    fontFamily: '"Cabin", sans-serif',
    color: "#00aeef",
    "&:hover": {
      backgroundColor: "#ecfaff",
    },
  },
  rightButton: {
    float: "right",
    fontSize: 12,
    fontWeight: 700,
    fontFamily: '"Cabin", sans-serif',
    color: "#00aeef",
    "&:hover": {
      backgroundColor: "#ecfaff",
    },
  },
  unfollowWalletButton: {
    float: "right",
    height: 35,
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: 1,
    fontFamily: '"Cabin", sans-serif',
    color: "#00aeef",
    borderColor: "#00aeef",
    borderRadius: 5,
    "&:hover": {
      backgroundColor: "#ecfaff",
    },
  },
}));

function WalletCard({
  name,
  tags,
  symbol,
  balance,
  address,
  viewTransactionOnClick,
  exchangeRate,
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
      {tags &&
        tags.map((tag) => {
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
          {cryptoFormatter.format(balance)} {symbol}
        </span>{" "}
        /{" "}
        {balance &&
          usdFormatter.format(
            Math.round(balance * exchangeRate * 100) / 100
          )}{" "}
        USD
      </div>
      <div className={classes.walletSubtitle}>Wallet Balance</div>
      <div className={classes.address}>{address}</div>
      <div className={classes.walletSubtitle}>Wallet Address</div>
      <div className={classes.buttons}>
        <Button
          className={classes.leftButton}
          startIcon={<CopyIcon fontSize="large" />}
          onClick={() => {
            copyToClipboard(address);
          }}
        >
          Copy Address
        </Button>
        <Button
          className={classes.rightButton}
          endIcon={<ChevronRightIcon />}
          onClick={() => {
            if (viewTransactionOnClick) {
              viewTransactionOnClick(address);
            }
          }}
        >
          View Transactions
        </Button>
      </div>
    </div>
  );
}
function TrackWalletCard({
  name,
  tags,
  symbol,
  balance,
  address,
  exchangeRate,
  afterUnfollowWallet,
}) {
  const classes = walletStyles();

  const unfollowWallet = async (address) => {
    try {
      await fetch(`/rest/admin/wallet/untrack/${address}`);
    } catch (e) {
      console.log(e);
    }
  };

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
      {tags &&
        tags.map((tag) => {
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
          {balance} {symbol}
        </span>{" "}
        / {balance * exchangeRate} USD
      </div>
      <div className={classes.walletSubtitle}>Wallet Balance</div>
      <div className={classes.address}>{address}</div>
      <div className={classes.walletSubtitle}>Wallet Address</div>
      <div className={classes.buttons}>
        <Button
          className={classes.leftButton}
          startIcon={<CopyIcon fontSize="large" />}
          onClick={() => {
            copyToClipboard(address);
          }}
        >
          Copy Address
        </Button>
        <Button
          className={classes.unfollowWalletButton}
          variant="outlined"
          onClick={() => {
            unfollowWallet(address);
            if (afterUnfollowWallet) {
              afterUnfollowWallet();
            }
          }}
        >
          Unfollow
        </Button>
      </div>
    </div>
  );
}

const WalletDetailsCardStyles = makeStyles((theme) => ({
  wallet: {
    position: "relative",
    minHeight: 341,
    backgroundColor: "#ffffff",
    fontFamily: '"Roboto", sans-serif',
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
    fontFamily: '"Cabin", sans-serif',
    fontSize: 10,
    fontWeight: 500,
    letterSpacing: 0.83,
    color: "#898989",
    textTransform: "uppercase",
    marginRight: "1em",
  },
  walletBalance: {
    fontFamily: '"Roboto", sans-serif',
    fontSize: 18,
    marginTop: 18,
    lineHeight: 1.33,
  },
  currencyBalance: {
    fontWeight: 700,
  },
  walletSubtitle: {
    fontFamily: '"Cabin", sans-serif',
    color: "#000000",
    marginTop: 6,
    letterSpacing: 0.83,
    fontSize: 10,
    fontWeight: 500,
    textTransform: "uppercase",
  },
  address: {
    marginTop: 20,
    fontFamily: '"Roboto", sans-serif',
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
    fontFamily: '"Cabin", sans-serif',
    color: "#00aeef",
    "&:hover": {
      backgroundColor: "#ecfaff",
    },
  },
  editWalletButton: {
    position: "absolute",
    marginTop: "1em",
    marginRight: "1em",
    right: 6,
    fontSize: 12,
    fontWeight: 700,
    fontFamily: '"Cabin", sans-serif',
    color: "#00aeef",
    "&:hover": {
      backgroundColor: "#ecfaff",
    },
  },
  owners: {
    color: "#00aaef",
    fontSize: 18,
    lineHeight: 1.33,
    marginTop: "2.5em",
  },
  transaction: {
    marginTop: "2em",
    marginBottom: "3em",
  },
  arrowIcon: {
    width: "1.25em",
    marginRight: ".5em",
  },
  txHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "left",
  },
  headerText: {
    fontFamily: '"Roboto", sans-serif',
    fontSize: 14,
    lineHeight: 1.57,
    color: "#000000",
  },
  txDetailsAddress: {
    marginTop: 20,
    fontFamily: '"Roboto", sans-serif',
    fontSize: 18,
    fontWeight: 700,
    lineHeight: 1.33,
    color: "#000000",
    overflowX: "hidden",
    textOverflow: "ellipsis",
    maxWidth: 162,
  },
  tagDestinationButton: {
    fontFamily: '"Cabin", sans-serif',
    fontSize: 12,
    fontWeight: 700,
    textAlign: "center",
    color: "#ffffff",
    boxShadow: "none",
    marginTop: "2em",
  },
  txDetailsButton: {
    marginTop: "1em",
    float: "right",
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: 1,
    fontFamily: '"Cabin", sans-serif',
    color: "#00aeef",
    "&:hover": {
      backgroundColor: "#ecfaff",
    },
    "& .MuiButton-endIcon": {
      margin: 0,
    },
  },
  authorization: {
    height: 370,
    backgroundColor: "#daf5ff",
    padding: "20px 40px 40px 40px",
  },
  authorizationTitle: {
    fontFamily: '"Roboto", sans-serif',
    fontSize: 24,
    fontWeight: 400,
    lineHeight: 1.17,
    color: "#000000",
  },
  authorizationInfo: {
    marginTop: "1em",
  },
  subText: {
    marginTop: 0,
    marginBottom: 0,
    fontSize: 14,
    lineHeight: 1.57,
    color: "#898989",
    fontFamily: '"Roboto", sans-serif',
    letterSpacing: "normal",
  },
  signerText: {
    fontFamily: '"Roboto", sans-serif',
    fontSize: 18,
    lineHeight: 1.33,
    marginTop: ".5em",
    color: "#000000",
  },
  authorizationAddress: {
    fontFamily: '"Roboto", sans-serif',
    fontSize: 18,
    lineHeight: 1.33,
    color: "#000000",
  },
  authorizationSigner: {
    height: 283,
    padding: "20px 40px 40px 40px",
    borderBottom: "solid 1px #e0e0e0",
  },
  authorizationSubheading: {
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: 0.78,
    color: "#898989",
    textTransform: "uppercase",
  },
}));

function WalletDetailsCard({
  name,
  currency,
  tags,
  symbol,
  balance,
  feesUSD,
  address,
  exchangeRate,
}) {
  const classes = WalletDetailsCardStyles();

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
      <Button
        className={classes.editWalletButton}
        startIcon={<EditIcon />}
        onClick={() => {
          console.log("edit wallet click");
        }}
      >
        Edit Wallet
      </Button>
      <h2 className={classes.name}>{name}</h2>
      {tags &&
        tags.map((tag) => {
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
      <Grid container>
        <Grid item md={2}>
          <div className={classes.walletBalance}>
            <span className={classes.currencyBalance}>
              {balance} {symbol}
            </span>
          </div>
          <div className={classes.walletSubtitle}>Wallet Balance</div>
        </Grid>
        <Grid item md={2}>
          <div className={classes.walletBalance}>
            {balance &&
              usdFormatter.format(
                Math.round(balance * exchangeRate * 100) / 100
              )}{" "}
            USD
          </div>
          <div className={classes.walletSubtitle}>Current Value</div>
        </Grid>
        <Grid item md={2}>
          <div className={classes.walletBalance}>
            {feesUSD && usdFormatter.format(feesUSD)} USD
          </div>
          <div className={classes.walletSubtitle}>Transaction Fees</div>
        </Grid>
      </Grid>

      <div className={classes.address}>
        {address}{" "}
        <Button
          className={classes.leftButton}
          startIcon={<CopyIcon fontSize="large" />}
          onClick={() => {
            copyToClipboard(address);
          }}
        >
          Copy
        </Button>
      </div>
      <div className={classes.walletSubtitle}>Wallet Address</div>
      <div className={classes.owners}>You + 2 users</div>
      <div className={classes.walletSubtitle}>Wallet Owners</div>
    </div>
  );
}

function TransactionDetailsCard({
  txid,
  timestamp,
  address,
  currency,
  amount,
  symbol,
  to,
  from,
  amountUSD,
  currentValue,
  sent,
  received,
  setAuthorizationRecord,
}) {
  const classes = WalletDetailsCardStyles();
  const txSent = new Date(timestamp);
  return (
    <Fragment>
      <Grid container className={classes.transaction}>
        <Grid item xs={12} className={classes.txHeader}>
          <TxArrowIcon className={classes.arrowIcon} />{" "}
          <span className={classes.headerText}>
            Crypto {sent ? "sent" : null} {received ? "received" : null} at{" "}
            <b>
              {txSent.toLocaleTimeString()}, {txSent.toDateString()}
            </b>
          </span>
        </Grid>
        <Grid item xs={3}>
          {received && (
            <Fragment>
              <div className={classes.txDetailsAddress}>{from}</div>
              <div className={classes.walletSubtitle}>Source Wallet</div>
            </Fragment>
          )}

          {sent && (
            <Fragment>
              <div className={classes.txDetailsAddress}>{to}</div>
              <div className={classes.walletSubtitle}>Destination Wallet</div>
              <Button
                color="primary"
                variant="contained"
                className={classes.tagDestinationButton}
              >
                Tag Destination Wallet
              </Button>
            </Fragment>
          )}
        </Grid>
        <Grid item xs={2}>
          <div className={classes.walletBalance}>
            <span className={classes.currencyBalance}>
              {amount} {symbol}
            </span>
          </div>
          <div className={classes.walletSubtitle}>{currency} Sent</div>
        </Grid>
        <Grid item xs={2}>
          <div className={classes.walletBalance}>
            {usdFormatter.format(amountUSD)} USD
          </div>
          <div className={classes.walletSubtitle}>Value at Disbursal</div>
        </Grid>
        <Grid item xs={2}>
          <div className={classes.walletBalance}>
            {usdFormatter.format(currentValue)} USD
          </div>
          <div className={classes.walletSubtitle}>Current Value</div>
        </Grid>
        <Grid item xs={3}>
          <Button
            className={classes.txDetailsButton}
            endIcon={<ChevronRightIcon />}
            onClick={() => {
              switch (symbol) {
                case "BTC":
                  window.open(
                    `https://www.blockchain.com/btc/tx/${txid}`,
                    "_blank"
                  );
                  break;
                case "ETH":
                  window.open(`https://etherscan.io/tx/${txid}`);
                  break;
                default:
                  break;
              }
            }}
          >
            Transaction Details
          </Button>
          <Button
            className={classes.txDetailsButton}
            startIcon={<FormatListBulletedIcon />}
            onClick={() => {
              setAuthorizationRecord(txid);
            }}
          >
            Authorization Record
          </Button>
        </Grid>
      </Grid>
      <Divider />
    </Fragment>
  );
}

function AuthorizationCard({
  address,
  amount,
  symbol,
  currency,
  valueSent,
  currentValue,
}) {
  const classes = WalletDetailsCardStyles();
  return (
    <Grid container className={classes.authorization}>
      <Grid item xs={12}>
        <h1 className={classes.authorizationTitle}>Authorization record</h1>
      </Grid>
      <Grid item xs={12}>
        <div className={classes.authorizationAddress}>{address}</div>
        <div className={classes.walletSubtitle}>Destination Wallet</div>
      </Grid>

      <Grid item xs={3}>
        <div className={classes.walletBalance}>
          <span className={classes.currencyBalance}>
            {amount} {symbol}
          </span>
        </div>
        <div className={classes.walletSubtitle}>{currency} Sent</div>
      </Grid>
      <Grid item xs={3}>
        <div className={classes.walletBalance}>{valueSent} USD</div>
        <div className={classes.walletSubtitle}>Value at Disbursal</div>
      </Grid>
      <Grid item xs={3}>
        <div className={classes.walletBalance}>{currentValue} USD</div>
        <div className={classes.walletSubtitle}>Current Value</div>
      </Grid>
      <Grid item xs={12} className={classes.authorizationInfo}>
        <p className={classes.subText}>
          <b>Current value</b> = USD average across three cryotoexchanges,
          calculated at 12:01 pm (EST)
        </p>
        <p className={classes.subText}>
          <b>Value at disbursal</b> = USD average across three cryotexchanges,
          calculated at 12:01 pm (EST) on the day of the disbursal
        </p>
      </Grid>
    </Grid>
  );
}

function AuthorizationSignerCard({ address, owner, timestamp, index }) {
  const classes = WalletDetailsCardStyles();
  return (
    <Grid container className={classes.authorizationSigner}>
      <Grid item xs={12} className={classes.authorizationInfo}>
        <h3 className={classes.authorizationSubheading}>
          Signer {index} details
        </h3>
      </Grid>
      <Grid item xs={12}>
        <div className={classes.signerText}>{address}</div>
        <div className={classes.walletSubtitle}>Wallet Address</div>
      </Grid>
      <Grid item xs={12}>
        <div className={classes.signerText}>{owner}</div>
        <div className={classes.walletSubtitle}>Wallet Owner</div>
      </Grid>
      <Grid item xs={12}>
        <div className={classes.signerText}>{timestamp}</div>
        <div className={classes.walletSubtitle}>Time of Signing</div>
      </Grid>
    </Grid>
  );
}

export {
  BalanceCard,
  TxFeeCard,
  TotalCard,
  WalletCard,
  TrackWalletCard,
  WalletDetailsCard,
  TransactionDetailsCard,
  AuthorizationCard,
  AuthorizationSignerCard,
};
