import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  outlineButton: {
    height: 35,
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: 1,
    fontFamily: '"Cabin", sans-serif',
    color: "#00aeef",
    borderColor: "#00aeef",
    borderRadius: 5,
    "&:hover": {
      backgroundColor: "#ecfaff",
    },
  },
}));

export default function ({ startIcon, endIcon, onClick, float, children }) {
  const classes = useStyles();
  return (
    <Button
      variant="outlined"
      className={classes.outlineButton}
      startIcon={startIcon ? startIcon : null}
      endIcon={endIcon ? endIcon : null}
      onClick={onClick}
      style={{ float: float ? float : "left" }}
    >
      {children}
    </Button>
  );
}
