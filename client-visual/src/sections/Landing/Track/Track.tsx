import React from 'react'
import { Grid } from '@material-ui/core/'
import { makeStyles } from '@material-ui/core/styles'
import { TrackObject } from './TrackObject'
import { TrackText } from './TrackText'
import { ArrowButton } from '../Atoms/ArrowButton'
import { HorizontalBar } from '../Atoms/HorizontalBar'

const useStyles = makeStyles({
    root: {
      flexGrow:1,
      height:'183px'
    },
  });

export const Track = () => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
          <Grid container>
            <Grid item xs={5}>
              <TrackText/>
            </Grid>
            <Grid item xs ={6}>
              <TrackObject />
            </Grid>
            <Grid item xs={1}>
              <ArrowButton />
            </Grid>
            <Grid item xs = {12}>
              <HorizontalBar />
            </Grid>
          </Grid>
        </div>
    )
}