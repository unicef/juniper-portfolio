import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { useMediaQuery } from "@material-ui/core";

const useStyles = makeStyles((theme: any) => ({
  mainText: {
    fontFamily: "Cabin",
    fontSize: "32px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.44",
    letterSpacing: "normal",
    color: "#ffffff",
    width: "80%",
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
export const InvestmentMainText = () => {
  const classes = useStyles();
  const mobileDevice = useMediaQuery("(max-width: 800px)");

  const [mainText] = useState(
    "The CryptoFund makes crypto-denominated investments in companies that are developing open-source software and data-driven solutions to address the most pressing challenges facing children and young people. Projects receiving investment must use the cryptocurrency in its native form. In addition to receiving crypto assets, projects receive mentorship on various topics to develop their solutions. The CryptoFund empowers groups to create digital public goods with the hope of making a positive impact."
  );
  const [secondText] = useState(
    "Check below for projects who have received funding: "
  );
  return (
    <div className={mobileDevice ? classes.mobile : classes.mainText}>
      {mainText}
      <br />
      <br />
      {secondText}
    </div>
  );
};
