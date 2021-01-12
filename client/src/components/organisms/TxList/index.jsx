import React, { Fragment, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import PriceInfoBanner from "../../molecules/Info/PriceInfo";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import Pagination from "../../molecules/Pagination";
import MenuPopper from "../../molecules/MenuPopper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import TextButton from "../../atoms/Button/TextIcon";

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
    color: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: theme.palette.primary.textButtonHover,
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
      fontWeight: 400,
      letterSpacing: 1,
      fontFamily: '"Roboto", sans-serif',
      color: "#000000",

      fontSize: 16,
    },
  },
  bold: {
    "& span, & svg": {
      fontWeight: 700,
    },
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
  const [sort, setSort] = useState("Date");

  const start = page * limit;
  const end = page * limit + limit;
  const totalItems = txs.length;
  const totalPages = Math.ceil(totalItems / limit);
  const currentPage = page + 1;

  switch (sort) {
    case "Date":
      txs = txs.sort((a, b) => {
        return new Date(b.timestamp) - new Date(a.timestamp);
      });
      break;
    case "Amount":
      txs = txs.sort((a, b) => {
        return b.amount - a.amount;
      });
      break;
    case "Untagged Tx":
      txs = txs
        .filter((tx) => {
          return !tx.donor && !tx.source;
        })
        .concat(
          txs.filter((tx) => {
            return tx.donor || tx.source;
          })
        );

      break;
    case "Tagged Tx":
      txs = txs
        .filter((tx) => {
          return tx.donor || tx.source;
        })
        .concat(
          txs.filter((tx) => {
            return !tx.donor && !tx.source;
          })
        );

      break;
    default:
  }

  return (
    <Fragment>
      <Grid container className={classes.root}>
        <Grid item xs={6}>
          <h3 className={classes.subtitle}> {title}</h3>
        </Grid>
        <Grid item xs={6} style={{ textAlign: "right" }}>
          <MenuPopper
            button={
              <TextButton endIcon={<KeyboardArrowDownIcon />} float={"right"}>
                Sort By: {sort}
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
                  className={`${classes.listText} ${
                    sort === "Date" ? classes.bold : ""
                  }`}
                  primary="Date"
                  onClick={() => {
                    setSort("Date");
                  }}
                />
              </ListItem>

              <ListItem button>
                <ListItemText
                  className={`${classes.listText} ${
                    sort === "Amount" ? classes.bold : ""
                  }`}
                  primary="Amount"
                  onClick={() => {
                    setSort("Amount");
                  }}
                />
              </ListItem>

              <ListItem button>
                <ListItemText
                  className={`${classes.listText} ${
                    sort === "Untagged Tx" ? classes.bold : ""
                  }`}
                  primary="Untagged Tx"
                  onClick={() => {
                    setSort("Untagged Tx");
                  }}
                />
              </ListItem>

              <ListItem button>
                <ListItemText
                  className={`${classes.listText} ${
                    sort === "Tagged Tx" ? classes.bold : ""
                  }`}
                  primary="Tagged Tx"
                  onClick={() => {
                    setSort("Tagged Tx");
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
                style={{
                  borderBottom: "solid 1px #cecece",
                  paddingLeft: 0,
                  paddingRight: 0,
                }}
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
