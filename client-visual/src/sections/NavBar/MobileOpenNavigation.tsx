/* eslint eqeqeq: 0 */
import React from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import { Paper, Grid, Box } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import MailIcon from "@material-ui/icons/Mail";
import TwitterIcon from "@material-ui/icons/Twitter";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: "79px",
      display: "flex",
      flexWrap: "wrap",
      width: "100%",
      height: "100%",
      "& > *": {
        width: "100%",
      },
    },
    twitterIcon: {
      height: "43px",
      width: "43px",
      objectFit: "contain",
    },
    mailIcon: {
      height: "43px",
      width: "43px",
      objectFit: "contain",
    },
    menuItem: {
      fontFamily: "Cabin",
      fontSize: "56px",
      fontWeight: "normal",
      fontStretch: "normal",
      fontStyle: "normal",
      lineHeight: "1.29",
      letterSpacing: "normal",
      color: "#000000",
      paddingLeft: "28px",
    },
    activeMenuItem: {
      fontFamily: "Cabin",
      fontSize: "56px",
      fontWeight: "bold",
      fontStretch: "normal",
      fontStyle: "normal",
      lineHeight: "1.29",
      letterSpacing: "normal",
      color: "#0068ea",
      paddingLeft: "28px",
    },
    iconStyles: {
      paddingLeft: "28px",
      paddingTop: "190px",
      paddingBottom: "23px",
    },
  })
);

export const MobileOpenNavigation = () => {
  const classes = useStyles();
  const location = useLocation();
  const about = location.pathname == "/about";
  const receive = location.pathname == "/receive";
  const invest = location.pathname == "/invest";
  const track = location.pathname == "/track";

  return (
    <div className={classes.root}>
      <Box zIndex="modal">
        <Paper style={{ height: "100%", position: "fixed" }} elevation={24}>
          <Grid container style={{ paddingTop: "36px" }}>
            <Grid item xs={12}>
              <div
                className={!receive ? classes.menuItem : classes.activeMenuItem}
              >
                <a
                  style={{ color: "inherit", textDecoration: "inherit" }}
                  href="/receive"
                >
                  Receive
                </a>
              </div>
            </Grid>
            <Grid item xs={12}>
              <div
                className={!invest ? classes.menuItem : classes.activeMenuItem}
              >
                <a
                  style={{ color: "inherit", textDecoration: "inherit" }}
                  href="/invest"
                >
                  Invest
                </a>
              </div>
            </Grid>
            <Grid item xs={12}>
              <div
                className={!track ? classes.menuItem : classes.activeMenuItem}
              >
                <a
                  style={{ color: "inherit", textDecoration: "inherit" }}
                  href="/track"
                >
                  Track
                </a>
              </div>
            </Grid>
            <Grid item xs={12}>
              <div
                className={!about ? classes.menuItem : classes.activeMenuItem}
              >
                <a
                  style={{ color: "inherit", textDecoration: "inherit" }}
                  href="/about"
                >
                  About
                </a>
              </div>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container className={classes.iconStyles}>
              <Grid item xs={1}>
                <span className={classes.mailIcon}>
                  <a
                    style={{ color: "inherit", textDecoration: "inherit" }}
                    href="mailto:blockchain@unicef.org"
                  >
                    <MailIcon />
                  </a>
                </span>
              </Grid>
              <Grid item xs={1}>
                <span className={classes.twitterIcon}>
                  <a
                    style={{ color: "inherit", textDecoration: "inherit" }}
                    href="https://twitter.com/UNICEFinnovate"
                  >
                    <TwitterIcon />
                  </a>
                </span>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </div>
  );
};
