import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: "3em",
    "& > * + *": {
      marginTop: "6em",
    },
  },
  breadcrumbLink: {
    cursor: "pointer",
    textTransform: "uppercase",
    textDecoration: "none",
    fontWeight: 700,
    color: "#00aaef",
    letterSpacing: 1.17,
    fontSize: 14,
  },
  breadcrumbText: {
    textTransform: "uppercase",
    textDecoration: "underline",
    fontWeight: 700,
    color: "#00aaef",
    letterSpacing: 1.17,
    fontSize: 14,
  },
}));

export default function Breadcrumb({ viewWalletDetails, walletName }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        className={classes.breadcrumb}
      >
        <Typography
          className={classes.breadcrumbLink}
          onClick={() => {
            viewWalletDetails(null);
          }}
        >
          Your Wallets
        </Typography>
        <Typography className={classes.breadcrumbText}>{walletName}</Typography>
      </Breadcrumbs>
    </div>
  );
}
