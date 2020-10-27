import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles((theme) => ({
  chip: {
    borderRadius: 5,
    fontFamily: '"Cabin", sans-serif',
    fontSize: 10,
    fontWeight: 500,
    letterSpacing: 0.83,
    color: "#898989",
    textTransform: "uppercase",
    marginRight: "1em",
  },
}));

export default function WalletCard({ tag }) {
  const classes = useStyles();

  return (
    <Chip
      key={tag}
      variant="outlined"
      size="small"
      label={tag}
      className={classes.chip}
    />
  );
}
