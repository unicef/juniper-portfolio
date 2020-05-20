import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';


import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import TopBar from './components/TopBar';
import Sidebar from './components/Sidebar';
import Profiles from "./components/Profiles"
import PriceTracker from "./components/PriceTracker"
import Settings from "./components/Settings"
import Transactions from "./components/Transactions"
import Wallets from "./components/Wallets"
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
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
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));



const client = new ApolloClient({
  uri: '/api'
})

const useStylesTwo = makeStyles((theme) => ({
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
      main: "#00aeef",
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

export default function ClippedDrawer() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ThemeProvider
      theme={theme}
    >
      <ApolloProvider client={client}>
      <CssBaseline>
        <TopBar />
          <Router>               
            <Sidebar />            
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
          </Router>
        </CssBaseline >
      </ApolloProvider>
    </ThemeProvider >
    </div>
  );
}




