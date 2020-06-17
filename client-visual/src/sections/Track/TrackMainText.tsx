import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { useMediaQuery } from "@material-ui/core";

const useStyles = makeStyles((theme: any) => ({
  desktop: {
    width: "723px",
    fontFamily: "Cabin",
    fontSize: "32px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.44",
    letterSpacing: "normal",
    color: "#ffffff",
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
    color: "#ffffff",
  },
}));
export const TrackMainText = () => {
  const classes = useStyles();
  const mobiledevice = useMediaQuery("(max-width: 700px)");

  const [mainText] = useState(
    "The UNICEF CryptoFund is a part of the organisation’s work to explore the transparent nature of public blockchains and the ability to quickly transfer assets globally. The CryptoFund allows anyone with an internet connection to confirm transfers have been made between donors, UNICEF and projects. The CryptoFund brings a new level of transparency and speed to the disbursement of funds."
  );
  return (
    <div className={mobiledevice ? classes.mobile : classes.desktop}>
      {mainText}
    </div>
  );
};
