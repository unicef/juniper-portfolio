import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: '"Cabin", sans-serif',
  },
  boxLeft: {
    color: "#929292",
    textTransform: "uppercase",
    fontWeight: 700,
    fontSize: 12,
    letterSpacing: 1,
    paddingTop: 12,
  },
  boxRight: {
    textAlign: "right",
  },
  pagination: {
    float: "right",

    "& button": {
      height: 32,
      width: 7,
      padding: 0,
      color: theme.palette.primary.main,
      fontSize: 14,
      letterSpacing: 1.17,
      fontWeight: 700,
      "&.Mui-selected": {
        borderRadius: 0,
        backgroundColor: theme.palette.primary.main,
        color: "#ffffff",
      },
    },
  },
}));

export default function PagePagination({
  start,
  end,
  totalItems,
  totalPages,
  currentPage,
  onClick,
}) {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid item xs={7} className={classes.boxLeft}>
        Showing {start} - {totalItems < end ? totalItems : end} of {totalItems}{" "}
        Transactions
      </Grid>
      <Grid item xs={5} className={classes.boxRight}>
        <Pagination
          count={totalPages}
          shape="rounded"
          className={classes.pagination}
          page={currentPage}
          onChange={(e, value) => {
            onClick(value - 1);
          }}
        />
      </Grid>
    </Grid>
  );
}
