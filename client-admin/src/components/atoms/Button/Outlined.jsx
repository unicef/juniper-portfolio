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
    color: theme.palette.primary.main,
    borderColor: theme.palette.primary.main,
    borderRadius: 5,
    "&:hover": {
      backgroundColor: theme.palette.primary.textHover,
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
      variant="outlined"
      className={classes.outlineButton}
      startIcon={startIcon ? startIcon : null}
      endIcon={endIcon ? endIcon : null}
      onClick={onClick}
      style={{ float: float ? float : "left", ...style }}
    >
      {children}
    </Button>
  );
}
