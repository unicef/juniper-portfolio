import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PriceIcon from "../Icons/PriceIcon";

const useStyles = makeStyles((theme) => ({
  priceInfoBanner: {
    fontFamily: '"Roboto", sans-serif',
    minHeight: 77,
    borderRadius: 5,
    fontSize: 19,
    backgroundColor: "#daf5ff",
    display: "flex",
    flexDirection: "rows",
    alignItems: "center",
    justifyContent: "center",
  },

  priceIcon: {
    marginRight: 5,
  },
  priceTitle: {
    marginRight: 5,
  },
  moreInfo: {
    textTransform: "uppercase",
    textDecoration: "none",
    width: 73,
    height: 15,
    fontSize: 12,
    fontWeight: 700,
    color: "#00aeef",
    marginLeft: "1em",
  },
}));

export default function PriceInfoBanner() {
  const classes = useStyles();
  return (
    <div className={classes.priceInfoBanner}>
      <PriceIcon className={classes.priceIcon} />
      <b className={classes.priceTitle}>USD Price</b> = Average across three
      cryptocurrency exchanges, calculated at 12:01 pm (EST)
      <a href="/#" className={classes.moreInfo}>
        More Info
      </a>
    </div>
  );
}
