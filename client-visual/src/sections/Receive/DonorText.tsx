import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { Button } from "@material-ui/core";

const useStyles = makeStyles({
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
    paddingBottom: "30px",
  },
  donationQueryButton: {
    marginTop: "25px",
    width: "195px",
    height: "50px",
    borderRadius: "5px",
    backgroundColor: "#0068ea",
  },
  donationQueryButtonText: {
    fontFamily: "Cabin",
    fontSize: "14px",
    fontWeight: "bold",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "1.17px",
    textAlign: "center",
    color: "#ffffff",
  },
});
export const DonorText = () => {
  const classes = useStyles();
  const [backgroundTitle] = useState("Our donors");
  const [donorText1] = useState(
    "Investing in open source technology to benefit children around the world wouldn’t be possible without our generous donors."
  );
  const [donorText2] = useState(
    "We would like to thank our anchor donor, the Ethereum Foundation, for helping to launch the CryptoFund. If you are interested in making a donation in either bitcoin or ether, please, contact us."
  );
  // const [donorText3] = useState(".");
  // const [blockchainEmail] = useState("blockchain@unicef.org");

  return (
    <div className={classes.root}>
      <div className={classes.backgroundTitle}>{backgroundTitle}</div>
      <div className={classes.backgroundText}>{donorText1}</div>
      {/* <br /> */}
      <div className={classes.backgroundText}>
        {donorText2}
        {/* <a href={`mailto:${blockchainEmail}`}>{blockchainEmail}</a> */}
        {/* {donorText3} */}
      </div>

      <Button
        href="mailto:blockchain@unicef.org"
        className={classes.donationQueryButton}
      >
        <span className={classes.donationQueryButtonText}>Donation Query</span>
      </Button>
    </div>
  );
};
