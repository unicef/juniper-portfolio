import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import BreadCrumb from "./BreadCrumb";
import { WalletDetailsCard } from "../../../ui/Cards";
import TransactionDetails from "./TransactionDetails";
import { AuthorizationRecord } from "../../../ui/Dialog";

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

  const getTransactions = async () => {
    let res, transactions;
    try {
      res = await fetch(`/rest/admin/transactions/address/${address}`);
      transactions = await res.json();
    } catch (e) {
      return console.log(e);
    }

    setTransactions(transactions);
  };

  const getWallet = async () => {
    let res, wallet;
    try {
      res = await fetch(`/rest/admin/wallets/${address}`);
      wallet = await res.json();
    } catch (e) {
      return console.log(e);
    }

    setExchangeRate(await getExchangeRate(wallet.symbol));
    setWallet(wallet);
  };

  useEffect(() => {
    getWallet(address);
    getTransactions(address);
  }, [address, getExchangeRate]);

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
        isMultisig={wallet.isMultisig}
        multisigOwners={wallet.multisigOwners}
        isUnicef={wallet.isUnicef}
        isTracked={wallet.isTracked}
        afterEditWallet={() => {
          getWallet(address);
          getTransactions(address);
        }}
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
