import React from "react";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";

import {
  Dialog,
  DialogContent,
  Grid,
  Button,
  useMediaQuery,
  Tooltip,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import json2mq from "json2mq";

const useStyles = makeStyles((theme: any) => ({
  sender: {
    width: "65px",
    fontFamily: "IBM Plex Sans",
    fontSize: "16px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.38",
    letterSpacing: "normal",
    color: "#000000",
  },
  recipient: {
    width: "142px",
    fontFamily: "IBM Plex Sans",
    fontSize: "26px",
    fontWeight: "bold",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.15",
    letterSpacing: "normal",
    color: "#000000",
  },
  amount: {
    width: "103px",
    fontFamily: "IBM Plex Sans",
    fontSize: "31px",
    fontWeight: "bold",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.19",
    letterSpacing: "normal",
    color: "#000000",
  },
  senderDescription: {
    fontFamily: "Cabin",
    fontSize: "10px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "0.83px",
    color: "#000000",
  },
  recipientDescription: {
    fontFamily: "Cabin",
    fontSize: "10px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "0.83px",
    color: "#000000",
  },
  amountDescription: {
    fontFamily: "Cabin",
    fontSize: "10px",
    fontWeight: "bold",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "0.83px",
    color: "#000000",
  },
  link: {
    fontFamily: "Cabin",
    fontSize: "14px",
    fontWeight: "bold",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "1.17px",
    textTransform: "uppercase",
  },
  progressBar: {
    paddingTop: "16px",
    paddingBottom: "30px",
  },
}));

export default function TransactionProof(props: any) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const matches = useMediaQuery(
    json2mq({
      minWidth: 800,
    })
  );
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {matches ? (
        <Button
          onClick={handleClickOpen}
          style={{ marginBottom: "10px" }}
          className={classes.link}
        >
          Transaction Proof &gt;
        </Button>
      ) : null}
      <Dialog
        open={open}
        maxWidth={"md"}
        fullWidth={true}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{ width: "100%" }}
      >
        {/* // Got to figure out why this is not working */}
        {/* <img className={classes.xIcon} src='Cross_white.svg' alt='cross'/>   */}
        <DialogContent>
           
          <Grid container>
            <Grid xs={4} className={classes.sender} item>
              {props.sender}
            </Grid>
            <Grid xs={3} className={classes.recipient} item>
              {props.recipient}
            </Grid>
            <Grid xs={3} className={classes.amount} item>
              {props.amount}
            </Grid>
          </Grid>
          {/* sender, rec, amount */}
          <Grid container>
            <Grid xs={4} className={classes.senderDescription} item>
              {props.senderDescription}
            </Grid>
            <Grid xs={3} className={classes.recipientDescription} item>
              {props.recipientDescription}
            </Grid>
            <Grid xs={3} className={classes.amountDescription} item>
              {props.amountDescription}
            </Grid>
          </Grid>
          {/* sender, rec, amount details */}
          <Grid container>
            <Grid xs={7} item>
              <img
                className={classes.progressBar}
                src="./progressbar_3.svg"
                alt="invest scale"
              />
            </Grid>
          </Grid>
          {/* diagram */}
          <span
            style={{ paddingBottom: "1.5px" }}
            className={classes.amountDescription}
          >
            TRANSACTION DETAILS
          </span>
          <hr />
          <Grid container style={{ paddingTop: "25px", paddingBottom: "46px" }}>
            <Grid container>
              <Grid item xs={2} className={classes.senderDescription}>
                FROM
              </Grid>
              <Grid item xs={2} className={classes.senderDescription}>
                RECIPIENT
              </Grid>
              <Grid item xs={2} className={classes.senderDescription}>
                AMOUNT
              </Grid>
              <Grid item xs={3} className={classes.senderDescription}>
                TIME
              </Grid>
              <Grid item xs={3} className={classes.senderDescription}>
                TRANSACTION
                <Tooltip
                  placement="top"
                  title="A unique identifier given to each blockchain transaction to make it traceable."
                  arrow
                >
                  <HelpOutlineIcon
                    style={{ paddingLeft: "7px", fontSize: "20px" }}
                  />
                </Tooltip>
              </Grid>
            </Grid>
            <Grid container style={{ paddingTop: "10px" }}>
              <Grid item xs={2} className={classes.sender}>
                UNICEF HQ
              </Grid>
              <Grid item xs={2} className={classes.sender}>
                {props.recipient}
              </Grid>
              <Grid item xs={2} className={classes.sender}>
                {props.amount}
              </Grid>
              <Grid item xs={3} className={classes.sender}>
                {props.time}
              </Grid>
              <Grid item xs={3} className={classes.sender}>
                <a href={props.linkToProof}>Link</a>
              </Grid>
            </Grid>
          </Grid>
          {/* table with details */}
        </DialogContent>
      </Dialog>
    </div>
  );
}
