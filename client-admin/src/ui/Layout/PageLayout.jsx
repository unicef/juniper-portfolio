import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "4em",
    flexGrow: 1,
    height: "100%",
    backgroundColor: "#f8f8f8",
  },
  padding: {
    padding: theme.spacing(3),
  },
  navigation: {
    backgroundColor: "#ffffff",
  },
  tabs: {
    backgroundColor: "#2e1534",
  },
}));

function TabPanel(props) {
  const { children, activeTab, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={activeTab !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={{ backgroundColor: "#f8f8f8", paddingBottom: "2em" }}
    >
      {activeTab === index && <Container maxWidth="md">{children}</Container>}
    </div>
  );
}

const StyledTabs = withStyles({
  indicator: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    "& > span": {
      width: "100%",
      backgroundColor: "#00aeef",
    },
  },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const StyledTab = withStyles((theme) => ({
  root: {
    textTransform: "uppercase",
    color: "#929292",
    fontWeight: 700,
    fontSize: 12,
    letterSpacing: 1.2,
    opacity: 1,
  },
}))((props) => <Tab disableRipple {...props} />);

export default function Wallets({ tabs, pages }) {
  const classes = useStyles();
  const [activeTab, setActiveTab] = useState(0);

  const changeView = (event, newTab) => {
    setActiveTab(newTab);
  };

  return (
    <div className={classes.root}>
      <StyledTabs
        value={activeTab}
        onChange={changeView}
        className={classes.navigation}
        centered
      >
        {tabs.map((tab, index) => {
          return (
            <StyledTab
              label={tab}
              style={activeTab === index ? { color: "#00aeef" } : {}}
            />
          );
        })}
      </StyledTabs>
      <Typography className={classes.padding} />

      {pages &&
        pages.map((page, index) => {
          return (
            <TabPanel activeTab={activeTab} index={index}>
              {page}
            </TabPanel>
          );
        })}
    </div>
  );
}
