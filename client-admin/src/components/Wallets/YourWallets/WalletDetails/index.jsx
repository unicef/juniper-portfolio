import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import BreadCrumb from "./BreadCrumb";
import { WalletDetailsCard } from "../../WalletCards";
import TransactionDetails from "./TransactionDetails";
import AuthorizationRecord from "./AuthorizationRecord";
const mainStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100%",
  },
}));

export default function ({
  viewWalletDetails,
  walletDetailsAddress,
  getExchangeRate,
}) {
  const classes = mainStyles();

  const [authorizationRecord, setAuthorizationRecord] = useState(false);
  const [address] = useState(walletDetailsAddress);
  const [wallet, setWallet] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [exchangeRate, setExchangeRate] = useState(0);

  const getWallet = async () => {
    let res, wallet;
    try {
      res = await fetch(`/rest/admin/wallet/${address}`);
      wallet = await res.json();
    } catch (e) {
      return console.log(e);
    }
    console.log(wallet);
    setExchangeRate(await getExchangeRate(wallet.symbol));
    setWallet(wallet);
  };
  const getTransactions = async () => {
    let res, transactions;
    try {
      res = await fetch(`/rest/admin/transactions/${address}`);
      transactions = await res.json();
    } catch (e) {
      return console.log(e);
    }

    setTransactions(transactions);
  };

  useEffect(() => {
    // TODO Fetch from API
    getWallet(address);
    getTransactions(address);
  }, [address]);

  return (
    <div className={classes.root}>
      <AuthorizationRecord
        authorizationRecord={authorizationRecord}
        setAuthorizationRecord={setAuthorizationRecord}
      />
      <BreadCrumb
        walletName={wallet.name || wallet.address}
        viewWalletDetails={viewWalletDetails}
      />
      <WalletDetailsCard
        name={wallet.name}
        currency={wallet.currency}
        tags={wallet.tags}
        symbol={wallet.symbol}
        balance={wallet.balance}
        feesUSD={wallet.feesUSD}
        address={wallet.address}
        exchangeRate={exchangeRate}
      />
      <TransactionDetails
        address={address}
        setAuthorizationRecord={setAuthorizationRecord}
        transactionDetailsData={transactions}
        exchangeRate={exchangeRate}
      />
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
