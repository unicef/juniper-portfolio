import { createMuiTheme } from '@material-ui/core/styles'

export {}

declare global {
  interface Window {
    theme: any;
  }
}

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#0068ea",
      contrastText: "rgb(255, 255, 255) !important",
    },
    secondary: {
     // main: "#ffd113",
      main: '#ffffff'
    },   
    
  
  },
  typography: { 
    fontFamily: ['Red Hat Display', 'Roboto', 'sans-serif'].join(','),
    h5: {
      fontSize: 21,
      textTransform: "none",
      "@media (max-width: 600px)": {
        fontSize: 18,
      },
    },
    h4: {
      fontSize: 32,
      lineHeight: 1.34,
      textTransform: "none",
      "@media (max-width: 600px)": {
        fontSize: 26,
      },
    },
    h3: {
      textTransform: "none",
    },
    h2: {
      textTransform: "none",
    },
    h1: {
      fontSize: 58,
      lineHeight: 0.93,
      textTransform: "none",
      "@media (max-width: 600px)": {
        fontSize: 42,
      },
    },
    body2: {
      fontFamily: ['Roboto', 'sans-serif'].join(','),
      textTransform: "none",
      fontWeight: 500
    },
    body1: {
      fontFamily: ['Roboto', 'sans-serif'].join(','),
      textTransform: "none",
      letterSpacing: 'normal',
    },
    subtitle1: {
      fontFamily: ['Roboto', 'sans-serif'].join(','),
      fontSize: 14,
      lineHeight: 1.43,
    },
  }
})

// set a global var to check at any time from the browser console
window.theme = theme

export const globalStyles = () => ({
  '@global': {
    html: {
      boxSizing: 'border-box',
    },
    '*, *:before, *:after': {
      boxSizing: 'inherit',
    },
    body: {
      margin: '0 !important',
    },
    '#root': {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
    },
    main: {
      flex: 1,
      paddingTop: 50,
      paddingBottom: 50,
    }
  }
})