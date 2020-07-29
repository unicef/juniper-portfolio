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

  useEffect(() => {
    // check if logged in
  });

  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <ApolloProvider client={client}>
          <CssBaseline>
            {!isLoggedIn ? (
              <SignIn loginUser={loginUser} />
            ) : (
              <Router>
                <Switch>
                  <Route exact path="/admin">
                    <TopBar />
                    <Sidebar />
                    <Wallets getExchangeRate={getExchangeRate} />
                  </Route>
                  <Route path="/admin/wallets">
                    <TopBar />
                    <Sidebar />
                    <Wallets getExchangeRate={getExchangeRate} />
                  </Route>
                  <Route path="/admin/accounts">
                    <TopBar />
                    <Sidebar />
                    <Accounts />
                  </Route>
                  <Route path="/admin/tracker">
                    <TopBar />
                    <Sidebar />
                    <PriceTracker />
                  </Route>
                  <Route path="/admin/transactions">
                    <TopBar />
                    <Sidebar />
                    <Transactions getExchangeRate={getExchangeRate} />
                  </Route>
                  <Route path="/admin/settings">
                    <TopBar />
                    <Sidebar />
                    <Settings />
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
