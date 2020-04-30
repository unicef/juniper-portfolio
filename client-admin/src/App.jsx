import React, { Component } from 'react';
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";


export default class App extends Component {
  render() {
    return (
      <ThemeProvider
        theme={createMuiTheme({
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
            "fontWeightMedium": 500
          }
        })}
      >
        <CssBaseline>
          <div className="App">
            test
          </div>
        </CssBaseline>
      </ThemeProvider>
    );
  }
}


