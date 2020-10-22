import React, { useState, useEffect, Fragment } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import {
  UnpublishedTransactionCard,
  PublishedTransactionCard,
  ArchivedTransactionCard,
} from "../../ui/Cards";
import TxList from "../organisms/TxList";
import Snackbar from "../organisms/Snackbar";
import { TagTransaction } from "../organisms/Dialog";
import { getExchangeRate, publishTransaction } from "../../actions";
import PageLayout from "../templates/Page";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: "4em",
    flexGrow: 1,
    height: "100%",
    backgroundColor: "#f8f8f8",
    display: "flex",
    flexFlow: "column",
  },
  padding: {
    paddingTop: "2em",
  },
  navigation: {
    backgroundColor: "#ffffff",
  },
  tabs: {
    backgroundColor: "#2e1534",
  },
  active: {
    color: theme.palette.primary.main,
  },
}));

function TabPanel(props) {
  const { children, activeTab, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={activeTab !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={{
        backgroundColor: "#f8f8f8",
        paddingBottom: "2em",
        overflowY: "auto",
        flex: "1 1 auto",
      }}
    >
      {activeTab === index && <Container maxWidth="md">{children}</Container>}
    </div>
  );
}

const StyledTabs = withStyles((theme) => ({
  indicator: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    "& > span": {
      width: "100%",
      backgroundColor: theme.palette.primary.main,
    },
  },
}))((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const StyledTab = withStyles((theme) => ({
  root: {
    textTransform: "uppercase",
    color: "#929292",
    fontWeight: 700,
    fontSize: 12,
    letterSpacing: 1.2,
    opacity: 1,
  },
}))((props) => <Tab disableRipple {...props} />);

export default function Transactions({
  isAdmin,
  transactions,
  fetchTransactions,
  setShowHelp,
}) {
  const classes = useStyles();
  const [activeTab, setActiveTab] = useState(0);

  const [unpublishedTxs, setUnpublishedTxs] = useState([]);
  const [unpublishedPage, setUnpublishedPage] = useState(0);

  const [publishedTxs, setPublishedTxs] = useState([]);
  const [publishedPage, setPublishedPage] = useState(0);

  const [archivedTxs, setArchivedTxs] = useState([]);
  const [archivedPage, setArchivedPage] = useState(0);

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarDuration] = useState(3000);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [showTagTransaction, setShowTagTransaction] = useState(false);
  const [transaction, setTransaction] = useState({});

  const changeView = (event, newTab) => {
    setActiveTab(newTab);
  };

  const filterTransactions = () => {
    transactions = transactions.filter((tx) => {
      return tx.amount !== 0;
    });
    setUnpublishedTxs(
      transactions.filter(
        (tx) => tx.published === false && tx.archived === false
      )
    );
    setPublishedTxs(
      transactions.filter(
        (tx) => tx.published === true && tx.archived === false
      )
    );
    setArchivedTxs(transactions.filter((tx) => tx.archived === true));
  };

  useEffect(() => {
    filterTransactions();
  }, [transactions]);

  function UnpublishedTxCard(props) {
    return (
      <UnpublishedTransactionCard
        {...props}
        fetchTransactions={fetchTransactions}
        onTagTransactionClick={(tx) => {
          setTransaction(tx);
          setShowTagTransaction(true);
        }}
      />
    );
  }
  function PublishedTxCard(props) {
    return (
      <PublishedTransactionCard
        {...props}
        fetchTransactions={fetchTransactions}
        onTagTransactionClick={(tx) => {
          setTransaction(tx);
          setShowTagTransaction(true);
        }}
      />
    );
  }
  function ArchivededTxCard(props) {
    return (
      <ArchivedTransactionCard
        {...props}
        fetchTransactions={fetchTransactions}
        onTagTransactionClick={(tx) => {
          setTransaction(tx);
          setShowTagTransaction(true);
        }}
      />
    );
  }

  const [tabs] = useState(["Unpublished", "Published", "Archived"]);

  return (
    <Fragment>
      <TagTransaction
        title={"Tag Sender Details"}
        open={showTagTransaction}
        tx={transaction}
        onClose={() => {
          setShowTagTransaction(false);
          setTransaction({});
          fetchTransactions();
        }}
        publishTransaction={publishTransaction}
        getExchangeRate={getExchangeRate}
        fetchTransactions={fetchTransactions}
        setShowHelp={setShowHelp}
      />

      <Snackbar
        open={showSnackbar}
        severity={snackbarSeverity}
        duration={snackbarDuration}
        message={snackbarMessage}
        onClose={() => {
          setShowSnackbar(false);
        }}
      />

      <PageLayout tabs={tabs}>
        <TxList
          title={`${unpublishedTxs.length} Unpublished Transactions`}
          txs={unpublishedTxs}
          TxCard={UnpublishedTxCard}
          page={unpublishedPage}
          onPaginationClick={setUnpublishedPage}
          isAdmin={isAdmin}
          showPriceInfo={true}
        />

        <TxList
          title={`${publishedTxs.length} Published Transactions`}
          txs={publishedTxs}
          TxCard={PublishedTxCard}
          page={publishedPage}
          onPaginationClick={setPublishedPage}
          isAdmin={isAdmin}
          showPriceInfo={true}
        />

        <TxList
          title={`${archivedTxs.length} Archived Transactions`}
          txs={archivedTxs}
          TxCard={ArchivededTxCard}
          page={archivedPage}
          onPaginationClick={setArchivedPage}
          isAdmin={isAdmin}
          showPriceInfo={true}
        />
      </PageLayout>
    </Fragment>
  );
}
