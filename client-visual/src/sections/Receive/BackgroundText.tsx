import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme: any) => ({
  root: {
    paddingTop: "100px",
    maxWidth: "100%",
    padding: "14px",
    width: "80%",
  },
  backgroundTitle: {
    fontFamily: "Cabin",
    fontSize: "28px",
    fontWeight: "bold",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.64",
    letterSpacing: "normal",
    color: "#000",
    paddingBottom: "30px",
  },
  backgroundText: {
    fontFamily: "IBM Plex Sans",
    fontSize: "18px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.55",
    letterSpacing: "normal",
    color: "#000",
  },
}));
export const BackgroundText = () => {
  const classes = useStyles();
  const [backgroundTitle] = useState("Background");
  const [backgroundText] = useState(
    "UNICEF’s CryptoFund was launched in October 2019. The CryptoFund is part of UNICEF’s larger Innovation Fund, which allows UNICEF to quickly assess, fund and grow open-source solutions that can improve children’s lives. Financial and technological support is available for companies that are using technology in innovative ways to improve the world. The Fund has made 98 investments in 56 countries with an eye to invest in 20 more start-ups each year. Until 2019, all investments were made in USD."
  );
  return (
    <div className={classes.root}>
      <div className={classes.backgroundTitle}>{backgroundTitle}</div>
      <div className={classes.backgroundText}>{backgroundText}</div>
    </div>
  );
};
