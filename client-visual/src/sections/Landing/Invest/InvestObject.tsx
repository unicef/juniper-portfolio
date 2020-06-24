import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },

  text: {
    width: "120px",
    fontFamily: "IBM Plex Sans",
    fontSize: "16px",
    fontWeight: "bold",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.44",
    letterSpacing: "normal",
    color: "#fff",
    paddingTop: "20px",
  },
  title: {
    textTransform: "uppercase",
    letterSpacing: "1.5px",
    fontSize: "14px",
    fontWeight: "normal",
  },
  numberOfInvestments: {
    color: "#fff",
  },
  amountOfBitcoin: {
    color: "#ffd113",
  },
  amountOfEther: {
    color: "#13e7ff",
  },
});

export const InvestObject = () => {
  const classes = useStyles();
  const [title] = useState("Invested");
  const [numberOfInvestments] = useState(11);
  const [amountOfBitcoin] = useState(1);
  const [amountOfEther] = useState(1100);
  return (
    <div className={classes.text}>
      <span className={classes.title}>{title}</span>
      <div className={classes.numberOfInvestments}>
        {numberOfInvestments} investments
      </div>
      <div className={classes.amountOfBitcoin}>{amountOfEther} ether</div>
      <div className={classes.amountOfEther}>{amountOfBitcoin} bitcoin</div>
    </div>
  );
};
