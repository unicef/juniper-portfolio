import React, { useState, useEffect } from "react";
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
import TxList from "../../ui/TxList";
import Snackbar from "../../ui/Snackbar";
import { TagTransaction } from "../../ui/Dialog";
import LoadingScreen from "../../ui/LoadingScreen";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: "4em",
    flexGrow: 1,
    height: "100%",
    backgroundColor: "#f8f8f8",
  },
  padding: {
    padding: theme.spacing(3),
  },
  navigation: {
    backgroundColor: "#ffffff",
  },
  tabs: {
    backgroundColor: "#2e1534",
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
      style={{ backgroundColor: "#f8f8f8", paddingBottom: "2em" }}
    >
      {activeTab === index && <Container maxWidth="md">{children}</Container>}
    </div>
  );
}

const StyledTabs = withStyles({
  indicator: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    "& > span": {
      width: "100%",
      backgroundColor: "#00aeef",
    },
  },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

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

export default function Transactions({ getExchangeRate, isAdmin }) {
  const classes = useStyles();
  const [activeTab, setActiveTab] = useState(0);
  const [fetchingTxs, setFetchingTxs] = useState(false);
  const [txs, setTxs] = useState([]);
  const [unpublishedTxs, setUnpublishedTxs] = useState([]);
  const [unpublishedPage, setUnpublishedPage] = useState(0);
  const [unpublishedLimit, setUnpublishedLimit] = useState(3);

  const [publishedTxs, setPublishedTxs] = useState([]);
  const [publishedPage, setPublishedPage] = useState(0);
  const [publishedLimit, setPublishedLimit] = useState(3);

  const [archivedTxs, setArchivedTxs] = useState([]);
  const [archivedPage, setArchivedPage] = useState(0);
  const [archivedLimit, setArchivedLimit] = useState(3);

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarDuration] = useState(3000);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [showTagTransaction, setShowTagTransaction] = useState(false);
  const [transaction, setTransaction] = useState({});

  const changeView = (event, newTab) => {
    setActiveTab(newTab);
  };

  const publishTransaction = async (tx, donor, publish) => {
    tx.published = publish;

    let res;
    try {
      res = await fetch(`/rest/admin/transactions/publish`, {
        credentials: "include",
        method: "POST",
        body: JSON.stringify({
          tx,
          donor,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (e) {
      console.log(e);
      return;
    }

    if (res.status === 200) {
      //archiveTransactionSuccess();
    } else {
      //archiveTransactionFailed(txid);
    }
  };

  const archiveTransaction = (txid) => {
    const newTxs = txs.slice();

    newTxs.forEach((tx) => {
      if (tx.txid === txid) {
        tx.archived = true;
      }
    });
    setTxs(newTxs);
    filterTransactions(newTxs);
  };

  const archiveTransactionSuccess = () => {
    setSnackbarMessage("Tx Archived");
    setSnackbarSeverity("success");
    setShowSnackbar(true);
  };

  const archiveTransactionFailed = (txid) => {
    const newTxs = txs.slice();
    newTxs.forEach((tx) => {
      if (tx.txid === txid) {
        tx.archived = false;
      }
    });
    setTxs(newTxs);
    filterTransactions(newTxs);
    setSnackbarMessage("Tx Archive Failed");
    setSnackbarSeverity("error");
    setShowSnackbar(true);
  };

  const filterTransactions = (txs) => {
    txs = txs.filter((tx) => {
      return tx.amount !== 0;
    });
    setUnpublishedTxs(
      txs.filter((tx) => tx.published === false && tx.archived === false)
    );
    setPublishedTxs(
      txs.filter((tx) => tx.published === true && tx.archived === false)
    );
    setArchivedTxs(txs.filter((tx) => tx.archived === true));
  };

  const getTransactions = async () => {
    setFetchingTxs(true);
    let data;
    let txs = [];
    try {
      data = await fetch("/rest/admin/transactions/hq");

      txs = await data.json();
    } catch (e) {
      console.log(e);
    }

    setTxs(txs);
    filterTransactions(txs);
    setFetchingTxs(false);
  };

  useEffect(() => {
    getTransactions();
  }, []);

  function UnpublishedTxCard(props) {
    return (
      <UnpublishedTransactionCard
        {...props}
        archiveTransaction={archiveTransaction}
        archiveTransactionSuccess={archiveTransactionSuccess}
        archiveTransactionFailed={archiveTransactionFailed}
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
        archiveTransaction={archiveTransaction}
        archiveTransactionSuccess={archiveTransactionSuccess}
        archiveTransactionFailed={archiveTransactionFailed}
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
        archiveTransaction={archiveTransaction}
        archiveTransactionSuccess={archiveTransactionSuccess}
        archiveTransactionFailed={archiveTransactionFailed}
        onTagTransactionClick={(tx) => {
          setTransaction(tx);
          setShowTagTransaction(true);
        }}
      />
    );
  }

  return (
    <div className={classes.root}>
      <TagTransaction
        title={"Tag Sender Details"}
        open={showTagTransaction}
        tx={transaction}
        onClose={() => {
          setShowTagTransaction(false);
          setTransaction({});
          getTransactions();
        }}
        publishTransaction={publishTransaction}
        getExchangeRate={getExchangeRate}
      />
      <StyledTabs
        value={activeTab}
        onChange={changeView}
        className={classes.navigation}
        centered
      >
        <StyledTab
          label="Unpublished"
          style={activeTab === 0 ? { color: "#00aeef" } : {}}
        />
        <StyledTab
          label="Published"
          style={activeTab === 1 ? { color: "#00aeef" } : {}}
        />
        <StyledTab
          label="Archived Transactions"
          style={activeTab === 2 ? { color: "#00aeef" } : {}}
        />
      </StyledTabs>
      <Typography className={classes.padding} />

      <TabPanel activeTab={activeTab} index={0}>
        {fetchingTxs ? (
          <LoadingScreen loadingMessage={"Loading Transactions"} />
        ) : (
          <TxList
            title={`${unpublishedTxs.length} Unpublished Transactions`}
            txs={unpublishedTxs}
            TxCard={UnpublishedTxCard}
            page={unpublishedPage}
            onPaginationClick={setUnpublishedPage}
            isAdmin={isAdmin}
          />
        )}
      </TabPanel>
      <TabPanel activeTab={activeTab} index={1}>
        <TxList
          title={`${publishedTxs.length} Published Transactions`}
          txs={publishedTxs}
          TxCard={PublishedTxCard}
          page={publishedPage}
          onPaginationClick={setPublishedPage}
          isAdmin={isAdmin}
        />
      </TabPanel>
      <TabPanel activeTab={activeTab} index={2}>
        <TxList
          title={`${archivedTxs.length} Archived Transactions`}
          txs={archivedTxs}
          TxCard={ArchivededTxCard}
          page={archivedPage}
          onPaginationClick={setArchivedPage}
          isAdmin={isAdmin}
        />
      </TabPanel>
      <Snackbar
        open={showSnackbar}
        severity={snackbarSeverity}
        duration={snackbarDuration}
        message={snackbarMessage}
        onClose={() => {
          setShowSnackbar(false);
        }}
      />
    </div>
  );
}
