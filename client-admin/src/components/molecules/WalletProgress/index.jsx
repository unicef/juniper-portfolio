import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Block from "../../atoms/Block";
import Tooltip from "@material-ui/core/Tooltip";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  walletProgress: {},
}));

export default function () {
  const classes = useStyles();
  return (
    <Block className={classes.walletProgress}>
      <Tooltip title="Updating Wallets">
        <CircularProgress />
      </Tooltip>
    </Block>
  );
}
