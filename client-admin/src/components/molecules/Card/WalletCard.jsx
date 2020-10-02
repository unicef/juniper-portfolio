import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { usdFormatter, cryptoFormatter } from "../../../util";
import CopyAddressButton from "../Button/CopyAddress";
import TextButton from "../../atoms/Button/TextIcon";
import { Link } from "react-router-dom";
import Card from "../../atoms/Card";
import CardTitle from "../../atoms/Text/CardTitle";
import Chip from "../../atoms/Chip";
import SummarySubtitle from "../../atoms/Text/SummarySubtitle";
import CardBalance from "../../atoms/Text/CardBalance";
import CardAddress from "../../atoms/Text/CardAddress";

const useStyles = makeStyles((theme) => ({
  card: {
    minHeight: 301,
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
    wordBreak: "break-word",
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
    marginTop: 18,
  },

  buttons: {
    marginTop: 30,
    clear: "both",
  },
  leftButton: {
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: 0.83,
    fontFamily: '"Cabin", sans-serif',
    color: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: "#ecfaff",
    },
  },
  rightButton: {
    float: "right",
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: 0.83,
    fontFamily: '"Cabin", sans-serif',
    color: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: "#ecfaff",
    },
  },
}));

export default function WalletCard({
  name,
  tags,
  symbol,
  balance,
  address,
  exchangeRate,
}) {
  const classes = useStyles();

  return (
    <Card>
      <CardTitle>{name}</CardTitle>
      {tags &&
        tags.map((tag) => {
          return <Chip tag={tag} key={tag} />;
        })}
      <div className={classes.walletBalance}>
        <CardBalance isBold={true}>
          {cryptoFormatter(balance)} {symbol}
        </CardBalance>{" "}
        /{" "}
        <CardBalance>
          {balance && usdFormatter.format(balance * exchangeRate)} USD
        </CardBalance>
      </div>

      <SummarySubtitle>Wallet Balance</SummarySubtitle>
      <CardAddress>{address}</CardAddress>
      <SummarySubtitle>Wallet Address</SummarySubtitle>

      <div className={classes.buttons}>
        <CopyAddressButton address={address} />
        <Link to={`/admin/wallets/transactions/${address}`}>
          <TextButton endIcon={<ChevronRightIcon />} float={"right"}>
            View Transactions
          </TextButton>
        </Link>
      </div>
    </Card>
  );
}
