import React, { Fragment, useEffect, useState } from "react";
import { TransactionDetailsCard } from "../../../ui/Cards";
import TxList from "../../../ui/TxList";

export default function TransactionDetails({
  setAuthorizationRecord,
  transactionDetailsData,
  exchangeRate,
}) {
  const [txs, setTxs] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    setTxs(transactionDetailsData);
  }, [transactionDetailsData]);

  return (
    <Fragment>
      <TxList
        title={`Wallet Transactions`}
        txs={txs}
        TxCard={TransactionDetailsCard}
        page={page}
        onPaginationClick={setPage}
        setAuthorizationRecord={setAuthorizationRecord}
        exchangeRate={exchangeRate}
      />
    </Fragment>
  );
}
