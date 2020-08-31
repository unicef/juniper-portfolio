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
import PriceTracker from "./components/PriceTracker";
import Settings from "./components/Settings";
import Transactions from "./components/Transactions";
import Wallets from "./components/Wallets";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import LoadingScreen from "./ui/Dialog/LoadingScreen";

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
      main: "#00aeef",
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

  const loginUser = (user) => {
    if (user) {
      setIsLoggedIn(true);
      setUser(user);
    }
  };

  const getExchangeRate = async (symbol) => {
    let res, price;
    try {
      res = await fetch(
        `https://min-api.cryptocompare.com/data/price?fsym=${symbol}&tsyms=USD`
      );
      price = await res.json();
    } catch (e) {
      console.log(e);
    }
    return price.USD;
  };

  const updateUser = async (property) => {
    const newUser = { ...user, ...property };

    let res;
    try {
      res = await fetch(`/rest/admin/settings/user`, {
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
    // todo update on server
  };

  const copyToClipboard = (str) => {
    navigator.clipboard.writeText(str);
  };

  useEffect(() => {
    // check if logged in
    const getUserProfile = async () => {
      let res;
      try {
        res = await fetch("/rest/isLoggedIn");
      } catch (e) {
        console.log(e);
      }
      if (res.status === 200 || res.status === 304) {
        console.log("fuck you");

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
  }, []);

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
                    />
                    <Wallets
                      getExchangeRate={getExchangeRate}
                      isAdmin={user.isAdmin}
                    />
                  </Route>
                  <Route path="/admin/wallets">
                    <TopBar user={user} setPageIndex={setPageIndex} />
                    <Sidebar
                      pageIndex={pageIndex}
                      setPageIndex={setPageIndex}
                    />
                    <Wallets
                      getExchangeRate={getExchangeRate}
                      isAdmin={user.isAdmin}
                    />
                  </Route>
                  <Route path="/admin/accounts">
                    <TopBar user={user} setPageIndex={setPageIndex} />
                    <Sidebar
                      pageIndex={pageIndex}
                      setPageIndex={setPageIndex}
                    />
                    <Accounts
                      getExchangeRate={getExchangeRate}
                      copyToClipboard={copyToClipboard}
                      isAdmin={user.isAdmin}
                    />
                  </Route>
                  <Route path="/admin/tracker">
                    <TopBar user={user} setPageIndex={setPageIndex} />
                    <Sidebar
                      pageIndex={pageIndex}
                      setPageIndex={setPageIndex}
                    />
                    <PriceTracker />
                  </Route>
                  <Route path="/admin/transactions">
                    <TopBar user={user} setPageIndex={setPageIndex} />
                    <Sidebar
                      pageIndex={pageIndex}
                      setPageIndex={setPageIndex}
                    />
                    <Transactions
                      getExchangeRate={getExchangeRate}
                      isAdmin={user.isAdmin}
                    />
                  </Route>
                  <Route path="/admin/settings">
                    <TopBar user={user} setPageIndex={setPageIndex} />
                    <Sidebar
                      pageIndex={pageIndex}
                      setPageIndex={setPageIndex}
                    />
                    <Settings
                      user={user}
                      updateUser={updateUser}
                      copyToClipboard={copyToClipboard}
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
