import React, { Fragment, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import PriceInfoBanner from "../PriceInfoBanner";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import AccountBalanceCard from "../Cards/AccountBalanceCard";
import AccountCard from "../Cards/AccountCard";
import { AccountDetails } from "../../ui/Dialog";
import { StartupDetails } from "../../ui/Dialog";

const transactionDetailsStyles = makeStyles((theme) => ({
  root: {
    marginTop: "5em",
  },
  bannerBox: {
    marginTop: "2em",
    minHeight: 330,
  },
  title: {
    fontFamily: '"Roboto",  sans-serif',
    fontSize: 28,
    fontWeight: 700,
    lineHeight: 1,
    color: "000000",
    marginTop: 50,
  },
  messageBox: {
    minHeight: 160,
  },
  message: {
    fontFamily: '"Roboto",  sans-serif',
    fontSize: 19,
    lineHeight: 1.42,
    marginTop: 0,
    minHeight: 110,
  },
  messageButton: {
    fontSize: 12,
    fontWeight: 700,
    fontFamily: '"Cabin", sans-serif',
    color: "#00aeef",
    "&:hover": {
      backgroundColor: "#ecfaff",
    },
    "& .MuiButton-endIcon": { marginLeft: 0 },
  },
  walletSubheading: {
    fontSize: 14,
    fontWeight: 700,
    letterSpacing: 0.78,
    color: "#898989",
    textTransform: "uppercase",
    marginBottom: "2em",
  },
  addButton: {
    height: 35,
    fontFamily: '"Cabin", sans-serif',
    fontSize: 12,
    fontWeight: 700,
    textAlign: "center",
    color: "#ffffff",
    boxShadow: "none",
  },
}));

export default function AccountLayout({
  title,
  type,
  message,
  totalEther,
  totalETHUSD,
  totalBitcoin,
  totalBTCUSD,
  accounts,
  addButtonText,
  CreateModal,
  onDialogClose,
  ethRate,
  btcRate,
  copyToClipboard,
}) {
  const classes = transactionDetailsStyles();
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openDetails, setOpenAccountDetails] = useState(false);
  const [openStartupDetails, setOpenStartupDetails] = useState(false);
  const [detailsAccount, setDetailsAccount] = useState(null);

  const closeCreateDialog = () => {
    setOpenCreateDialog(false);
    setDetailsAccount(null);
    onDialogClose();
  };
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
        copyToClipboard={copyToClipboard}
      />
      <StartupDetails
        open={openStartupDetails}
        type={type}
        title={"Investment Details"}
        setOpenDetails={setOpenStartupDetails}
        account={detailsAccount}
        ethRate={ethRate}
        btcRate={btcRate}
        copyToClipboard={copyToClipboard}
      />

      <Grid container className={classes.bannerBox}>
        <Grid item xs={12}>
          <PriceInfoBanner />
        </Grid>
        <Grid item xs={12}>
          <h1 className={classes.title}>{title}</h1>
        </Grid>
        <Grid item xs={3}>
          <AccountBalanceCard
            amountInvested={totalEther}
            amountInvestedUSD={totalETHUSD}
            currency={"Ethereum"}
            symbol={"ETH"}
          />
        </Grid>
        <Grid item xs={3}>
          <AccountBalanceCard
            amountInvested={totalBitcoin}
            amountInvestedUSD={totalBTCUSD}
            currency={"Bitcoin"}
            symbol={"BTC"}
          />
        </Grid>
        <Grid item xs={6} className={classes.messageBox}>
          <p className={classes.message}>{message}</p>
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
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            className={classes.addButton}
            onClick={() => {
              setOpenCreateDialog(true);
            }}
          >
            {addButtonText}
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
                  name={account.name}
                  type={account.type}
                  image={account.image}
                  country={account.country}
                  totalETHInvested={account.totalETHInvested}
                  totalETHUSD={account.totalETHUSD}
                  totalBTCInvested={account.totalBTCInvested}
                  totalBTCUSD={account.totalBTCUSD}
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
