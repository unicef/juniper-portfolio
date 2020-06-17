import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { useMediaQuery } from "@material-ui/core";

const useStyles = makeStyles((theme: any) => ({
  mainText: {
    width: "723px",
    fontFamily: "Cabin",
    fontSize: "32px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.44",
    letterSpacing: "normal",
    color: "#ffffff",
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
export const MainText = () => {
  const classes = useStyles();
  const mobileDevice = useMediaQuery("(max-width: 800px)");
  const [mainText] = useState(
    "To understand and be ready for a digitally financed future, UNICEF with the support of donors is the first UN organisation to receive and hold crypto-denominated assets through its CryptoFund. By contributing either bitcoin or ether to the CryptoFund, donors support the growth of open-source technology projects. UNICEF’s work will benefit from tapping into new funding streams via cryptocurrency, ultimately driving greater impact for the entire organisation and, most importantly, children."
  );
  return (
    <div className={mobileDevice ? classes.mobile : classes.mainText}>
      {mainText}
    </div>
  );
};
