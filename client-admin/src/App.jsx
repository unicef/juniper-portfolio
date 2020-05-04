import React, { createContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Sidebar from './components/Sidebar';
import Profiles from "./components/Profiles"
import PriceTracker from "./components/PriceTracker"
import Settings from "./components/Settings"
import Transactions from "./components/Transactions"
import Wallets from "./components/Wallets"
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo'

const client = new ApolloClient({
  uri: '/api'
})

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    backgroundColor: "#ffffff",
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#0068ea",
    },
    background: {
      default: '#ffffff'
    }
  },
  typography: {
    "fontFamily": "\"Cabin\",  sans-serif",
    "fontSize": 12,
    "fontWeightLight": 300,
    "fontWeightRegular": 400,
    "fontWeightMedium": 500,
    "color": '#002452'
  }
})

export default function () {
  const classes = useStyles();
  return (
    <ThemeProvider
      theme={theme}
    >
      <ApolloProvider client={client}>
        <CssBaseline>
          <Router>
            <div className={classes.root}>
              <Sidebar />
              <main className={classes.content}>
                <Switch>
                  <Route path="/transactions">
                    <Transactions />
                  </Route>
                  <Route path="/wallets">
                    <Wallets />
                  </Route>
                  <Route path="/profiles">
                    <Profiles />
                  </Route>
                  <Route path="/tracker">
                    <PriceTracker />
                  </Route>
                  <Route path="/settings">
                    <Settings />
                  </Route>
                  <Route path="/">
                    <Transactions />
                  </Route>
                </Switch>
              </main>
            </div>
          </Router>
        </CssBaseline >
      </ApolloProvider>
    </ThemeProvider >
  );

}


