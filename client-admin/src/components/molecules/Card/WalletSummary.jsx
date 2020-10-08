import React, { Fragment, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import EditIcon from "@material-ui/icons/Edit";
import AddWallet from "../../organisms/Dialog/AddWallet";
import { usdFormatter, cryptoFormatter } from "../../../util";
import TextButton from "../../atoms/Button/TextIcon";
import CopyAddressButton from "../Button/CopyAddress";
import Card from "../../atoms/Card";
import CardTitle from "../../atoms/Text/CardTitle";
import Chip from "../../atoms/Chip";
import SummarySubtitle from "../../atoms/Text/SummarySubtitle";
import CardBalance from "../../atoms/Text/CardBalance";
import CardAddress from "../../atoms/Text/CardAddress";

const useStyles = makeStyles((theme) => ({
  walletBalance: {
    marginTop: 20,
  },
  owners: {
    color: theme.palette.primary.main,
    fontSize: 18,
    lineHeight: 1.33,
    marginTop: 20,
  },
}));

export default function ({
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
    <Card>
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
      <CardTitle>{name}</CardTitle>
      {tags &&
        tags.map((tag) => {
          return <Chip tag={tag} key={tag} />;
        })}
      <Grid container>
        <Grid item md={2}>
          <div className={classes.walletBalance}>
            <CardBalance isBold={true}>
              {cryptoFormatter(balance)} {symbol}
            </CardBalance>
          </div>
          <SummarySubtitle>Wallet Balance</SummarySubtitle>
        </Grid>
        <Grid item md={2}>
          <div className={classes.walletBalance}>
            <CardBalance>
              {balance && usdFormatter.format(balance * exchangeRate)} USD
            </CardBalance>
          </div>
          <SummarySubtitle>Current Value</SummarySubtitle>
        </Grid>

        <Grid item md={2}>
          <div className={classes.walletBalance}>
            <CardBalance>
              {feesUSD && usdFormatter.format(feesUSD)} USD
            </CardBalance>
          </div>
          <SummarySubtitle>Transaction Fees</SummarySubtitle>
        </Grid>
      </Grid>
      <CardAddress>
        {address} <CopyAddressButton address={address}>Copy</CopyAddressButton>
      </CardAddress>
      <SummarySubtitle>Wallet Address</SummarySubtitle>
      {isMultisig && (
        <Fragment>
          <div className={classes.owners}>{multisigOwners.length} users</div>
          <SummarySubtitle>Wallet Owners</SummarySubtitle>
        </Fragment>
      )}
    </Card>
  );
}
