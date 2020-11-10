import React, { Fragment, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import PriceInfoBanner from "../molecules/Info/PriceInfo";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import AccountBalanceCard from "../../ui/Cards/AccountBalanceCard";
import AccountCard from "../molecules/Card/AccountCard";
import { AccountDetails } from "../organisms/Dialog";
import { StartupDetails } from "../organisms/Dialog";
import ContainedButton from "../atoms/Button/Contained";

const transactionDetailsStyles = makeStyles((theme) => ({
  title: {
    fontFamily: '"Roboto",  sans-serif',
    fontSize: 28,
    fontWeight: 700,
    lineHeight: 1,
    color: "000000",
    marginTop: 50,
  },
  messageBox: {
    minHeight: 114,
  },
  message: {
    fontFamily: '"Roboto",  sans-serif',
    fontSize: 19,
    lineHeight: 1.42,
    marginTop: 0,
    marginBottom: 9,
  },
  walletSubheading: {
    fontSize: 14,
    fontWeight: 700,
    letterSpacing: 0.78,
    color: "#898989",
    textTransform: "uppercase",
    marginBottom: "2em",
  },
}));

export default function AccountLayout({
  title,
  type,
  message,
  accounts,
  addButtonText,
  CreateModal,
  onDialogClose,
  ethRate,
  btcRate,
  isAdmin,
}) {
  const classes = transactionDetailsStyles();
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openDetails, setOpenAccountDetails] = useState(false);
  const [openStartupDetails, setOpenStartupDetails] = useState(false);
  const [detailsAccount, setDetailsAccount] = useState(null);
  const [totalEther, setTotalEther] = useState(0);
  const [totalETHUSD, setTotalETHUSD] = useState(0);
  const [totalBitcoin, setTotalBitcoin] = useState(0);
  const [totalBTCUSD, setTotalBTCUSD] = useState(0);

  const closeCreateDialog = () => {
    setOpenCreateDialog(false);
    setDetailsAccount(null);

    onDialogClose();
  };

  function calculateOverview() {
    setTotalEther(
      accounts.reduce((total, account) => {
        return total + account.etherBalance;
      }, 0)
    );
    setTotalETHUSD(
      accounts.reduce((total, account) => {
        return total + account.etherBalance;
      }, 0) * ethRate
    );
    setTotalBitcoin(
      accounts.reduce((total, account) => {
        return total + account.bitcoinBalance;
      }, 0)
    );
    setTotalBTCUSD(
      accounts.reduce((total, account) => {
        return total + account.bitcoinBalance;
      }, 0) * btcRate
    );
  }

  useEffect(() => {
    calculateOverview();
    console.log("fucking christ");
    console.log(accounts);
  }, [accounts]);

  return (
    <Fragment>
      {CreateModal && (
        <CreateModal
          type={type}
          open={openCreateDialog}
          onDialogClose={closeCreateDialog}
        />
      )}
      <AccountDetails
        open={openDetails}
        type={type}
        title={"Donation Details"}
        setOpenDetails={setOpenAccountDetails}
        account={detailsAccount}
        ethRate={ethRate}
        btcRate={btcRate}
      />
      <StartupDetails
        open={openStartupDetails}
        type={type}
        title={"Investment Details"}
        setOpenDetails={setOpenStartupDetails}
        account={detailsAccount}
        ethRate={ethRate}
        btcRate={btcRate}
        onDialogClose={closeCreateDialog}
      />

      <Grid container>
        <Grid item xs={12}>
          <PriceInfoBanner />
        </Grid>
        <Grid item xs={12}>
          <h1 className={classes.title}>
            {accounts.length} {title}
            {accounts.length === 1 ? "" : "s"}
          </h1>
        </Grid>
        <Grid item xs={3}>
          <AccountBalanceCard
            amountInvested={totalEther}
            amountInvestedUSD={totalETHUSD}
            currency={"Ethereum"}
            symbol={"ETH"}
            investedVerb={type === "donor" ? "received" : "invested"}
          />
        </Grid>
        <Grid item xs={3}>
          <AccountBalanceCard
            amountInvested={totalBitcoin}
            amountInvestedUSD={totalBTCUSD}
            currency={"Bitcoin"}
            symbol={"BTC"}
            investedVerb={type === "donor" ? "received" : "invested"}
          />
        </Grid>
        <Grid item xs={6} className={classes.messageBox}>
          <p className={classes.message}>{message}</p>
        </Grid>
        <Grid item xs={6}>
          {isAdmin && (
            <ContainedButton
              onClick={() => {
                setOpenCreateDialog(true);
              }}
            >
              {addButtonText}
            </ContainedButton>
          )}
        </Grid>
        <Grid item xs={6}>
          <Button
            className={classes.messageButton}
            endIcon={<ChevronRightIcon />}
            onClick={() => {
              window.open(
                "https://www.unicef.org/innovation/applyBlockchainCrypto",
                "_blank"
              );
            }}
          >
            Learn more about Cryptofund
          </Button>
        </Grid>
      </Grid>

      <Grid item xs={12} style={{ marginTop: "4em" }}>
        <h3 className={classes.walletSubheading}>
          {accounts.length} {type || ""} account
          {accounts.length === 1 ? "" : "s"}
        </h3>
      </Grid>
      <Grid container spacing={2} style={{ position: "relative" }}>
        {accounts &&
          accounts.map((account, index) => {
            return (
              <Grid item xs={6} key={`${index}-${account.name}`}>
                <AccountCard
                  account={account}
                  name={account.name}
                  type={account.type}
                  image={account.image}
                  country={account.country}
                  ethRate={ethRate}
                  btcRate={btcRate}
                  setOpenDetails={
                    type === "startup"
                      ? setOpenStartupDetails
                      : setOpenAccountDetails
                  }
                  setDetailsAccount={setDetailsAccount}
                />
              </Grid>
            );
          })}
      </Grid>
    </Fragment>
  );
}
