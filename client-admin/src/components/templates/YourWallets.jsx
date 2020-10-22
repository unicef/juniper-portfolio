import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import PriceInfo from "../molecules/Info/PriceInfo";
import CallToAction from "../molecules/CallToAction";
import Fab from "@material-ui/core/Fab";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { AddWallet } from "../organisms/Dialog";
import ContainedButton from "../atoms/Button/Contained";
import TextButton from "../atoms/Button/TextIcon";
import WalletCard from "../molecules/Card/WalletCard";
import YourWalletSummaryCard from "../molecules/Card/YourWalletSummaryCard";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100%",
  },
  title: {
    fontFamily: '"Roboto", sans-serif',
    fontSize: 28,
    fontWeight: 700,
    color: "#000000",
  },
  titleThin: {
    fontWeight: 400,
  },
  message: {
    fontFamily: '"Roboto",  sans-serif',
    fontSize: 19,
    lineHeight: 1.42,
    marginTop: 0,
    marginBottom: 9,
  },
  addWalletButton: {
    width: 148,
    height: 35,
    fontFamily: '"Cabin", sans-serif',
    fontSize: 12,
    fontWeight: 700,
    textAlign: "center",
    color: "#ffffff",
    boxShadow: "none",
  },
  walletSubheading: {
    fontSize: 14,
    fontWeight: 700,
    letterSpacing: 0.78,
    color: "#898989",
    textTransform: "uppercase",
    marginBottom: "2em",
  },
  fabLeft: {
    color: "#cbcbcb",
    backgroundColor: "rgba(0,0,0,0)",
    boxShadow: "none",
    float: "right",
    position: "absolute",
    top: "40%",
    left: -60,
    "&:hover": {
      backgroundColor: theme.palette.primary.textButtonHover,
    },
  },
  fabRight: {
    color: "#cbcbcb",
    backgroundColor: "rgba(0,0,0,0)",
    boxShadow: "none",
    float: "right",
    position: "absolute",
    top: "40%",
    right: -60,
    "&:hover": {
      backgroundColor: theme.palette.primary.textButtonHover,
    },
  },
}));

