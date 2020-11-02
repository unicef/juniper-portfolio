import React, { useState, Fragment } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import WalletsIcon from "../../atoms/Icons/WalletsIcon";
import AccountsIcon from "../../atoms/Icons/AccountsIcon";
import PriceTrackerIcon from "../../atoms/Icons/PriceTrackerIcon";
import TransactionsIcon from "../../atoms/Icons/TransactionsIcon";
import USDIcon from "../../atoms/Icons/USDIcon";
import SettingsIcon from "@material-ui/icons/Settings";
import { usdFormatter } from "../../../util";
import TextButton from "../../atoms/Button/TextIcon";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import PriceModal from "../../organisms/PriceModal";

const useStyles = makeStyles((theme) => ({
  list: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  listItem: {
    height: "1.6em",
    minWidth: 40,
  },
  navIcon: {
    width: "1.5em",
    color: "#4d4d4d",
  },
  navIconSelected: {
    width: "1.5em",
    color: theme.palette.primary.main,
  },
  navText: {
    fontSize: 12,
    fontWeight: 700,
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: 1,
    textAlign: "left",
    textTransform: "uppercase",
  },
  navLink: {
    height: 55,
    paddingLeft: 20,
    color: "#4d4d4d",
  },
  priceArea: {
    color: "#929292",
  },
  link: {
    textDecoration: "none",
  },
  priceHeader: {
    fontFamily: '"Roboto", sans-serif',
    fontSize: 15,
    fontWeight: 700,
    lineHeight: 1.6,
    color: "#898989",
  },
  price: {
    fontFamily: '"Roboto", sans-serif',
    fontSize: 15,
    lineHeight: 1.6,
    color: "#898989",
  },
}));

const JuniperListItem = withStyles((theme) => ({
  root: {
    "&$selected": {
      color: theme.palette.primary.main,
      backgroundColor: "#ffffff",
      "&:hover": {},
    },
    "&:hover": {},
  },
  selected: {},
}))(ListItem);

export default function SidebarNavigation(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleListItemClick = (event, index) => {
    props.setPageIndex(index);
  };

  return (
    <List
      component="nav"
      aria-label="Sidebar Navigation"
      className={classes.list}
    >
      <PriceModal open={open} setOpen={setOpen}></PriceModal>
      <Link to={"/admin/wallets"} className={classes.link}>
        <JuniperListItem
          button
          selected={props.pageIndex === 0}
          onClick={(event) => handleListItemClick(event, 0)}
          className={classes.navLink}
        >
          <ListItemIcon className={classes.listItem}>
            <WalletsIcon
              className={
                props.pageIndex === 0
                  ? classes.navIconSelected
                  : classes.navIcon
              }
            />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography className={classes.navText}>Wallets</Typography>
            }
          />
        </JuniperListItem>
      </Link>
      <Link to={"/admin/accounts"} className={classes.link}>
        <JuniperListItem
          button
          selected={props.pageIndex === 1}
          onClick={(event) => handleListItemClick(event, 1)}
          className={classes.navLink}
        >
          <ListItemIcon className={classes.listItem}>
            <AccountsIcon
              className={
                props.pageIndex === 1
                  ? classes.navIconSelected
                  : classes.navIcon
              }
            />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography className={classes.navText}>Accounts</Typography>
            }
          />
        </JuniperListItem>
      </Link>
      <Link to={"/admin/tracker"} className={classes.link}>
        <JuniperListItem
          button
          selected={props.pageIndex === 2}
          onClick={(event) => handleListItemClick(event, 2)}
          className={classes.navLink}
        >
          <ListItemIcon className={classes.listItem}>
            <PriceTrackerIcon
              className={
                props.pageIndex === 2
                  ? classes.navIconSelected
                  : classes.navIcon
              }
            />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography className={classes.navText}>Price Tracker</Typography>
            }
          />
        </JuniperListItem>
      </Link>
      <Link to={"/admin/transactions"} className={classes.link}>
        <JuniperListItem
          button
          selected={props.pageIndex === 3}
          onClick={(event) => handleListItemClick(event, 3)}
          className={classes.navLink}
        >
          <ListItemIcon className={classes.listItem}>
            <TransactionsIcon
              className={
                props.pageIndex === 3
                  ? classes.navIconSelected
                  : classes.navIcon
              }
            />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography className={classes.navText}>Transactions</Typography>
            }
          />
        </JuniperListItem>
      </Link>

      <Link to={"/admin/settings"} className={classes.link} style={{ flex: 2 }}>
        <JuniperListItem
          button
          selected={props.pageIndex === 4}
          onClick={(event) => handleListItemClick(event, 4)}
          className={classes.navLink}
        >
          <ListItemIcon className={classes.listItem}>
            <SettingsIcon
              className={
                props.pageIndex === 4
                  ? classes.navIconSelected
                  : classes.navIcon
              }
            />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography className={classes.navText}>Settings</Typography>
            }
          />
        </JuniperListItem>
      </Link>

      <JuniperListItem className={classes.priceArea}>
        <ListItemIcon className={classes.listItem} style={{ height: 30 }}>
          <USDIcon
            fontSize="large"
            viewBox="0 0 30 30"
            style={{ color: "#adadad" }}
          />
        </ListItemIcon>
        <ListItemText
          primary={
            <Typography className={classes.navText}>Today's Price</Typography>
          }
        />
      </JuniperListItem>
      <JuniperListItem
        className={classes.priceArea}
        style={{ paddingBottom: 0 }}
      >
        <ListItemText
          primary={
            <Fragment>
              <Typography className={classes.priceHeader}>1 ETH</Typography>
              <Typography className={classes.price}>
                {usdFormatter(props.ethRate)} USD
              </Typography>
            </Fragment>
          }
        />
      </JuniperListItem>
      <JuniperListItem className={classes.priceArea} style={{ paddingTop: 0 }}>
        <ListItemText
          primary={
            <Fragment>
              <Typography className={classes.priceHeader}>1 BTC</Typography>
              <Typography className={classes.price}>
                {usdFormatter(props.btcRate)} USD
              </Typography>
            </Fragment>
          }
        />
      </JuniperListItem>
      <JuniperListItem>
        <TextButton
          endIcon={<ChevronRightIcon />}
          style={{ paddingLeft: 0 }}
          onClick={() => {
            setOpen(true);
          }}
        >
          USD Price Calculation
        </TextButton>
      </JuniperListItem>
    </List>
  );
}
