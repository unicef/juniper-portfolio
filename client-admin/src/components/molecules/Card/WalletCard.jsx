import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { usdFormatter, cryptoFormatter } from "../../../util";
import CopyAddressButton from "../Button/CopyAddress";
import TextButton from "../../atoms/Button/TextIcon";
import OutlinedButton from "../../atoms/Button/Outlined";
import { Link } from "react-router-dom";
import Card from "../../atoms/Card";
import CardTitle from "../../atoms/Text/CardTitle";
import Chip from "../../atoms/Chip";
import SummarySubtitle from "../../atoms/Text/SummarySubtitle";
import CardBalance from "../../atoms/Text/CardBalance";
import CardAddress from "../../atoms/Text/CardAddress";

const useStyles = makeStyles((theme) => ({
  walletBalance: {
    marginTop: 18,
  },

  buttons: {
    marginTop: 30,
    clear: "both",
  },
}));

export default function WalletCard({
  name,
  tags,
  symbol,
  balance,
  address,
  exchangeRate,
  fetchWallets,
  isUnicef,
}) {
  const classes = useStyles();

  const unfollowWallet = async (address) => {
    try {
      await fetch(`/rest/admin/wallets/untrack/${address}`);
    } catch (e) {
      console.log(e);
    }
  };

  const handleUnfollow = async () => {
    await unfollowWallet(address);
    await fetchWallets();
  };

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
          {balance && usdFormatter(balance * exchangeRate)} USD
        </CardBalance>
      </div>

      <SummarySubtitle>Wallet Balance</SummarySubtitle>
      <CardAddress>{address}</CardAddress>
      <SummarySubtitle>Wallet Address</SummarySubtitle>

      <div className={classes.buttons}>
        <CopyAddressButton address={address} />
        {isUnicef ? (
          <Link to={`/admin/wallets/transactions/${address}`}>
            <TextButton endIcon={<ChevronRightIcon />} float={"right"}>
              View Transactions
            </TextButton>
          </Link>
        ) : (
          <OutlinedButton onClick={handleUnfollow} float={"right"}>
            Unfollow
          </OutlinedButton>
        )}
      </div>
    </Card>
  );
}
