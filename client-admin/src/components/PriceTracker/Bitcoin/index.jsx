import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
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
    paddingTop: '40px',
  },

  subheader:
  {
    fontFamily: '"Roboto", sans-serif',
  fontSize: '24px',
  lineHeight: 1.17,
  letterSpacing: 'normal',
  color: '#000000',

  },
  
});

export default function BitcoinPriceTracker() {
  const classes = useStyles();
  return (
    <MainContentContainer className={classes.root}>
      <PriceBar />
      <div className={classes.header}>Bitcoin price overview</div>
      <div className={classes.subheader}>Date goes here</div>
    </MainContentContainer>
        )
}