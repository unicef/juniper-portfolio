import React, { Fragment, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import EditIcon from "@material-ui/icons/Edit";
import AddWallet from "../Dialog/AddWallet";
import { usdFormatter, cryptoFormatter } from "../../util";
import { TextButton, CopyAddressButton } from "../Buttons";

const useStyles = makeStyles((theme) => ({
  wallet: {
    position: "relative",
    backgroundColor: "#ffffff",
    fontFamily: '"Roboto", sans-serif',
    paddingTop: 10,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 25,
    "& .MuiButton-endIcon": {
      margin: 0,
    },
    "& .MuiButton-startIcon": {
      margin: 0,
    },
  },
  name: {
    fontSize: 24,
    fontWeight: 700,
    lineHeight: 1.17,
    color: "#000000",
    marginBottom: 10,
  },
  chip: {
    borderRadius: 5,
    fontFamily: '"Cabin", sans-serif',
    fontSize: 10,
    fontWeight: 500,
    letterSpacing: 0.83,
    color: "#898989",
    textTransform: "uppercase",
    marginRight: "1em",
  },
  walletBalance: {
    fontFamily: '"Roboto", sans-serif',
    fontSize: 18,
    marginTop: 18,
    lineHeight: 1.33,
  },
  currencyBalance: {
    fontWeight: 700,
  },
  walletSubtitle: {
    fontFamily: '"Cabin", sans-serif',
    color: "#000000",
    marginTop: 6,
    letterSpacing: 0.83,
    fontSize: 10,
    fontWeight: 500,
    textTransform: "uppercase",
  },
  address: {
    marginTop: 20,
    fontFamily: '"Roboto", sans-serif',
    fontSize: 14,
    fontWeight: 700,
    lineHeight: 1.57,
    color: "#000000",
  },
  leftButton: {
    fontSize: 12,
    fontWeight: 700,
    fontFamily: '"Cabin", sans-serif',
    color: "#00aeef",
    "&:hover": {
      backgroundColor: "#ecfaff",
    },
  },
  editWalletButton: {
    position: "absolute",
    marginTop: "1em",
    marginRight: "1em",
    right: 6,
    fontSize: 12,
    fontWeight: 700,
    fontFamily: '"Cabin", sans-serif',
    color: "#00aeef",
    "&:hover": {
      backgroundColor: "#ecfaff",
    },
  },
  owners: {
    color: "#00aaef",
    fontSize: 18,
    lineHeight: 1.33,
    marginTop: 20,
  },
}));

export default function WalletDetailsCard({
  name,
  tags,
  currency,
  symbol,
  balance,
  feesUSD,
  address,
  exchangeRate,
  isUnicef,
  isTracked,
  isMultisig,
  afterEditWallet,
  multisigOwners,
}) {
  const classes = useStyles();
  const [showAddWalletModal, setShowAddWalletModal] = useState(false);

  return (
    <div className={classes.wallet}>
      <AddWallet
        open={showAddWalletModal}
        setShowAddWalletModal={setShowAddWalletModal}
        afterAddWallet={() => {
          afterEditWallet();
        }}
        showMultisig={true}
        name={name}
        tags={tags}
        currency={currency}
        symbol={symbol}
        balance={balance}
        feesUSD={feesUSD}
        address={address}
        isUnicef={isUnicef}
        isTracked={isTracked}
        isMultisig={isMultisig}
        multisigOwners={multisigOwners}
        editWallet={true}
      />

      <TextButton
        startIcon={<EditIcon style={{ marginRight: 5 }} />}
        float={"right"}
        onClick={() => {
          setShowAddWalletModal(true);
        }}
      >
        Edit Wallet
      </TextButton>
      <h2 className={classes.name}>{name}</h2>
      {tags &&
        tags.map((tag) => {
          return (
            <Chip
              key={tag}
              variant="outlined"
              size="small"
              label={tag}
              className={classes.chip}
            />
          );
        })}
      <Grid container>
        <Grid item md={2}>
          <div className={classes.walletBalance}>
            <span className={classes.currencyBalance}>
              {cryptoFormatter(balance)} {symbol}
            </span>
          </div>
          <div className={classes.walletSubtitle}>Wallet Balance</div>
        </Grid>
        <Grid item md={2}>
          <div className={classes.walletBalance}>
            {balance && usdFormatter.format(balance * exchangeRate)} USD
          </div>
          <div className={classes.walletSubtitle}>Current Value</div>
        </Grid>
        <Grid item md={2}>
          <div className={classes.walletBalance}>
            {feesUSD && usdFormatter.format(feesUSD)} USD
          </div>
          <div className={classes.walletSubtitle}>Transaction Fees</div>
        </Grid>
      </Grid>
      <div className={classes.address}>
        {address} <CopyAddressButton address={address}>Copy</CopyAddressButton>
      </div>
      <div className={classes.walletSubtitle}>Wallet Address</div>
      {isMultisig && (
        <Fragment>
          <div className={classes.owners}>{multisigOwners.length} users</div>
          <div className={classes.walletSubtitle}>Wallet Owners</div>
        </Fragment>
      )}
    </div>
  );
}
