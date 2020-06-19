import React from "react";
import { Grid } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { makeStyles } from "@material-ui/styles";
import { AboutMainText } from "./AboutMainText";
import { ApplicationImg, ApplicationMiddleImg } from "./AboutImgs";

const useStyles = makeStyles((theme: any) => ({
  top: {
    backgroundColor: "#ffd113",
    padding: "100px 0px",
    height: "90vh",
  },

  lcolumn: {
    padding: "100px 65px 100px 130px",
    fontFamily: "Cabin",
    fontSize: "77px",
    fontWeight: "bold",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.04",
    letterSpacing: "normal",
    color: "#0068ea",
  },

  lcolumnmobile: {
    padding: "100px 30px 0px 60px",
    fontSize: "47px",
    fontFamily: "Cabin",
    fontWeight: "bold",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.04",
    letterSpacing: "normal",
    color: "#0068ea",
  },

  rcolumn: {
    padding: "50px 130px 100px 65px",
  },

  rcolumnmobile: {
    padding: "100px 30px 100px 30px",
  },
  header: {
    fontFamily: "Cabin",
    fontSize: "28px",
    fontWeight: "bold",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.32",
    letterSpacing: "normal",
    color: "#000000",
    paddingBottom: "10px",
  },

  headermobile: {
    fontFamily: "Cabin",
    fontSize: "22px",
    fontWeight: "bold",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.32",
    letterSpacing: "normal",
    color: "#000000",
    paddingBottom: "10px",
  },

  blurb: {
    fontFamily: "IBM Plex Sans",
    fontSize: "22px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.55",
    letterSpacing: "normal",
    paddingBottom: "60px",
  },

  blurbmobile: {
    width: "311px",
    fontFamily: "IBM Plex Sans",
    fontSize: "14px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.79",
    letterSpacing: "normal",
    paddingBottom: "60px",
  },

  underline: {
    textDecoration: "underline",
    fontWeight: "bold",
  },
}));

export const About = () => {
  const classes = useStyles();
  const mobiledevice = useMediaQuery("(max-width: 991px)");

  return (
    <div>
      <div className={classes.top}>
        <AboutMainText />
      </div>

      <div>
        <Grid container>
          <Grid
            item
            xs={12}
            sm={6}
            className={mobiledevice ? classes.lcolumnmobile : classes.lcolumn}
          >
            Selection criteria &amp; funding
          </Grid>

          <Grid item xs={12} sm={6} className={classes.rcolumn}>
            <AboutBlurb1 />
            <ApplicationImg />
            <AboutBlurb2 />
            <AboutBlurb3 />
          </Grid>
        </Grid>
        <ApplicationMiddleImg />
        <Grid container>
          <Grid
            item
            xs={12}
            sm={6}
            className={mobiledevice ? classes.lcolumnmobile : classes.lcolumn}
          >
            Why blockchain?
          </Grid>

          <Grid item sm={6} className={classes.rcolumn}>
            <AboutBlurb5 />
            <AboutBlurb6 />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export const AboutBlurb1 = () => {
  const classes = useStyles();
  const mobiledevice = useMediaQuery("(max-width: 991px)");

  return (
    <div>
      <div className={mobiledevice ? classes.headermobile : classes.header}>
        Looking for seed funding for your open source tech startup?
      </div>
      <div className={mobiledevice ? classes.blurbmobile : classes.blurb}>
        <p>
          <b>
            Financial and technological support from UNICEF’s Innovation Fund is
            available for companies that can show a strong founding team and a
            clear path to improving the lives of children.
          </b>
        </p>

        <p>
          If you’ve got a start-up registered in one of UNICEF’s programme
          countries and have a working, open source prototype (hardware or
          software) showing promising results, the UNICEF Venture Fund is
          looking for you.
        </p>
        <p>
          We invest in solutions that can impact the lives of the most
          vulnerable children. We find these solutions clustered around $100
          billion industries in frontier technology spaces, such as: blockchain,
          UAVs, virtual and augmented reality, 3D printing, machine learning,
          quantum computing, genetic engineering, Internet of Things, artificial
          intelligence, nano-satellites and human dynamics.
        </p>
      </div>
    </div>
  );
};

export const AboutBlurb2 = () => {
  const classes = useStyles();
  const mobiledevice = useMediaQuery("(max-width: 991px)");

  return (
    <div>
      <div className={mobiledevice ? classes.headermobile : classes.header}>
        Who are we looking for
      </div>
      <div className={mobiledevice ? classes.blurbmobile : classes.blurb}>
        <p>
          We are seeking open-source projects that have already been started -
          you’ve been running it for a while - it shows some positive indicators
          - but you need funding to take it to a level where it can really
          attract additional investment and funding by generating real data.
        </p>
        <p>
          You might need a small investment to get your prototype to the stage
          where the company has proof that the solution works for other people.
          Maybe another developer or two are needed, design help to communicate
          what the project can do or some server space. Refactoring something
          into a new language because the initial one won’t scale. Testing it in
          a new area. Getting some data points.
        </p>
        <p>
          The UNICEF Venture Fund can help with these kinds of investments to
          support the acceleration of your company’s work. The next stage after
          that proof would be going for more funding (this could be private
          sector investment or grant-funding, or other; depending on the type of
          technology and solution).
        </p>
      </div>
    </div>
  );
};

export const AboutBlurb3 = () => {
  const classes = useStyles();
  const mobiledevice = useMediaQuery("(max-width: 991px)");

  return (
    <div>
      <div className={mobiledevice ? classes.headermobile : classes.header}>
        Funding in bitcoin or ether
      </div>
      <div className={mobiledevice ? classes.blurbmobile : classes.blurb}>
        <p>
          The CryptoFund provides investments in bitcoin or ether to support the
          acceleration of your company’s work.
        </p>
      </div>
    </div>
  );
};

export const AboutBlurb5 = () => {
  const classes = useStyles();
  const mobiledevice = useMediaQuery("(max-width: 991px)");

  return (
    <div>
      <div className={mobiledevice ? classes.headermobile : classes.header}>
        Enabling a digitally financed future
      </div>
      <div className={mobiledevice ? classes.blurbmobile : classes.blurb}>
        <p>
          By distributing funding in cryptocurrency, UNICEF, donors, recipients,
          and the public can track where the money is going and how it is being
          spent, providing an unprecedented level of transparency in the funding
          and NGO space. This is due to blockchain technology, the tool powering
          cryptocurrency.
        </p>
      </div>
    </div>
  );
};

export const AboutBlurb6 = () => {
  const classes = useStyles();
  const mobiledevice = useMediaQuery("(max-width: 991px)");

  return (
    <div>
      <div className={mobiledevice ? classes.headermobile : classes.header}>
        A permanent, transparent record of a financial transaction
      </div>
      <div className={mobiledevice ? classes.blurbmobile : classes.blurb}>
        <p>
          Blockchain technology operates as a digital ledger, recording each
          transaction, which takes place on the network. With public
          cryptocurrencies such as bitcoin and ether, anyone is able to see
          where and when the assets are moving, revolutionising the way giving
          today works.
        </p>
      </div>
    </div>
  );
};
