/* eslint eqeqeq: 0 */
import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  root: {
    // width: "400px",
    padding: "25px 35px",
  },

  mobile: {
    padding: "50px 0px 0px 25px",
    //height: '65%',
  },
});

export const ProgressBar = (props: any) => {
  const classes = useStyles();

  if (props.type == "Invested") {
    return (
      <img
        className={classes.root}
        src="./progressbar_3.svg"
        alt="receive info"
      />
    );
  } else {
    return (
      <img
        className={classes.root}
        src="./progressbar_2.svg"
        alt="receive info"
      />
    );
  }
};

export const ProgressBarMobile = (props: any) => {
  const classes = useStyles();

  if (props.type == "Invested") {
    return (
      <img
        className={classes.mobile}
        src="./progressbar_mobile_3.svg"
        alt="receive info"
      />
    );
  } else {
    return (
      <img
        className={classes.mobile}
        src="./progressbar_mobile_2.svg"
        alt="receive info"
      />
    );
  }
};
