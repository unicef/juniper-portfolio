import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Snackbar from "../../ui/Snackbar";
import CircularProgress from "@material-ui/core/CircularProgress";
import AccountLayout from "../../ui/AccountLayout";
import { CreateStartup } from "../../ui/Dialog";

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

export default function Transactions({ getExchangeRate }) {
  const classes = useStyles();
  const [activeTab, setActiveTab] = useState(0);

  const changeView = (event, newTab) => {
    setActiveTab(newTab);
  };

  useEffect(() => {}, []);

  return (
    <div className={classes.root}>
      <StyledTabs value={activeTab} onChange={changeView} centered>
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
          title={"3 Investments"}
          type={"Startups"}
          addButtonText={"Create Startup Account"}
          CreateModal={CreateStartup}
          totalEther={100}
          totalETHUSD={25000}
          totalBitcoin={1}
          totalBTCUSD={20000}
          accounts={mockAccountData}
          message={
            "The investments are made through UNICEF’s CryptoFund, in open source technology solutions that benefit children and the world."
          }
        />
      </TabPanel>
      <TabPanel activeTab={activeTab} index={1}>
        <AccountLayout
          title={"2 Donors"}
          type={"Donors"}
          addButtonText={"Create Donor Account"}
          totalEther={57}
          totalETHUSD={18000}
          totalBitcoin={2}
          totalBTCUSD={40000}
          accounts={mockDonorData}
          message={
            "In line with current UNICEF practice, each crypto transaction is initiated after UNICEF has completed due diligence on a donor, ensuring a credible source of the donation."
          }
        />
        />
      </TabPanel>
      <TabPanel activeTab={activeTab} index={2}>
        <AccountLayout
          title={"5 Natcoms"}
          type={"Natcoms"}
          addButtonText={"Create Natcom Account"}
          totalEther={25}
          totalETHUSD={12000}
          totalBitcoin={2.5}
          totalBTCUSD={50000}
          accounts={mockNatcomData}
          message={
            "Cryptofund donations are received by HQ through four National Committees - Australia, France, New Zealand and the United States."
          }
        />
      </TabPanel>
    </div>
  );
}

const mockAccountData = [
  {
    image:
      "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
    name: "Startup 1",
    location: "Location",
    totalETHInvested: 10,
    totalETHUSD: 25000,
  },
  {
    image:
      "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
    name: "Startup 2",
    location: "Location",
    totalBTCInvested: 1,
    totalBTCUSD: 20000,
  },
  {
    image: null,
    name: "Startup 3",
    location: "Location",
    totalETHInvested: 10,
    totalETHUSD: 25000,
    totalBTCInvested: 1,
    totalBTCUSD: 20000,
  },
  {
    image: null,
    name: "Startup 4",
    location: "Location",
    totalETHInvested: 10,
    totalETHUSD: 25000,
    totalBTCInvested: 1,
    totalBTCUSD: 20000,
  },
];

const mockDonorData = [
  {
    name: "Donor 1",
    totalETHInvested: 10,
    totalETHUSD: 25000,
  },
  {
    name: "Donor 2",
    totalBTCInvested: 1,
    totalBTCUSD: 20000,
  },
  {
    name: "Donor 3",
    totalETHInvested: 10,
    totalETHUSD: 25000,
    totalBTCInvested: 1,
    totalBTCUSD: 20000,
  },
  {
    name: "Donor 4",
    totalETHInvested: 10,
    totalETHUSD: 25000,
    totalBTCInvested: 1,
    totalBTCUSD: 20000,
  },
];

const mockNatcomData = [
  {
    name: "Natcom 1",
    totalETHInvested: 10,
    totalETHUSD: 25000,
  },
  {
    name: "Donor 2",
    totalBTCInvested: 1,
    totalBTCUSD: 20000,
  },
  {
    name: "Donor 3",
    totalETHInvested: 10,
    totalETHUSD: 25000,
    totalBTCInvested: 1,
    totalBTCUSD: 20000,
  },
  {
    name: "Donor 4",
    totalETHInvested: 10,
    totalETHUSD: 25000,
    totalBTCInvested: 1,
    totalBTCUSD: 20000,
  },
];
