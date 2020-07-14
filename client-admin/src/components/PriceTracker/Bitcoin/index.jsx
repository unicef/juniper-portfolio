import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import MainContentContainer from '../../../ui/MainContentContainer'
import PriceBar from '../../PriceBar'


const useStyles = makeStyles({
  
  root:
  {
    marginTop: '20px',
    backgroundColor: '#f8f8f8',
  },
  header:
  {
    fontFamily: '"Roboto", sans-serif',
    fontSize: '24px',
    fontWeight: 'bold',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.17,
    letterSpacing: 'normal',
    color: '#000000',
    padding: '40px 0px 10px 0px',
  },

  subheader:
  {
    fontFamily: '"Roboto", sans-serif',
  fontSize: '24px',
  lineHeight: 1.17,
  letterSpacing: 'normal',
  color: '#000000',

  },
  
  card:
  {
    paddingTop: '40px',
  },

  cardinner:
  {
      padding: '40px',
  },
  
  cardheader:
  {
    fontFamily: '"Roboto", sans-serif',
    fontSize: '28px',
    lineHeight: '28px',
    fontWeight: 'bold',
    color: '#000000',
    paddingBottom:'30px',

  },

  cardsubheader:
  {
    fontFamily: '"Roboto", sans-serif',
    fontSize: '28px',
    lineHeight: '28px',
    fontWeight: 'normal',
    color: '#000000',
    paddingBottom: '30px',
  },

  smalltext:
  {
    fontFamily: '"Cabin", sans-serif',
    fontSize: '10px',
    letterSpacing: '0.83px',
    paddingBottom: '5px',

  },

});

export default function BitcoinPriceTracker() {
  const classes = useStyles();
  const date = new Date();
  const month = date.toLocaleString('default', { month: 'short' });
  const datestring = date.getUTCDate() + " " + month + " " + date.getUTCFullYear();
  
  return (
    <MainContentContainer className={classes.root}>
      <PriceBar />
      <div className={classes.header}>Bitcoin price overview</div>
      <div className={classes.subheader}>{datestring}</div>
      <MainCard />
    </MainContentContainer>
        )
}

export function MainCard() {
  const classes = useStyles();
  return (
    <div className={classes.card}>
      <Card className={classes.cardinner} variant="outlined">
        <div className={classes.smalltext}>TODAY'S AVERAGE PRICE</div>
        <div className={classes.cardheader}>8798 USD</div>
        <div className={classes.smalltext}>MONTHLY AVERAGE PRICE</div>
        <div className={classes.cardsubheader}>8798 USD</div>
        <div className={classes.smalltext}>Q1 AVERAGE PRICE</div>
        <div className={classes.cardsubheader}>8798 USD</div>
      </Card>
    </div>
  )
}