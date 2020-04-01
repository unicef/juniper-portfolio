import React from 'react'
import { Grid } from '@material-ui/core/'
import { makeStyles } from '@material-ui/core/styles'
import { TrackObject } from './TrackObject'
import { TrackText } from './TrackText'
import { TrackImage } from './TrackImage'
import { ArrowImg } from '../Atoms/ArrowImg'
import { HorizontalBar } from '../Atoms/HorizontalBar'

const useStyles = makeStyles({
    root: {
      flexGrow:1,
      height:'183px'
  },
  
  arrow: 
  {
    paddingLeft: '40px',
  },

  });

export const Track = () => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
          <Grid container>
              <TrackText />
              <Grid item xs={'auto'} sm={'auto'}></Grid>
              <TrackObject />
          <TrackImage />
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