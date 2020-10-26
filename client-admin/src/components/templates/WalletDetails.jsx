import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import BreadCrumb from "../molecules/Breadcrumb";
import WalletSummary from "../molecules/Card/WalletSummary";
import { TransactionDetailsCard } from "../../ui/Cards";
import TxList from "../organisms/TxList";
import { AuthorizationRecord } from "../organisms/Dialog";
import { getWalletByAddress, getTransactionsByAddress } from "../../actions";
import { useParams } from "react-router-dom";

const mainStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100%",
  },
}));

export default function ({
  viewWalletDetails,
  ethRate,
  btcRate,
  fetchWallets,
}) {
  const classes = mainStyles();
  const [authorizationRecord, setAuthorizationRecord] = useState(false);
  const { address } = useParams();
  const [wallet, setWallet] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [exchangeRate, setExchangeRate] = useState(0);

  const [page, setPage] = useState(0);

  useEffect(() => {
    async function init() {
      let wallet = await getWalletByAddress(address);
      let transactions = await getTransactionsByAddress(address);

      setExchangeRate(wallet.symbol === "ETH" ? ethRate : btcRate);
      setWallet(wallet);
      setTransactions(transactions);
      console.log(wallet);
    }
    init();
  }, []);

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
        link={"/admin/wallets"}
      />
      <WalletSummary
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
      <TxList
        title={`Wallet Transactions`}
        txs={transactions}
        TxCard={TransactionDetailsCard}
        page={page}
        onPaginationClick={setPage}
        setAuthorizationRecord={setAuthorizationRecord}
        exchangeRate={exchangeRate}
        fetchWallets={fetchWallets}
      />
    </div>
  );
}
