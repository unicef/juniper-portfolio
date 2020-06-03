import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { useParams } from "react-router-dom";
import BreadCrumb from "./BreadCrumb";
import { WalletDetailsCard } from "./WalletDetailsCards";
import TransactionDetails from "./TransactionDetails";

const mainStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100%",
  },
}));

export default function () {
  let { id } = useParams();
  const [address] = useState(id);
  const [wallet, setWallet] = useState({});

  useEffect(() => {
    console.log(address);
    // TODO Fetch from API
    setWallet(walletData);
  }, [address, walletData]);

  const classes = mainStyles();
  return (
    <div className={classes.root}>
      <BreadCrumb walletName={wallet.name} />
      <WalletDetailsCard
        name={wallet.name}
        currency={wallet.currency}
        tags={wallet.tags}
        symbol={wallet.symbol}
        amount={wallet.amount}
        amountUSD={wallet.amountUSD}
        feesUSD={wallet.feesUSD}
        address={wallet.address}
      />
      <TransactionDetails />
    </div>
  );
}

// Mock Wallet Data. Will come from API and be passed from parent class
const walletData = {
  name: "Ethereum wallet test 1",
  currency: "Ethereum",
  tags: ["Unicef HQ"],
  symbol: "ETH",
  amount: 25,
  amountUSD: "4692.75",
  feesUSD: "1.75",
  address: "0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7",
};
