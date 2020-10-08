import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

const useStyles = makeStyles((theme) => ({
  leftRightNav: {
    marginTop: 38,
    display: "block",
    marginBottom: 15,
  },
  leftRight: {
    color: theme.palette.primary.main,
    margin: 0,
    display: "flex",
    padding: 0,
    flexWrap: "wrap",
    listStyle: "none",
    alignItems: "center",
  },
  text: {
    minWidth: 125,
    color: theme.palette.primary.main,
    fontSize: 14,
    fontWeight: 700,
    lineHeight: 2,
    letterSpacing: 0.78,
    textTransform: "uppercase",
    textAlign: "center",
  },
}));

export default function ({
  disabledLeft,
  clickLeft,
  text,
  disabledRight,
  clickRight,
}) {
  const classes = useStyles();
  return (
    <nav className={classes.leftRightNav}>
      <ul className={classes.leftRight}>
        <li>
          <IconButton
            color="inherit"
            disabled={disabledLeft}
            onClick={clickLeft}
          >
            <ChevronLeftIcon />
          </IconButton>
        </li>
        <li className={classes.text}>{text}</li>
        <li>
          <IconButton
            color="inherit"
            disabled={disabledRight}
            onClick={clickRight}
          >
            <ChevronRightIcon />
          </IconButton>
        </li>
      </ul>
    </nav>
  );
}
