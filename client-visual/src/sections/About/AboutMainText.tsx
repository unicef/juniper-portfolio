import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles((theme: any) => ({
  desktop: {
    fontFamily: "Cabin",
    fontSize: "32px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.44",
    letterSpacing: "normal",
    color: "#000000",
    width: "724px",
    margin: "auto",
  },

  mobile: {
    fontFamily: "Cabin",
    fontSize: "24px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.44",
    letterSpacing: "normal",
    color: "#000000",
    width: "80%",
    margin: "auto",
  },
}));
export const AboutMainText = () => {
  const classes = useStyles();
  const mobiledevice = useMediaQuery("(max-width: 991px)");

  const [mainText] = useState(
    "UNICEF’s CryptoFund is a new financial vehicle allowing UNICEF to receive, hold, and disburse cryptocurrency - a first for the UN. The CryptoFund is part of UNICEF’s Venture Fund, with the distinction that investments through the CryptoFund are denominated in bitcoin and ether."
  );
  const [secondText] = useState(
    "Using the benefits of blockchain technology, the CryptoFund aspires to create visibility for the donor and public, adding a layer of transparent accounting to the donation process."
  );
  return (
    <div className={mobiledevice ? classes.mobile : classes.desktop}>
      {mainText}
      <br />
      <br />
      {secondText}
    </div>
  );
};
