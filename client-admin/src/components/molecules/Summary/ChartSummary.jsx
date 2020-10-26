import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import SummaryTitle from "../../atoms/Text/SummaryTitle";
import SummarySubtitle from "../../atoms/Text/SummarySubtitle";

const useStyles = makeStyles((theme) => ({
  atom: {
    fontFamily: '"Roboto", sans-serif',
    fontSize: 28,
    paddingBottom: 30,
  },
}));

export default function ({ className, subtitle, title, isBold }) {
  const classes = useStyles();
  return (
    <Fragment>
      <div className={`${classes.atom} ${className}`}>
        <SummarySubtitle>{subtitle}</SummarySubtitle>
        <SummaryTitle>{isBold ? <b>{title}</b> : title}</SummaryTitle>
      </div>
    </Fragment>
  );
}
