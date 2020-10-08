import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  fetchingTxs: {
    textAlign: "center",
  },
}));

export default function LoadingScreen(props) {
  const classes = useStyles();
  return (
    <div className={classes.fetchingTxs}>
      <CircularProgress />
      <h2>{props.loadingMessage}</h2>
    </div>
  );
}
