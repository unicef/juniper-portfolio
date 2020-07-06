import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Donors from "./Donors";
import Startups from "./Startups";
import Natcoms from "./Natcoms";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    //backgroundColor: theme.palette.background.paper,
    backgroundColor: "#f8f8f8",
  },
  appBar: {
    marginTop: "5em",
    boxShadow: "none",
  },
  navigation: {
    backgroundColor: "#ffffff",
  },
  navTab: {
    fontSize: "12px",
    fontWeight: 700,
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "1.2px",
    textAlign: "center",
    color: "#929292",
    textTransform: "uppercase",
  },

  tabpanel: {
    backgroundColor: "#f8f8f8",
  },
}));

const theme = createMuiTheme({
  typography: {
    fontFamily: '"Roboto",  sans-serif',
    fontSize: "19px",
    lineSize: "27px",
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    color: "#00000",

    h1: {
      fontWeight: 700,
      fontSize: "28px",
      lineHeight: "28px",
    },

    h2: {
      fontWeight: 700,
      fontSize: "24px",
      lineHeight: "28px",
      letterSpacing: 0,
    },
  },
});

export default function Accounts() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Tabs
          value={value}
          className={classes.navigation}
          onChange={handleChange}
          aria-label="simple tabs example"
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab className={classes.navTab} label="Startups" {...a11yProps(0)} />
          <Tab className={classes.navTab} label="Donors" {...a11yProps(1)} />
          <Tab className={classes.navTab} label="Natcoms" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <ThemeProvider theme={theme}>
        <TabPanel className={classes.tabpanel} value={value} index={0}>
          <Startups />
        </TabPanel>
        <TabPanel className={classes.tabpanel} value={value} index={1}>
          <Donors />
        </TabPanel>
        <TabPanel className={classes.tabpanel} value={value} index={2}>
          <Natcoms />
        </TabPanel>
      </ThemeProvider>
    </div>
  );
}
