import React, { Fragment, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import PriceInfoBanner from "../molecules/Info/PriceInfo";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import AccountBalanceCard from "../../ui/Cards/AccountBalanceCard";
import AccountCard from "../molecules/Card/AccountCard";
import { AccountDetails } from "../organisms/Dialog";
import { PayeeDetails } from "../organisms/Dialog";
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
  transactions
}) {
  const classes = transactionDetailsStyles();
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openDetails, setOpenAccountDetails] = useState(false);
  const [openPayeeDetails, setOpenPayeeDetails] = useState(false);
  const [detailsAccount, setDetailsAccount] = useState(null);
  const [totalEtherSent, setTotalEtherSent] = useState(0);
  const [totalEtherReceive, setTotalEtherReceive] = useState(0);
  const [totalETHUSDSent, setTotalETHUSDSent] = useState(0);
  const [totalETHUSDReceive, setTotalETHUSDReceive] = useState(0);
  const [totalBitcoin, setTotalBitcoin] = useState(0);
  const [totalBTCUSD, setTotalBTCUSD] = useState(0);

  const closeCreateDialog = () => {
    setOpenCreateDialog(false);
    setDetailsAccount(null);

    onDialogClose();
  };

  function calculateOverview() {
    let etherSentValues = [];
    let etherSentTxArray = [];
    let etherReceiveValues = []; // for natcom
    let etherReceiveTxArray = []; // for natcom

    transactions.map(transaction => {
      accounts.map(account => {
        for(var i = 0; i < account.addresses.length; i++){
          if(transaction.currency === 'Ethereum') {
            if(transaction.donor !== undefined && !etherReceiveTxArray.includes(transaction)) {
              etherReceiveTxArray.push(transaction) 
              etherReceiveValues.push(transaction.amount)
            }

            if(!etherSentTxArray.includes(transaction)) {
              if(transaction.sent) {
                etherSentTxArray.push(transaction) 
                etherSentValues.push(transaction.amount)
              }
            } 
            
          } 
          if(etherSentValues.length > 0) {
            setTotalEtherSent(etherSentValues.reduce((total = 0, value) =>  total + value ))
            setTotalETHUSDSent(etherSentValues.reduce((total, amount) => total + amount ) * ethRate)
          }
          if(etherReceiveValues.length > 0) {
            setTotalEtherReceive(etherReceiveValues.reduce((total = 0, value) =>  total + value ))
            setTotalETHUSDReceive(etherReceiveValues.reduce((total, amount) => total + amount ) * ethRate)
          }
        }
      })
    })
  }

  useEffect(() => {
    calculateOverview();
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
      <PayeeDetails
        open={openPayeeDetails}
        type={type}
        title={"Payee Details"}
        setOpenDetails={setOpenPayeeDetails}
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
            {
            type === 'natcom' ?
            "Total donations from National Committees" 
            : (
              `${accounts.length} ${title}${accounts.length === 1 ? "" : "s"}`
            )
          }
          </h1>
        </Grid>
        <Grid item xs={3}>
          <AccountBalanceCard
            amountInvested={type === "payee" ? totalEtherSent : totalEtherReceive}
            amountInvestedUSD={type === "payee" ? totalETHUSDSent : totalETHUSDReceive}
            currency={"Ether"}
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
                "https://cryptofund.unicef.io/about",
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
                    type === "payee"
                      ? setOpenPayeeDetails
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
