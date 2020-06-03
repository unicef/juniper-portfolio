import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import MainContentContainer from '../../../ui/MainContentContainer'
import PriceBar from '../../PriceBar'
import StartupSummary from './StartupSummary'
import StartupCards from './StartupCards'

const useStyles = makeStyles({
  
  root:
  {
    marginTop: '20px',
    backgroundColor: '#f8f8f8',
  },
  
});

export default function Startups() {
  const classes = useStyles();
  return (
    <MainContentContainer className={classes.root}>
      <PriceBar />
      <StartupSummary />
      <StartupCards/>
    </MainContentContainer>
        )
}