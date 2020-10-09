import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Block from "../../atoms/Block";
import Tooltip from "@material-ui/core/Tooltip";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  walletProgress: {},
  tooltip: {
    fontSize: 20,
  },
  spinner: {
    cursor: "pointer",
  },
}));

const ProgressTooltip = withStyles((theme) => ({
  tooltip: {
    fontFamily: '"Roboto",  sans-serif',
    fontSize: 14,
    lineHeight: 1.64,
    padding: 15,
    maxWidth: 330,
    backgroundColor: "#898989",
  },
}))(Tooltip);

export default function () {
  const classes = useStyles();
  return (
    <Block className={classes.walletProgress}>
      <ProgressTooltip title="Updating Wallets">
        <CircularProgress
          color="secondary"
          className={classes.spinner}
          style={{ height: 20, width: 20 }}
        />
      </ProgressTooltip>
    </Block>
  );
}
