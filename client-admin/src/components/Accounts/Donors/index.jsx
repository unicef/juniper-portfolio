import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MainContentContainer from "../../../ui/MainContentContainer";

const useStyles = makeStyles({
  root: {
    marginTop: "20px",
    backgroundColor: "#f8f8f8",
  },
});

export default function Donors() {
  const classes = useStyles();
  return (
    <MainContentContainer className={classes.root}>Donors</MainContentContainer>
  );
}
