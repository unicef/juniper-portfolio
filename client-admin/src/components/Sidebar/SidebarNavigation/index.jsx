import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import WalletsIcon from "../../../ui/Icons/WalletsIcon";
import AccountsIcon from "../../../ui/Icons/AccountsIcon";
import PriceTrackerIcon from "../../../ui/Icons/PriceTrackerIcon";
import TransactionsIcon from "../../../ui/Icons/TransactionsIcon";
import SettingsIcon from "@material-ui/icons/Settings";

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
    color: "#00aeef",
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
  link: {
    textDecoration: "none",
  },
}));

const JuniperListItem = withStyles({
  root: {
    "&$selected": {
      color: "#00aeef",
      backgroundColor: "#ffffff",
      "&:hover": {},
    },
    "&:hover": {},
  },
  selected: {},
})(ListItem);

export default function SidebarNavigation(props) {
  const classes = useStyles();

  const handleListItemClick = (event, index) => {
    props.setPageIndex(index);
  };

  return (
    <List
      component="nav"
      aria-label="Sidebar Navigation"
      className={classes.list}
    >
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
      <Link
        to={"/admin/transactions"}
        className={classes.link}
        style={{ flex: 2 }}
      >
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
      <Link to={"/admin/settings"} className={classes.link}>
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
              fontSize="large"
            />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography className={classes.navText}>Settings</Typography>
            }
            style={{ marginTop: "1.25em" }}
          />
        </JuniperListItem>
      </Link>
    </List>
  );
}
