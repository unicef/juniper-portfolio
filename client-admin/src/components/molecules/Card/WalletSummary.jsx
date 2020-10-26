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
import Modal from "../../atoms/Modal";
import WalletOwnerCard from "./WalletOwnerCard";
import CancelIcon from "../../atoms/Icons/CancelIcons";

const useStyles = makeStyles((theme) => ({
  walletBalance: {
    marginTop: 20,
  },
  title: {
    fontFamily: '"Roboto", sans-serif',
    fontSize: 18,
    lineHeight: 1.33,
    fontWeight: 700,
    padding: "20px 0px 0px 40px",
  },
  owners: {
    color: theme.palette.primary.main,
    fontSize: 18,
    lineHeight: 1.33,
    marginTop: 20,
    cursor: "pointer",
  },
  closeIcon: {
    position: "absolute",
    right: 8,
    top: 8,
    cursor: "pointer",
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
  const [open, setOpen] = useState(false);

  return (
    <Card>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <h2 className={classes.title}>Wallet Owners</h2>
        <CancelIcon
          className={classes.closeIcon}
          onClick={() => {
            setOpen(false);
          }}
        />
        {multisigOwners &&
          multisigOwners.map((owner) => {
            return (
              <WalletOwnerCard
                address={owner.walletAddress}
                owner={owner.ownerName}
              />
            );
          })}
      </Modal>
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
              {balance && usdFormatter(balance * exchangeRate)} USD
            </CardBalance>
          </div>
          <SummarySubtitle>Current Value</SummarySubtitle>
        </Grid>

        <Grid item md={2}>
          <div className={classes.walletBalance}>
            <CardBalance>{feesUSD && usdFormatter(feesUSD)} USD</CardBalance>
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
          <div
            className={classes.owners}
            onClick={() => {
              setOpen(true);
            }}
          >
            {multisigOwners.length} users
          </div>
          <SummarySubtitle>Wallet Owners</SummarySubtitle>
        </Fragment>
      )}
    </Card>
  );
}
