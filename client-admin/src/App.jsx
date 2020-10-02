import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./app.css";
import SignIn from "./components/SignIn";
import TopBar from "./components/TopBar";
import Sidebar from "./components/Sidebar";
import Accounts from "./components/Accounts";
import PriceTrackerPage from "./components/pages/PriceTracker";
import WalletsPage from "./components/pages/Wallets";
import Settings from "./components/Settings";
import Transactions from "./components/Transactions";
import Wallets from "./components/Wallets";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import LoadingScreen from "./ui/Dialog/LoadingScreen";
import {
  getAccounts,
  getExchangeRate,
  getPriceHistory,
  getTransactions,
  getTrackedWallets,
  getWallets,
  getWalletsSummary,
} from "./actions";

const primaryColor = "#00aeef";
const lightPrimaryColor = "#daf5ff";
const darkPrimaryColor = "#374ea2";

const containedButtonHover = "#33bef2";
const containedButtonActive = "#0094cb";
const textButtonHover = "#ecfaff";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    backgroundColor: "#f8f8f8",
    height: "100%",
    width: "100%",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const client = new ApolloClient({
  uri: "/api",
});

const theme = createMuiTheme({
  palette: {
    primary: {
      main: primaryColor,
      light: lightPrimaryColor,
      dark: darkPrimaryColor,
      containedHover: containedButtonHover,
      containedActive: containedButtonActive,
      textHover: textButtonHover,
    },
    background: {
      default: "#ffffff",
    },
  },
  typography: {
    fontFamily: '"Cabin",  sans-serif',
    fontSize: 12,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    color: "#002452",
  },
});

