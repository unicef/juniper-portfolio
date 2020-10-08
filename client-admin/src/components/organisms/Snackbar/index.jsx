import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const useStyles = makeStyles({
  snackbar: {
    backgroundColor: "#2ad05f",
    paddingTop: 12,
    fontFamily: '"Roboto", sans-serif',
    fontSize: 19,
    "& .MuiSvgIcon-root": {
      fontSize: 35,
      color: "#ffffff",
    },
  },
});

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function SnackbarAlert({
  open,
  icon,
  severity,
  duration,
  message,
  onClose,
  vertical = "bottom",
  horizontal = "center",
}) {
  const classes = useStyles();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    onClose();
  };

  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical, horizontal }}
      autoHideDuration={duration || 6000}
      onClose={handleClose}
    >
      <Alert
        icon={icon}
        onClose={handleClose}
        severity={severity}
        className={classes.snackbar}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
