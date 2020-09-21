import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  textButton: {
    fontSize: 12,
    letterSpacing: 1.17,
    fontWeight: 700,
    fontFamily: '"Cabin", sans-serif',
    color: "#00aeef",
    "&:hover": {
      backgroundColor: "#ecfaff",
    },
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
      className={classes.textButton}
      startIcon={startIcon ? startIcon : null}
      endIcon={endIcon ? endIcon : null}
      onClick={onClick}
      style={{ float: float ? float : null, ...style }}
    >
      {children}
    </Button>
  );
}
