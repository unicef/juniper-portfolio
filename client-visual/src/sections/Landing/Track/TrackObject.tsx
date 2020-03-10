import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'

const useStyles = makeStyles({
    root: {
      flexGrow:1,
    },
    imageSpecs: {
      width:'259px'
    },
    text: {
      width:'107px',
      height:'69px',
      fontFamily:'IBM Plex Sans',
      fontSize: '16px',
      fontWeight:'bold',
      fontStretch:'normal',
      fontStyle: 'normal',
      lineHeight:'1.44',
      letterSpacing:'normal',
      color:'#fff'
    },
    title: {
      textTransform:"uppercase",
      letterSpacing:'1.5px',
      fontSize:'14px',
      fontWeight:'normal'
    },
    trackText: {
      color:'#fff'
    },
  });

export const TrackObject = () => {
    const classes = useStyles()
    const [trackText] = useState('Track the movement of investments')
    return (

        <Grid item xs={6} sm={6} md={3} className={classes.text}>
          <div className={classes.trackText}>{trackText} donor(s)</div>
        </Grid>
    )
}