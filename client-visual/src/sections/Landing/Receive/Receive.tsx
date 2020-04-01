import React from 'react'
import { Grid } from '@material-ui/core/'
import { makeStyles } from '@material-ui/core/styles'
import { ReceiveObject } from './ReceiveObject'
import { ReceiveText } from './ReceiveText'
import { ReceiveImage } from './ReceiveImage'
import { ArrowImg } from '../Atoms/ArrowImg'
import { HorizontalBar } from '../Atoms/HorizontalBar'

const useStyles = makeStyles({
    root: {
       //flexGrow:1,
      paddingTop: '64px',
      height:'183px'
  },

  container: 
  {
      width: '100%',
    },
  
  arrow: 
  {
    paddingLeft: '40px',
  },
  });

export const Receive = () => {
    const classes = useStyles()
    return (
      <div className={classes.root}>
          <Grid container>
              <ReceiveText />
              <Grid item xs={'auto'} sm={'auto'}></Grid>
              <ReceiveObject />
          <ReceiveImage />
          <Grid item className = {classes.arrow} xs={'auto'} />
           <a href="/track"><ArrowImg /></a>
          <Grid />

            <Grid item xs = {12}>
              <HorizontalBar />
            </Grid>
          </Grid>
        </div>
    )
}