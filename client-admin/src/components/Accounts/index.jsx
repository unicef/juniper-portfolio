import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Snackbar from "../../ui/Snackbar";
import CircularProgress from "@material-ui/core/CircularProgress";
import AccountLayout from "../../ui/AccountLayout";
import { CreateAccount } from "../../ui/Dialog";

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

export default function Accounts({ getExchangeRate }) {
  const classes = useStyles();
  const [activeTab, setActiveTab] = useState(0);
  const [startups, setStartups] = useState([]);
  const [startupEth, setStartupEth] = useState(0);
  const [startupBtc, setStartupBtc] = useState(0);

  const [natcoms, setNatcoms] = useState([]);
  const [natcomEth, setNatcomEth] = useState(0);
  const [natcomBtc, setNatcomBtc] = useState(0);

  const [donors, setDonors] = useState([]);
  const [donorEth, setDonorEth] = useState(0);
  const [donorBtc, setDonorBtc] = useState(0);

  const [ethRate, setEthRate] = useState(0);
  const [btcRate, setBtcRate] = useState(0);

  const changeView = (event, newTab) => {
    setActiveTab(newTab);
  };

  const getAccounts = async () => {
    let res, accounts, ethRate, btcRate;
    try {
      res = await fetch("/rest/admin/accounts");
      ethRate = await getExchangeRate("ETH");
      btcRate = await getExchangeRate("BTC");
    } catch (e) {
      console.log(e);
    }

    let startupEth = 0;
    let startupBtc = 0;
    let donorEth = 0;
    let donorBtc = 0;
    let natcomEth = 0;
    let natcomBtc = 0;

    if (res.status === 200) {
      accounts = await res.json();

      accounts.forEach((account) => {
        let totalETHInvested = 0;
        let totalBTCInvested = 0;

        account.addresses.forEach((address) => {
          if (address.currency === "Ether") {
            totalETHInvested += Number(address.amount);
          }
          if (address.currency === "Bitcoin") {
            totalBTCInvested += Number(address.amount);
          }
        });
        account.totalETHInvested = totalETHInvested;
        account.totalETHUSD = totalETHInvested * ethRate;
        account.totalBTCInvested = totalBTCInvested;
        account.totalBTCUSD = totalBTCInvested * btcRate;

        if (account.type === "startup") {
          startupEth += totalETHInvested;
          startupBtc += totalBTCInvested;
        } else if (account.type === "donor") {
          donorEth += totalETHInvested;
          donorBtc += totalBTCInvested;
        } else if (account.type === "natcom") {
          natcomEth += totalETHInvested;
          natcomBtc += totalBTCInvested;
        }
      });
    }
    console.log(accounts);
    setEthRate(ethRate);
    setBtcRate(btcRate);

    setStartups(accounts.filter((account) => account.type === "startup"));
    setStartupEth(startupEth);
    setStartupBtc(startupBtc);

    setDonors(accounts.filter((account) => account.type === "donor"));
    setDonorEth(donorEth);
    setDonorBtc(donorBtc);

    setNatcoms(accounts.filter((account) => account.type === "natcom"));
    setNatcomEth(natcomEth);
    setNatcomEth(natcomBtc);
  };

  useEffect(() => {
    getAccounts();
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
          onDialogClose={getAccounts}
          totalEther={startupEth}
          totalETHUSD={startupEth * ethRate}
          totalBitcoin={startupBtc}
          totalBTCUSD={startupBtc * btcRate}
          accounts={startups}
          message={
            "The investments are made through UNICEF’s CryptoFund, in open source technology solutions that benefit children and the world."
          }
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
          onDialogClose={getAccounts}
          totalEther={donorEth}
          totalETHUSD={donorEth * ethRate}
          totalBitcoin={donorBtc}
          totalBTCUSD={donorBtc * btcRate}
          accounts={donors}
          message={
            "In line with current UNICEF practice, each crypto transaction is initiated after UNICEF has completed due diligence on a donor, ensuring a credible source of the donation."
          }
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
          onDialogClose={getAccounts}
          totalEther={natcomEth}
          totalETHUSD={natcomEth * ethRate}
          totalBitcoin={natcomBtc}
          totalBTCUSD={natcomBtc * btcRate}
          accounts={natcoms}
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
