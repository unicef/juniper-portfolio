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
import SignIn from "./components/pages/SignIn";
import TopBar from "./components/organisms/TopBar";
import Sidebar from "./components/organisms/Sidebar";
import AccountsPage from "./components/pages/Accounts";
import PriceTrackerPage from "./components/pages/PriceTracker";
import WalletsPage from "./components/pages/Wallets";
import Settings from "./components/pages/Settings";
import Transactions from "./components/pages/Transactions";
import HelpDrawer from "./components/organisms/HelpDrawer";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import LoadingScreen from "./components/organisms/Dialog/LoadingScreen";
import {
  getAppSettings,
  getAccounts,
  getExchangeRate,
  getPriceHistory,
  getTransactions,
  getTrackedWallets,
  getUpdatingWallet,
  getWallets,
  getWalletsSummary,
  updateUser,
} from "./actions";
import PriceContext from "./context/PriceContext";

const drawerWidth = 240;
const defaultState = {
  logoUrl: "/image/1601918615229-UNICEF.png",
  primaryColor: "#00aeef",
  lightPrimaryColor: "#daf5ff",
  darkPrimaryColor: "#374ea2",
  containedButtonHover: "#33bef2",
  containedButtonActive: "#0094cb",
  textButtonHover: "#ecfaff",
};

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

export default function JuniperAdmin() {
  const classes = useStyles();
  const [appSettings, setAppSettings] = useState(defaultState);
  const [hasSettings, setHasSettings] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
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
  const [updatingWallets, setUpdatingWallets] = useState(false);

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: appSettings.primaryColor,
        light: appSettings.lightPrimaryColor,
        dark: appSettings.darkPrimaryColor,
        containedHover: appSettings.containedButtonHover,
        containedActive: appSettings.containedButtonActive,
        textHover: appSettings.textButtonHover,
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

  const loginUser = (user) => {
    if (user) {
      setIsLoggedIn(true);
      setUser(user);
      initApp();
      // Check if first login
      if (!user.didFirstLogin) {
        setShowHelp(true);
        updateUserProfile({ ...user, didFirstLogin: true });
      }
    }
  };

  const updateUserProfile = async (property) => {
    const updatedUser = { ...user, ...property };
    updateUser(updatedUser);
    setUser(updatedUser);
  };

  const fetchAccounts = async () => {
    setAccounts(await getAccounts());
  };

  const fetchWallets = async () => {
    setWallets(await getWallets());
    setSummary(await getWalletsSummary());
    setTrackedWallets(await getTrackedWallets());
    setTransactions(await getTransactions());
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
    async function init() {
      setSummary(await getWalletsSummary());
      setWallets(await getWallets());
      setTrackedWallets(await getTrackedWallets());
      setTransactions(await getTransactions());
      setAccounts(await getAccounts());
      setEthRate(await getExchangeRate("ETH"));
      setBtcRate(await getExchangeRate("BTC"));
      setPrices(await getPriceHistory());

      console.log(await getPriceHistory());

      if (await getUpdatingWallet()) {
        setUpdatingWallets(true);
        const pollUpdatingWallet = setInterval(async () => {
          const updatingWallets = await getUpdatingWallet();
          if (!updatingWallets) {
            clearInterval(pollUpdatingWallet);
            init(false);
          }

          setUpdatingWallets(updatingWallets);
        }, 2000);
      }
    }
    if (isLoggedIn && hasSettings) {
      init();
    }

    const initAppSettings = async () => {
      setAppSettings(await getAppSettings());
      setHasSettings(true);
    };
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

    if (!hasSettings) {
      initAppSettings();
    }

    if (!isLoggedIn) {
      getUserProfile();
    }

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
  }, [isLoggedIn, hasSettings]);
  console.log(`showHelp: ${showHelp}`);
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
                <TopBar
                  user={user}
                  setPageIndex={setPageIndex}
                  logoUrl={appSettings.logoUrl}
                  updatingWallets={updatingWallets}
                />

                <Sidebar
                  pageIndex={pageIndex}
                  setPageIndex={setPageIndex}
                  ethRate={ethRate}
                  btcRate={btcRate}
                />

                <HelpDrawer
                  open={showHelp}
                  onClose={() => {
                    setShowHelp(false);
                  }}
                />
                <PriceContext.Provider value={{ prices }}>
                  <Switch>
                    <Route exact path="/admin">
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
                      <AccountsPage
                        isAdmin={user.isAdmin}
                        fetchAccounts={fetchAccounts}
                        accounts={accounts}
                        ethRate={ethRate}
                        btcRate={btcRate}
                      />
                    </Route>
                    <Route path="/admin/tracker">
                      <PriceTrackerPage
                        prices={prices}
                        ethRate={ethRate}
                        btcRate={btcRate}
                      />
                    </Route>
                    <Route path="/admin/transactions">
                      <Transactions
                        isAdmin={user.isAdmin}
                        transactions={transactions}
                        fetchTransactions={fetchTransactions}
                        setShowHelp={setShowHelp}
                      />
                    </Route>
                    <Route path="/admin/settings">
                      <Settings
                        user={user}
                        updateUser={updateUserProfile}
                        isAdmin={user.isAdmin}
                        appSettings={appSettings}
                        setAppSettings={setAppSettings}
                      />
                    </Route>
                    <Redirect from="*" to="/admin/wallets" />
                  </Switch>
                </PriceContext.Provider>
              </Router>
            )}
          </CssBaseline>
        </ApolloProvider>
      </ThemeProvider>
    </div>
  );
}
