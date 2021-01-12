import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import PriceInfo from "../molecules/Info/PriceInfo";
import Grid from "@material-ui/core/Grid";
import WalletCard from "../molecules/Card/WalletCard";
import { AddWallet } from "../organisms/Dialog";
import ContainedButton from "../atoms/Button/Contained";

const mainStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100%",
  },
  title: {
    fontFamily: '"Roboto", sans-serif',
    fontSize: 28,
    fontWeight: 700,
    color: "#000000",
  },
  trackWalletsText: {
    fontFamily: '"Roboto", sans-serif',
    fontSize: 19,
    lineHeight: 1.42,
    color: "#000000",
  },
  followWalletButton: {
    fontFamily: '"Cabin", sans-serif',
    fontSize: 12,
    fontWeight: 700,
    textAlign: "center",
    color: "#ffffff",
    boxShadow: "none",
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
}));

export default function ({
  trackedWallets,
  fetchTrackedWallets,
  isAdmin,
  ethRate,
  btcRate,
}) {
  const [tracked, setTracked] = useState([]);
  const [other, setOther] = useState([]);
  const [showAddWalletModal, setShowAddWalletModal] = useState(false);

  useEffect(() => {
    const tracked = trackedWallets.filter((wallet) => {
      return wallet.isTracked;
    });
    const other = trackedWallets.filter((wallet) => {
      return wallet.isTrackedOther;
    });

    setTracked(tracked);
    setOther(other);
  }, [trackedWallets, ethRate, btcRate]);

  const classes = mainStyles();
  return (
    <div className={classes.root}>
      <AddWallet
        open={showAddWalletModal}
        setShowAddWalletModal={setShowAddWalletModal}
        afterAddWallet={fetchTrackedWallets}
        showMultisig={false}
        isUnicef={false}
        isTracked={true}
      />

      <Grid container>
        <Grid item xs={12}>
          <PriceInfo />
        </Grid>

        <Grid item xs={12} style={{ marginTop: "2em" }}>
          <h1 className={classes.title}>Follow blockchain wallets</h1>
          <p className={classes.trackWalletsText}>
            Blockchain wallets can offer visibility to the public to view the
            movement of cryptocurrency, using the wallet public address. This
            address is also used to transact in cryptocurrency.
          </p>
          {isAdmin && (
            <ContainedButton
              onClick={() => {
                setShowAddWalletModal(true);
              }}
            >
              Follow a Blockchain Wallet
            </ContainedButton>
          )}
        </Grid>

        <Grid item xs={12} style={{ marginTop: "4em" }}>
          <h3 className={classes.walletSubheading}>
            Following {tracked.length} Wallets
          </h3>
        </Grid>
        <Grid container spacing={2} style={{ position: "relative" }}>
          {tracked &&
            tracked.map((wallet, index) => {
              return (
                <Grid item xs={6} key={`${index}-${wallet.address}`}>
                  <WalletCard
                    name={wallet.name}
                    currency={wallet.currency}
                    tags={wallet.tags}
                    symbol={wallet.symbol}
                    balance={wallet.balance}
                    address={wallet.address}
                    exchangeRate={wallet.symbol === "ETH" ? ethRate : btcRate}
                    fetchWallets={fetchTrackedWallets}
                    isUnicef={false}
                  />
                </Grid>
              );
            })}
        </Grid>
      </Grid>
    </div>
  );
}
