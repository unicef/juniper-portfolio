import React, { Fragment, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TransactionDetailsCard } from "../../../ui/Cards";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import TxList from "../../../ui/TxList";

const transactionDetailsStyles = makeStyles((theme) => ({
  root: {
    marginTop: "5em",
  },
  subtitle: {
    fontSize: 14,
    fontWeight: 700,
    letterSpacing: 0.78,
    color: "#898989",
    textTransform: "uppercase",
    marginBottom: "1em",
  },
  allTransactionsButton: {
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
  transactionDetails: {
    marginTop: "2em",
  },
}));

export default function TransactionDetails({
  setAuthorizationRecord,
  transactionDetailsData,
  exchangeRate,
}) {
  const classes = transactionDetailsStyles();
  const [txs, setTxs] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(3);

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
        limit={limit}
        onPaginationClick={setPage}
        setAuthorizationRecord={setAuthorizationRecord}
        exchangeRate={exchangeRate}
      />
    </Fragment>
  );
}
