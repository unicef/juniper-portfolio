import React, { createContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Sidebar from './components/Sidebar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#0068ea",
    },
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
      <CssBaseline>
        <div className={classes.root}>
          <Sidebar />
          <main className={classes.content}>
            Content
          </main>
        </div>
      </CssBaseline>
    </ThemeProvider>
  );

}


