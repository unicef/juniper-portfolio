import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  containedButton: {
    minWidth: 148,
    height: 35,
    fontFamily: '"Cabin", sans-serif',
    fontSize: 12,
    fontWeight: 700,
    textAlign: "center",
    color: "#ffffff",
    boxShadow: "none",
  },
}));

export default function ({
  startIcon,
  endIcon,
  onClick,
  float,
  children,
  style,
}) {
  const classes = useStyles();
  return (
    <Button
      variant="contained"
      color="primary"
      className={classes.containedButton}
      startIcon={startIcon ? startIcon : null}
      endIcon={endIcon ? endIcon : null}
      onClick={onClick}
      style={{ float: float ? float : "left", ...style }}
    >
      {children}
    </Button>
  );
}