export default function ({
  wallets,
  summary,
  fetchWallets,
  isAdmin,
  btcRate,
  ethRate,
  setShowHelp,
}) {
  const [balances, setBalances] = useState([]);
  const [ethSummary, setEthSummary] = useState({});
  const [btcSummary, setBtcSummary] = useState({});
  const [fees, setFees] = useState(null);
  const [totals, setTotals] = useState(null);
  const [ethereumWallets, setEthereumWallets] = useState([]);
  const [ethereumWalletIndex, setEthereumWalletIndex] = useState(0);
  const [ethSentUSD, setEthSentUSD] = useState(0);
  const [ethReceivedUSD, setEthReceivedUSD] = useState(0);
  const [bitcoinWallets, setBitcoinWallets] = useState([]);
  const [bitcoinWalletIndex, setBitcoinWalletIndex] = useState(0);
  const [showAddWalletModal, setShowAddWalletModal] = useState(false);

  const [btcSentUSD, setBtcSentUSD] = useState(0);
  const [btcReceivedUSD, setBtcReceivedUSD] = useState(0);

  const incrementEthWalletIndex = () => {
    if (ethereumWalletIndex + 1 <= ethereumWallets.length) {
      setEthereumWalletIndex(ethereumWalletIndex + 1);
    }
  };
  const incrementBtcWalletIndex = () => {
    if (bitcoinWalletIndex + 1 <= bitcoinWallets.length) {
      setBitcoinWalletIndex(bitcoinWalletIndex + 1);
    }
  };

  const decrementEthWalletIndex = () => {
    if (ethereumWalletIndex - 1 >= 0) {
      setEthereumWalletIndex(ethereumWalletIndex - 1);
    }
  };
  const decrementBtcWalletIndex = () => {
    if (bitcoinWalletIndex - 1 >= 0) {
      setBitcoinWalletIndex(bitcoinWalletIndex - 1);
    }
  };

  useEffect(() => {
    const filterWallets = async () => {
      setEthereumWallets(
        wallets.filter((wallet) => {
          return wallet.currency === "Ethereum";
        })
      );

      setBitcoinWallets(
        wallets.filter((wallet) => wallet.currency === "Bitcoin")
      );
    };

    async function init() {
      filterWallets();

      const {
        ethBalance,
        ethReceived,
        ethSent,
        ethFees,
        ethFeesUSD,
        ethSentUSD,
        ethReceivedUSD,
        btcBalance,
        btcReceived,
        btcSent,
        btcFees,
        btcFeesUSD,
        btcSentUSD,
        btcReceivedUSD,
      } = summary;

      setEthSummary({
        name: "Ether",
        currency: "Ethereum",
        count: wallets.filter((wallet) => {
          return wallet.currency === "Ethereum";
        }).length,
        symbol: "ETH",
        balance: ethBalance,
        balanceUSD: ethBalance * ethRate,
        received: ethReceived,
        sent: ethSent,
        fees: ethFees,
        feesUSD: ethFeesUSD,
        sentUSD: ethSentUSD,
        receivedUSD: ethReceivedUSD,
      });

      setBtcSummary({
        name: "Bitcoin",
        currency: "Bitcoin",
        count: wallets.filter((wallet) => {
          return wallet.currency === "Bitcoin";
        }).length,
        symbol: "BTC",
        balance: btcBalance,
        balanceUSD: btcBalance * btcRate,
        received: btcReceived,
        sent: btcSent,
        fees: btcFees,
        feesUSD: btcFeesUSD,
        sentUSD: btcSentUSD,
        receivedUSD: btcReceivedUSD,
      });

      setBalances([
        {
          symbol: "ETH",
          balance: ethBalance,
          balanceUSD: ethBalance * ethRate,
          currency: "Ether",
          received: ethReceived,
          invested: ethSent,
        },
        {
          symbol: "BTC",
          balance: btcBalance,
          balanceUSD: btcBalance * btcRate,
          currency: "Bitcoin",
          received: btcReceived,
          invested: btcSent,
        },
      ]);

      setFees({
        amountUSD: ethFeesUSD + btcFeesUSD,
        ethFees,
        btcFees,
      });

      setTotals({
        received: ethReceivedUSD + btcReceivedUSD,
        invested: ethSentUSD + btcSentUSD,
      });

      setEthSentUSD(ethSentUSD);
      setEthReceivedUSD(ethReceivedUSD);
      setBtcSentUSD(btcSentUSD);
      setBtcReceivedUSD(btcReceivedUSD);
    }
    if (!summary) return;
    init();
  }, [wallets, summary, ethRate, btcRate]);

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AddWallet
        open={showAddWalletModal}
        setShowAddWalletModal={setShowAddWalletModal}
        afterAddWallet={() => {
          fetchWallets();
        }}
        showMultisig={true}
        isUnicef={true}
        isTracked={false}
      />
      <Grid container>
        <Grid item xs={12}>
          <PriceInfo />
        </Grid>

        <Grid item xs={12} style={{ marginTop: "2em", marginBottom: "2em" }}>
          <h1 className={classes.title}>
            Wallet dashboard
            <span className={classes.titleThin}>
              {" "}
              <ChevronRightIcon size="large" /> UNICEF HQ
            </span>
          </h1>
          <p className={classes.message}>
            Below is an overview of all the wallets owned and managed by your
            organisation. An organisation can have multiple wallets for a
            cryptocurrency.
          </p>
          <TextButton
            style={{ paddingLeft: 0 }}
            onClick={() => {
              setShowHelp(true);
            }}
          >
            Learn About Cryptocurrency Wallets
          </TextButton>
        </Grid>
        <Grid item xs={6}>
          <YourWalletSummaryCard
            summary={ethSummary}
            onHelpClick={() => {
              setShowHelp(true);
            }}
          ></YourWalletSummaryCard>
        </Grid>
        <Grid item xs={6}>
          <YourWalletSummaryCard
            summary={btcSummary}
            onHelpClick={() => {
              setShowHelp(true);
            }}
          ></YourWalletSummaryCard>
        </Grid>

        <Grid item xs={12} style={{ marginTop: "2em" }}>
          {isAdmin && (
            <ContainedButton
              onClick={() => {
                setShowAddWalletModal(true);
              }}
            >
              Add New Wallet
            </ContainedButton>
          )}
        </Grid>

        <Grid item xs={12} style={{ marginTop: "4em" }}>
          <CallToAction
            onClick={(e) => {
              e.target.closest(".tabpanel").scrollTo(0, 2000);
            }}
          >
            Individual Blockchain Wallets
          </CallToAction>
        </Grid>
        <Grid item xs={12} style={{ marginTop: "4em" }}>
          <h3 className={classes.walletSubheading}>
            {ethereumWallets.length} Ethereum Wallet
            {ethereumWallets.length !== 1 && "s"}
          </h3>
        </Grid>
        <Grid container spacing={2} style={{ position: "relative" }}>
          {ethereumWalletIndex > 0 && (
            <Fab className={classes.fabLeft} onClick={decrementEthWalletIndex}>
              <ChevronLeftIcon fontSize="large" />
            </Fab>
          )}

          {ethereumWalletIndex + 2 < ethereumWallets.length && (
            <Fab className={classes.fabRight} onClick={incrementEthWalletIndex}>
              <ChevronRightIcon fontSize="large" />
            </Fab>
          )}

          {ethereumWallets &&
            ethereumWallets
              .slice(ethereumWalletIndex, ethereumWalletIndex + 2)
              .map((wallet, index) => {
                return (
                  <Grid item xs={6} key={index}>
                    <WalletCard
                      name={wallet.name}
                      currency={wallet.currency}
                      tags={wallet.tags}
                      symbol={wallet.symbol}
                      balance={wallet.balance}
                      address={wallet.address}
                      exchangeRate={ethRate}
                      isUnicef={true}
                    />
                  </Grid>
                );
              })}
        </Grid>

        <Grid item xs={12} style={{ marginTop: "4em" }}>
          <h3 className={classes.walletSubheading}>
            {bitcoinWallets.length} Bitcoin Wallet
            {bitcoinWallets.length !== 1 && "s"}
          </h3>
        </Grid>

        <Grid container spacing={2} style={{ position: "relative" }}>
          {bitcoinWalletIndex > 0 && (
            <Fab className={classes.fabLeft} onClick={decrementBtcWalletIndex}>
              <ChevronLeftIcon fontSize="large" />
            </Fab>
          )}

          {bitcoinWalletIndex + 2 < bitcoinWallets.length && (
            <Fab className={classes.fabRight} onClick={incrementBtcWalletIndex}>
              <ChevronRightIcon fontSize="large" />
            </Fab>
          )}

          {bitcoinWallets &&
            bitcoinWallets
              .slice(bitcoinWalletIndex, bitcoinWalletIndex + 2)
              .map((wallet, index) => {
                return (
                  <Grid item xs={6} key={index}>
                    <WalletCard
                      name={wallet.name}
                      currency={wallet.currency}
                      tags={wallet.tags}
                      symbol={wallet.symbol}
                      balance={wallet.balance}
                      address={wallet.address}
                      exchangeRate={btcRate}
                      isUnicef={true}
                    />
                  </Grid>
                );
              })}
        </Grid>
      </Grid>
    </div>
  );
}
