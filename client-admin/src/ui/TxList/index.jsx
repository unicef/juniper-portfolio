import React, { Fragment, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import PriceInfoBanner from "../PriceInfoBanner";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import Pagination from "../pagination";
import MenuPopper from "../MenuPopper";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import { TextButton } from "../Buttons";

const transactionDetailsStyles = makeStyles((theme) => ({
  root: {
    marginTop: "5em",
  },
  subtitle: {
    fontSize: 14,
    fontWeight: 700,
    letterSpacing: 0.78,
    color: "#898989",
    textTransform: "uppercase",
    marginBottom: "1em",
  },
  allTransactionsButton: {
    float: "right",
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: 1,
    fontFamily: '"Cabin", sans-serif',
    color: "#00aeef",
    "&:hover": {
      backgroundColor: "#ecfaff",
    },
    "& .MuiButton-endIcon": {
      margin: 0,
    },
  },
  transactionDetails: {
    marginTop: "2em",
  },
  list: {
    padding: 0,
    width: 160,
  },
  listText: {
    "& span, & svg": {
      fontSize: 12,
    },
    fontWeight: 700,
    letterSpacing: 1,
    fontFamily: '"Cabin", sans-serif',
    color: "#00aeef",
    textTransform: "uppercase",
  },
}));

export default function TxList({
  title,
  txs,
  TxCard,
  page,
  fetchWallets,
  onPaginationClick,
  setAuthorizationRecord,
  exchangeRate,
  isAdmin,
  showPriceInfo,
}) {
  const classes = transactionDetailsStyles();

  const [limit, setLimit] = useState(10);

  const start = page * limit;
  const end = page * limit + limit;
  const totalItems = txs.length;
  const totalPages = Math.ceil(totalItems / limit);
  const currentPage = page + 1;

  return (
    <Fragment>
      <Grid container className={classes.root}>
        <Grid item xs={6}>
          <h3 className={classes.subtitle}> {title}</h3>
        </Grid>
        <Grid item xs={6}>
          <MenuPopper
            buttonStyles={{ float: "right" }}
            button={
              <TextButton endIcon={<KeyboardArrowDownIcon />} float={"right"}>
                {limit} Transactions
              </TextButton>
            }
          >
            <List
              component="nav"
              className={classes.list}
              aria-label="secondary mailbox folders"
            >
              <ListItem button>
                <ListItemText
                  className={classes.listText}
                  primary="5 Transactions"
                  onClick={() => {
                    setLimit(5);
                  }}
                />
              </ListItem>
              <Divider />
              <ListItem button>
                <ListItemText
                  className={classes.listText}
                  primary="10 Transactions"
                  onClick={() => {
                    setLimit(10);
                  }}
                />
              </ListItem>
              <Divider />
              <ListItem button>
                <ListItemText
                  className={classes.listText}
                  primary="25 Transactions"
                  onClick={() => {
                    setLimit(25);
                  }}
                />
              </ListItem>
            </List>
          </MenuPopper>
        </Grid>
      </Grid>
      <Divider />
      {showPriceInfo && (
        <Grid container className={classes.transactionDetails}>
          <Grid item xs={12}>
            <PriceInfoBanner />
          </Grid>
        </Grid>
      )}
      {txs && (
        <List>
          {txs.slice(start, end).map((tx, index) => {
            return (
              <ListItem
                key={index}
                style={{ borderBottom: "solid 1px #cecece" }}
              >
                <TxCard
                  tx={tx}
                  txid={tx.txid}
                  timestamp={tx.timestamp}
                  address={tx.address}
                  currency={tx.currency}
                  amount={tx.amount}
                  symbol={tx.symbol}
                  amountUSD={tx.amountUSD}
                  sent={tx.sent}
                  received={tx.received}
                  to={tx.to || tx.address}
                  from={tx.from || tx.address}
                  donor={tx.donor}
                  setAuthorizationRecord={setAuthorizationRecord}
                  exchangeRate={exchangeRate}
                  isAdmin={isAdmin}
                  fetchWallets={fetchWallets}
                />
              </ListItem>
            );
          })}
        </List>
      )}
      {totalItems > limit && (
        <Pagination
          start={start + 1}
          end={end}
          totalItems={totalItems}
          totalPages={totalPages}
          currentPage={currentPage}
          onClick={onPaginationClick}
        />
      )}
    </Fragment>
  );
}
