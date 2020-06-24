import React from "react";
import { Grid, Button, useMediaQuery } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import json2mq from "json2mq";
import TransactionProof from "./TransactionProof";

const useStyles = makeStyles((theme: any) => ({
  root: {
    opacity: "0.84",
    paddingTop: "0",
    paddingRight: "14px",
    paddingLeft: "14px",
    paddingBottom: "65px",
    width: "903px",
    // height: "496px",
  },
  container: {
    width: "100%",
    margin: "auto",
    padding: "50px 0px",
  },
  title: {
    fontFamily: "Cabin",
    fontSize: "28px",
    fontWeight: "bold",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "normal",
  },
  label1: {
    fontFamily: "Cabin",
    fontSize: "14px",
    fontWeight: "bold",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "1.17px",
    textTransform: "uppercase",
  },
  label2: {
    fontFamily: "Cabin",
    fontSize: "14px",
    fontWeight: "bold",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "1.17px",
    textTransform: "uppercase",
  },
  label3: {
    fontFamily: "Cabin",
    fontSize: "14px",
    fontWeight: "bold",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "1.17px",
    textTransform: "uppercase",
  },
  detail1: {
    fontFamily: "IBM Plex Sans",
    fontSize: "31px",
    fontWeight: "bold",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.19",
    letterSpacing: "normal",
  },
  detail2: {
    fontFamily: "IBM Plex Sans",
    fontSize: "31px",
    fontWeight: "bold",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.19",
    letterSpacing: "normal",
  },
  detail3: {
    fontFamily: "IBM Plex Sans",
    fontSize: "31px",
    fontWeight: "bold",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.19",
    letterSpacing: "normal",
  },
  button: {
    textTransform: "uppercase",
    backgroundColor: "#000000",
    color: "#fff",
    width: "165px",
    height: "50px",
    borderRadius: "5px",
    fontFamily: "Cabin",
    fontSize: "14px",
    fontWeight: "bold",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "1.17px",
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
}));

export const InvestmentDetails = (props: any) => {
  const classes = useStyles();
  const matches = useMediaQuery(
    json2mq({
      minWidth: 991,
    })
  );
  return (
    <div style={{ marginTop: matches ? "-300px" : "-5px" }}>
      <Grid container>
        <Grid item xs={12} sm={12} md={9}>
          <Grid container>
            <div
              className={classes.root}
              style={{ backgroundColor: props.color, color: props.fontColor }}
            >
              <Grid item>
                <Grid container>
                  <Grid item xs={12} sm={2} md={2}></Grid>
                  <Grid item xs={12} sm={10} md={10}>
                    <div className={classes.container}>
                      <div className={classes.title}>{props.title}</div>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container>
                  <Grid item xs={12} sm={2} md={2}></Grid>
                  <Grid
                    style={{ marginBottom: "20px" }}
                    item
                    xs={12}
                    sm={3}
                    md={3}
                  >
                    <div className={classes.label1}>{props.label1}</div>
                    <div className={classes.detail1}>{props.detail1}</div>
                  </Grid>
                  <Grid>
                    <div style={{ height: "15px" }}></div>
                  </Grid>
                  <Grid
                    style={{ marginBottom: "20px" }}
                    item
                    xs={12}
                    sm={3}
                    md={3}
                  >
                    <div className={classes.label2}>{props.label2}</div>
                    <div className={classes.detail2}>{props.detail2}</div>
                  </Grid>
                  <Grid>
                    <div style={{ height: "15px" }}></div>
                  </Grid>
                  <Grid item xs={12} sm={3} md={4}>
                    <div className={classes.label3}>{props.label3}</div>
                    <div className={classes.detail3}>{props.detail3}</div>
                  </Grid>
                </Grid>
              </Grid>
              <Grid>
                <div style={{ height: "15px" }}></div>
              </Grid>
              <Grid container>
                <Grid item xs={12} sm={2} md={2}></Grid>
                <Grid item style={{ paddingTop: "30px" }}>
                  <Button href={props.linkToProject} className={classes.button}>
                    {props.button}
                  </Button>
                </Grid>
              </Grid>
              <Grid>
                <div style={{ height: "15px" }}></div>
              </Grid>
              <Grid container>
                <Grid item xs={12} sm={2} md={2}></Grid>
                <TransactionProof
                  transactionType={""}
                  sender={"UNICEF HQ"}
                  senderDescription={"SENDER"}
                  recipient={props.detail1}
                  recipientDescription={"RECIPIENT"}
                  amount={props.detail2}
                  amountDescription={"AMOUNT INVESTED"}
                  linkToProof={props.linkToProof}
                  time={props.time}
                />
              </Grid>
            </div>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={3}></Grid>
      </Grid>
    </div>
  );
};
