import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  imgSpecs: {
    width: "236px",
    paddingTop: "10px",
  },
});

export const ReceiveImage = () => {
  const classes = useStyles();
  return (
    <img
      className={classes.imgSpecs}
      src="/Receive_illustration.svg"
      alt="ratio of crypto pie chart"
    />
  );
};
