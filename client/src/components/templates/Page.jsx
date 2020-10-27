import React, { useState } from "react";
import { makeStyles, withStyles, useTheme } from "@material-ui/core/styles";
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
    flexFlow: "column",
    display: "flex",
  },
  padding: {
    paddingTop: "2em",
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
      className={"tabpanel"}
      {...other}
      style={{
        backgroundColor: "#f8f8f8",
        paddingBottom: "5em",
        overflowY: "auto",
      }}
    >
      {activeTab === index && <Container maxWidth="md">{children}</Container>}
    </div>
  );
}

const StyledTabs = withStyles((theme) => ({
  indicator: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    "& > span": {
      width: "100%",
      backgroundColor: theme.palette.primary.main,
    },
  },
}))((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

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

export default function PageLayout({ tabs, children, style }) {
  const classes = useStyles();
  const [activeTab, setActiveTab] = useState(0);

  const changeView = (event, newTab) => {
    setActiveTab(newTab);
  };

  const theme = useTheme();

  return (
    <div className={classes.root} style={{ ...style }}>
      <StyledTabs
        value={activeTab}
        onChange={changeView}
        className={classes.navigation}
        centered
      >
        {tabs.map((tab, index) => {
          return (
            <StyledTab
              key={index}
              label={tab}
              style={
                activeTab === index ? { color: theme.palette.primary.main } : {}
              }
            />
          );
        })}
      </StyledTabs>

      {children &&
        children.map((child, index) => {
          return (
            <TabPanel key={index} activeTab={activeTab} index={index}>
              <div className={classes.padding}>{child}</div>
            </TabPanel>
          );
        })}
    </div>
  );
}
