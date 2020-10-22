import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextButton from "../../atoms/Button/TextIcon";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    textAlign: "center",
  },
}));

export default function (props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <TextButton {...props}>{props.children}</TextButton>
      <div>
        <TextButton {...props}>
          <KeyboardArrowDownIcon />
        </TextButton>
      </div>
    </div>
  );
}
