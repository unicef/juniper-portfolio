import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  textButton: {
    fontSize: 12,
    letterSpacing: 1.17,
    fontWeight: 700,
    fontFamily: '"Cabin", sans-serif',
    color: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: "rgba(0,0,0,0)",
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
      disableRipple={true}
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
