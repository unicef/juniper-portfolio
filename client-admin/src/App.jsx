import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./app.css";
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

  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <ApolloProvider client={client}>
          <CssBaseline>
            <TopBar />
            <Router>
              <Sidebar />
              <Switch>
                <Route path="/admin/wallets">
                  <Wallets />
                </Route>
                <Route path="/admin/accounts">
                  <Accounts />
                </Route>
                <Route path="/admin/tracker">
                  <PriceTracker />
                </Route>
                <Route path="/admin/transactions">
                  <Transactions />
                </Route>
                <Route path="/admin/settings">
                  <Settings />
                </Route>
                <Route path="/admin">
                  <Wallets />
                </Route>
              </Switch>
            </Router>
          </CssBaseline>
        </ApolloProvider>
      </ThemeProvider>
    </div>
  );
}
