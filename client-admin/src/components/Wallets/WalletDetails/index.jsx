import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import BreadCrumb from "./BreadCrumb";
import { WalletDetailsCard } from "../../../ui/Cards";
import TransactionDetails from "./TransactionDetails";
import { AuthorizationRecord } from "../../../ui/Dialog";
import { getWalletByAddress, getTransactionsByAddress } from "../../../actions";

const mainStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100%",
  },
}));

export default function ({
  viewWalletDetails,
  walletDetailsAddress,
  ethRate,
  btcRate,
  fetchWallets,
}) {
  const classes = mainStyles();
  const [authorizationRecord, setAuthorizationRecord] = useState(false);
  const [address] = useState(walletDetailsAddress);
  const [wallet, setWallet] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [exchangeRate, setExchangeRate] = useState(0);

  useEffect(() => {
    async function init() {
      let wallet = await getWalletByAddress(address);
      let transactions = await getTransactionsByAddress(address);

      setExchangeRate(wallet.symbol === "ETH" ? ethRate : btcRate);
      setWallet(wallet);
      setTransactions(transactions);
    }
    init();
  }, [address, btcRate, ethRate]);

  return (
    <div className={classes.root}>
      <AuthorizationRecord
        authorizationRecord={authorizationRecord}
        setAuthorizationRecord={setAuthorizationRecord}
        exchangeRate={exchangeRate}
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
        afterEditWallet={async () => {
          setWallet(await getWalletByAddress(address));
          setTransactions(await getTransactionsByAddress(address));
          fetchWallets();
        }}
      />
      <TransactionDetails
        address={address}
        setAuthorizationRecord={setAuthorizationRecord}
        transactionDetailsData={transactions}
        exchangeRate={exchangeRate}
        fetchWallets={fetchWallets}
      />
    </div>
  );
}
