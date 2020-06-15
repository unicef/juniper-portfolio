import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme: any) => ({
  root: {
    maxWidth: "100%",
    paddingTop: "120px",
    padding: "14px",
  },
  fundingProcessTitle: {
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
  fundingProcessText: {
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

export const FundingProcess = () => {
  const classes = useStyles();
  const [fundingProcessTitle] = useState("Our funding process");
  const [fundingProcessText1] = useState(
    "UNICEF is able to receive cryptocurrency donations via four official UNICEF fundraising entities, also known as National Committees (NatComs). Through these four National Committees - "
  );
  const [fundingProcessText2] = useState(
    " - donors are able to contribute to the CryptoFund in cryptocurrency"
  );
  const [australiaText] = useState("Australia");
  const [australiaLink] = useState("https://www.unicef.org.au/");
  const [franceText] = useState("France");
  const [franceLink] = useState(
    "https://lp.unicef.fr/donate-in-cryptocurrencies/"
  );
  const [newZealandText] = useState("New Zealand");
  const [newZealandLink] = useState(
    "https://www.unicef.org.nz/donate-in-crypto"
  );
  const [usaText] = useState("United States");
  const [usaLink] = useState("https://www.unicefusa.org/");
  return (
    <div className={classes.root}>
      <div className={classes.fundingProcessTitle}>{fundingProcessTitle}</div>
      <div className={classes.fundingProcessText}>
        {fundingProcessText1} <a href={australiaLink}>{australiaText}</a>,{" "}
        <a href={franceLink}>{franceText}</a>,{" "}
        <a href={newZealandLink}>{newZealandText}</a>, and the{" "}
        <a href={usaLink}>{usaText}</a>
        {fundingProcessText2}
      </div>
    </div>
  );
};
