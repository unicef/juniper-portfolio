import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import AccountLayout from "../../ui/Layout/AccountLayout";
import { CreateAccount } from "../../ui/Dialog";
import { getExchangeRate } from "../../actions";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: "4em",
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
  fetchingTxs: {
    textAlign: "center",
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

export default function Accounts({ isAdmin, accounts, ethRate, btcRate }) {
  const classes = useStyles();
  const [activeTab, setActiveTab] = useState(0);
  const [startups, setStartups] = useState([]);
  const [natcoms, setNatcoms] = useState([]);
  const [donors, setDonors] = useState([]);

  const changeView = (event, newTab) => {
    setActiveTab(newTab);
  };

  const filterAccounts = async () => {
    setStartups(accounts.filter((account) => account.type === "startup"));
    setDonors(accounts.filter((account) => account.type === "donor"));
    setNatcoms(accounts.filter((account) => account.type === "natcom"));
  };

  useEffect(() => {
    filterAccounts();
  }, []);

  return (
    <div className={classes.root}>
      <StyledTabs
        value={activeTab}
        className={classes.navigation}
        onChange={changeView}
        centered
      >
        <StyledTab
          label="Startups"
          style={activeTab === 0 ? { color: "#00aeef" } : {}}
        />
        <StyledTab
          label="Donors"
          style={activeTab === 1 ? { color: "#00aeef" } : {}}
        />
        <StyledTab
          label="Natcoms"
          style={activeTab === 2 ? { color: "#00aeef" } : {}}
        />
      </StyledTabs>
      <Typography className={classes.padding} />

      <TabPanel activeTab={activeTab} index={0}>
        <AccountLayout
          title={`${startups.length} ${
            startups.length === 1 ? "Investment" : "Investments"
          }`}
          type={"startup"}
          addButtonText={"Create Startup Account"}
          CreateModal={CreateAccount}
          onDialogClose={filterAccounts}
          accounts={startups}
          ethRate={ethRate}
          btcRate={btcRate}
          message={
            "The investments are made through UNICEF’s CryptoFund, in open source technology solutions that benefit children and the world."
          }
          isAdmin={isAdmin}
        />
      </TabPanel>
      <TabPanel activeTab={activeTab} index={1}>
        <AccountLayout
          title={`${donors.length} ${
            donors.length === 1 ? "Investment" : "Investments"
          }`}
          type={"donor"}
          addButtonText={"Create Donor Account"}
          CreateModal={CreateAccount}
          onDialogClose={filterAccounts}
          accounts={donors}
          ethRate={ethRate}
          btcRate={btcRate}
          message={
            "In line with current UNICEF practice, each crypto transaction is initiated after UNICEF has completed due diligence on a donor, ensuring a credible source of the donation."
          }
          isAdmin={isAdmin}
        />
      </TabPanel>
      <TabPanel activeTab={activeTab} index={2}>
        <AccountLayout
          title={`${natcoms.length} ${
            natcoms.length === 1 ? "Investment" : "Investments"
          }`}
          type={"natcom"}
          addButtonText={"Create Natcom Account"}
          CreateModal={CreateAccount}
          onDialogClose={filterAccounts}
          accounts={natcoms}
          ethRate={ethRate}
          btcRate={btcRate}
          message={
            "Cryptofund donations are received by HQ through four National Committees - Australia, France, New Zealand and the United States."
          }
          isAdmin={isAdmin}
        />
      </TabPanel>
    </div>
  );
}
