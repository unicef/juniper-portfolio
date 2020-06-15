import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  imgSpecs: {
    width: "255px",
    paddingTop: "25px",
  },
});

export const InvestImage = () => {
  const classes = useStyles();
  return (
    <div>
      <img
        className={classes.imgSpecs}
        src="./Invest_illustration.svg"
        alt="ratio of crypto pie chart"
      />
    </div>
  );
};
