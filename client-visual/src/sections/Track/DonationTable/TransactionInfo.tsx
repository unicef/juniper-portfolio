import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: "relative",
      backgroundColor: "white",
      color: "#0068ea",
    },
    title: {
      marginLeft: theme.spacing(1),
      flex: 1,
      fontFamily: "Cabin",
      fontSize: "16px",
      fontWeight: "bold",
      fontStretch: "normal",
      fontStyle: "normal",
      lineHeight: "normal",
      letterSpacing: "1px",
      color: "#0068ea",
    },
    label: {
      fontFamily: "Cabin",
      fontSize: "10px",
      fontWeight: "bold",
      fontStretch: "normal",
      fontStyle: "normal",
      lineHeight: "normal",
      letterSpacing: "0.83px",
      color: "#000",
      paddingLeft: "25px",
      paddingBottom: "9px",
    },
    value: {
      fontFamily: "IBM Plex Sans",
      fontSize: "16px",
      fontWeight: "normal",
      fontStretch: "normal",
      fontStyle: "normal",
      lineHeight: "1.38",
      letterSpacing: "normal",
      color: "#000",
      paddingLeft: "25px",
      paddingBottom: "21px",
    },
    valueLink: {
      fontFamily: "IBM Plex Sans",
      fontSize: "16px",
      fontWeight: "normal",
      fontStretch: "normal",
      fontStyle: "normal",
      lineHeight: "1.38",
      letterSpacing: "normal",
      color: "#0068ea",
      paddingLeft: "25px",
      paddingBottom: "21px",
    },
  })
);

export function TransactionInfo(props: any) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        color="primary"
        style={{
          fontFamily: "Cabin",
          fontSize: "10px",
          fontWeight: "bold",
          fontStretch: "normal",
          fontStyle: "normal",
          lineHeight: "normal",
          letterSpacing: "0.83px",
          color: "#0068ea",
          paddingBottom: "40px",
          paddingLeft: "27px",
        }}
        onClick={handleClickOpen}
      >
        Show Transaction Details
      </Button>
      <Dialog fullScreen open={open} onClose={handleClose}>
        <AppBar elevation={0} className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="primary" onClick={handleClose}>
              <ArrowBackIosIcon />
            </IconButton>
            <Typography color="primary" className={classes.title}>
              BACK
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid style={{ borderBottom: "solid #bbb 1px" }}>
          <div style={{ paddingTop: "40px" }} className={classes.label}>
            FROM
          </div>
          <div className={classes.value}>{props.field1}</div>
          <div className={classes.label}>RECEPIENT</div>
          <div className={classes.value}>{props.field2}</div>
          <div className={classes.label}>AMOUNT</div>
          <div className={classes.value}>{props.field3}</div>
          <div className={classes.label}>TIME</div>
          <div className={classes.value}>{props.field4}</div>
          <div className={classes.label}>TRANSACTION LINK</div>
          <div style={{ paddingBottom: "40px" }} className={classes.valueLink}>
            {props.field5}
          </div>
        </Grid>
        {props.yes ? (
          <Grid>
            <div style={{ paddingTop: "40px" }} className={classes.label}>
              FROM
            </div>
            <div className={classes.value}>{props.field6}</div>
            <div className={classes.label}>RECEPIENT</div>
            <div className={classes.value}>{props.field7}</div>
            <div className={classes.label}>AMOUNT</div>
            <div className={classes.value}>{props.field8}</div>
            <div className={classes.label}>TIME</div>
            <div className={classes.value}>{props.field9}</div>
            <div className={classes.label}>TRANSACTION LINK</div>
            <div className={classes.valueLink}>{props.field10}</div>
          </Grid>
        ) : null}
      </Dialog>
    </div>
  );
}
