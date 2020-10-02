import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import PriceInfoBanner from "../../../ui/PriceInfoBanner";
import PriceInfo from "../../molecules/Info/PriceInfo";
import {
  BalanceCard,
  TxFeeCard,
  TotalCard,
  WalletCard,
} from "../../../ui/Cards";
import Fab from "@material-ui/core/Fab";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { AddWallet } from "../../../ui/Dialog";
import { ContainedButton } from "../../../ui/Buttons";

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
      backgroundColor: "#ecfaff",
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
      backgroundColor: "#ecfaff",
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
}) {
  const [balances, setBalances] = useState([]);
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

        <Grid item xs={12} style={{ marginTop: "2em" }}>
          <h1 className={classes.title}>UNICEF HQ wallet overview</h1>
        </Grid>
        {balances &&
          balances.map((balance, index) => {
            return (
              <Grid item xs={12} sm={3} key={index}>
                <BalanceCard
                  symbol={balance.symbol}
                  balance={balance.balance}
                  balanceUSD={balance.balanceUSD}
                  currency={balance.currency}
                  received={balance.received}
                  invested={balance.invested}
                />
              </Grid>
            );
          })}
        <Grid item xs={12} sm={3}>
          {fees && (
            <TxFeeCard
              amountUSD={fees.amountUSD}
              amountBTC={fees.btcFees}
              amountETH={fees.ethFees}
            />
          )}
        </Grid>
        <Grid item xs={12} sm={3}>
          {totals && (
            <TotalCard
              received={totals.received}
              invested={totals.invested}
              ethSentUSD={ethSentUSD}
              ethReceivedUSD={ethReceivedUSD}
              btcSentUSD={btcSentUSD}
              btcReceivedUSD={btcReceivedUSD}
            />
          )}
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
                    />
                  </Grid>
                );
              })}
        </Grid>
      </Grid>
    </div>
  );
}
