import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { ArrowDownButton } from "./ArrowDownButton";

const useStyles = makeStyles((theme: any) => ({
  mainText: {
    fontFamily: "Cabin",
    fontSize: "14px",
    fontWeight: "bold",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "1.17px",
    color: "#ffffff",
    textTransform: "uppercase",
    margin: "auto",
    textAlign: "center",
  },
}));
export const ReceivePageArrow = () => {
  const classes = useStyles();

  const [text] = useState("Learn More");
  return (
    <div className={classes.mainText}>
      {text}
      <br />
      <ArrowDownButton />
    </div>
  );
};