export default function JuniperAdmin() {
  const classes = useStyles();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [pageIndex, setPageIndex] = useState(0);
  const [wallets, setWallets] = useState([]);
  const [trackedWallets, setTrackedWallets] = useState([]);
  const [prices, setPrices] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({});
  const [accounts, setAccounts] = useState([]);
  const [ethRate, setEthRate] = useState(0);
  const [btcRate, setBtcRate] = useState(0);

  const loginUser = (user) => {
    if (user) {
      setIsLoggedIn(true);
      setUser(user);
      initApp();
    }
  };

  const updateUser = async (property) => {
    const newUser = { ...user, ...property };

    try {
      await fetch(`/rest/admin/settings/user`, {
        credentials: "include",
        method: "PUT",
        body: JSON.stringify({
          user: newUser,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (e) {
      console.log(e);
    }
    setUser(newUser);
  };

  const fetchAccounts = async () => {
    setAccounts(await getAccounts());
  };

  const fetchWallets = async () => {
    setWallets(await getWallets());
    setSummary(await getWalletsSummary());
    setTrackedWallets(await getTrackedWallets());
  };

  const fetchTrackedWallets = async () => {
    setTrackedWallets(await getTrackedWallets());
  };

  const fetchTransactions = async () => {
    setTransactions(await getTransactions());
  };

  async function initApp() {
    setWallets(await getWallets());
    setTrackedWallets(await getTrackedWallets());
    setTransactions(await getTransactions());
    setSummary(await getWalletsSummary());
    setAccounts(await getAccounts());
    setEthRate(await getExchangeRate("ETH"));
    setBtcRate(await getExchangeRate("BTC"));
    setPrices(await getPriceHistory());
  }

  useEffect(() => {
    console.log("app");
    async function init() {
      setSummary(await getWalletsSummary());
      setWallets(await getWallets());
      setTrackedWallets(await getTrackedWallets());
      setTransactions(await getTransactions());
      setAccounts(await getAccounts());
      setEthRate(await getExchangeRate("ETH"));
      setBtcRate(await getExchangeRate("BTC"));
      setPrices(await getPriceHistory());
    }
    if (isLoggedIn) {
      init();
    }
    // check if logged in
    const getUserProfile = async () => {
      let res;
      try {
        res = await fetch("/rest/isLoggedIn");
      } catch (e) {
        console.log(e);
      }
      if (res.status === 200 || res.status === 304) {
        setUser(await res.json());
        setIsLoggedIn(true);
      }
      setLoading(false);
    };
    getUserProfile();

    const path = window.location.pathname;

    if (path.indexOf("wallets") > -1) {
      setPageIndex(0);
    } else if (path.indexOf("accounts") > -1) {
      setPageIndex(1);
    } else if (path.indexOf("tracker") > -1) {
      setPageIndex(2);
    } else if (path.indexOf("transactions") > -1) {
      setPageIndex(3);
    } else if (path.indexOf("settings") > -1) {
      setPageIndex(4);
    }
  }, [isLoggedIn]);

  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <ApolloProvider client={client}>
          <CssBaseline>
            {!isLoggedIn ? (
              loading ? (
                <LoadingScreen open={true} />
              ) : (
                <SignIn loginUser={loginUser} />
              )
            ) : (
              <Router>
                <Switch>
                  <Route exact path="/admin">
                    <TopBar user={user} setPageIndex={setPageIndex} />
                    <Sidebar
                      pageIndex={pageIndex}
                      setPageIndex={setPageIndex}
                      ethRate={ethRate}
                      btcRate={btcRate}
                    />
                    <WalletsPage
                      wallets={wallets}
                      trackedWallets={trackedWallets}
                      summary={summary}
                      fetchWallets={fetchWallets}
                      isAdmin={user.isAdmin}
                      ethRate={ethRate}
                      btcRate={btcRate}
                    />
                  </Route>
                  <Route path="/admin/wallets">
                    <TopBar user={user} setPageIndex={setPageIndex} />
                    <Sidebar
                      pageIndex={pageIndex}
                      setPageIndex={setPageIndex}
                      ethRate={ethRate}
                      btcRate={btcRate}
                    />
                    <WalletsPage
                      wallets={wallets}
                      trackedWallets={trackedWallets}
                      summary={summary}
                      fetchWallets={fetchWallets}
                      fetchTrackedWallets={fetchTrackedWallets}
                      isAdmin={user.isAdmin}
                      ethRate={ethRate}
                      btcRate={btcRate}
                    />
                  </Route>
                  <Route path="/admin/accounts">
                    <TopBar user={user} setPageIndex={setPageIndex} />
                    <Sidebar
                      pageIndex={pageIndex}
                      setPageIndex={setPageIndex}
                      ethRate={ethRate}
                      btcRate={btcRate}
                    />
                    <Accounts
                      isAdmin={user.isAdmin}
                      fetchAccounts={fetchAccounts}
                      accounts={accounts}
                      ethRate={ethRate}
                      btcRate={btcRate}
                    />
                  </Route>
                  <Route path="/admin/tracker">
                    <TopBar user={user} setPageIndex={setPageIndex} />
                    <Sidebar
                      pageIndex={pageIndex}
                      setPageIndex={setPageIndex}
                      ethRate={ethRate}
                      btcRate={btcRate}
                    />
                    <PriceTrackerPage
                      prices={prices}
                      ethRate={ethRate}
                      btcRate={btcRate}
                    />
                  </Route>
                  <Route path="/admin/transactions">
                    <TopBar user={user} setPageIndex={setPageIndex} />
                    <Sidebar
                      pageIndex={pageIndex}
                      setPageIndex={setPageIndex}
                      ethRate={ethRate}
                      btcRate={btcRate}
                    />
                    <Transactions
                      isAdmin={user.isAdmin}
                      transactions={transactions}
                      fetchTransactions={fetchTransactions}
                    />
                  </Route>
                  <Route path="/admin/settings">
                    <TopBar user={user} setPageIndex={setPageIndex} />
                    <Sidebar
                      pageIndex={pageIndex}
                      setPageIndex={setPageIndex}
                      ethRate={ethRate}
                      btcRate={btcRate}
                    />
                    <Settings
                      user={user}
                      updateUser={updateUser}
                      isAdmin={user.isAdmin}
                    />
                  </Route>
                  <Redirect from="*" to="/admin/wallets" />
                </Switch>
              </Router>
            )}
          </CssBaseline>
        </ApolloProvider>
      </ThemeProvider>
    </div>
  );
}
